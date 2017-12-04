import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});


Meteor.startup(()=>{

  BookSchema = new SimpleSchema({
    title: {
      type: String, label : "책 제목", min : 1, max: 200
    },
    author: {
      type: String, label: "작가"
    },
    price : {
      type: Number, label : "판매가격", min : 10000
    },
    desc : {
      type :String, label : "기타 설명 (옵션)", optional : true,
    }
  });

  /* 스키마 사용 하기 */
  /* 1. Match Test 로 확인하기 */
  var obj = {title: "테스트책제목", author: "박승현" /*,price:20000*/ };

  if( Match.test(obj,BookSchema) ){
    console.log("Match.test : 성공");
  }else{
    console.error("스키마에 문제가 있습니다");
  }

  /* 2. check 로 확인하기 */
  try{
    check(obj, BookSchema);
    console.log("check : 성공");
  }catch(e){
    console.error(e.message) ;
  }

  /* 3. 스키마의 validate 사용하기 */
  if( BookSchema.namedContext("myContext").validate(obj)){
    console.log("namedContext validate : 성공");
  }else{
    console.error("스키마에 문제가 있습니다");
  }

  /* 스키마 재정의 하기 */
  /* 1. 새로운 필드를 추가하여 재정의 하기 */
  myBookSchema = new SimpleSchema([BookSchema, {ISBN: {type: String} }]);

  /* 2. 특정 필드만 사용하여 스키마 만들어 내기 */
  SimpleBookSchema = BookSchema.pick(['title','author']);

  /* 다른 스키마의 내장 스키마로 사용하기 */

  myBookShelf = new SimpleSchema({

    favoriteBook : { type : BookSchema },   // 하위 오브젝트로 정의하여 사용하는 방법

    myBooks : { type : [BookSchema] , minCount : 1 , maxCount : 100 }       // Array 의 각 요소로 정의하는 방법

  });

  check({ favoriteBook:{title: "테스트책제목", author: "박승현" ,price:20000 }, myBooks:[{title: "테스트책제목", author: "박승현" ,price:20000 },{title: "테스트책제목", author: "박승현" ,price:20000 }]},myBookShelf);


});
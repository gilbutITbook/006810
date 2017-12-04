import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
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


  },
});

TempMessages = new Mongo.Collection(null);

function getCurrentList(){
  var messageObject = {

  };

  //삭제 한다
  TempMessages.remove({});

  Meteor.call("messageList",messageObject,(err,data)=>{
    if(err){
      alert(err);
    }else{
      //가져온 데이터를 널컬렉션에 넣는다.
      data.forEach((msg)=>{
        TempMessages.insert(item);
      })
    }
  });
}



var messageObject = {

};

Meteor.call("insertMessage",messageObject,(err,data)=>{
  if(err){
    alert(err);
  }else{
    console.log(data);
  }
});


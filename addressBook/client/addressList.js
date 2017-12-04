
Template.addressList.onCreated(function(){

    /* 1. cnt 라는 이름의 세션변수를 생성하여 30으로 초기 셋팅한다.*/
    Session.set("cnt",30); //cnt 초기화
    var self = this;

    /* 3. cnt 세션값이 변경되면 변경된 숫자만큼 구독 되도록 선언한다. */
    self.autorun(function(){
        /* 2. cnt 의 숫자 값만큼 (초기에는 30) 서버로 부터 구독하게 구현한다. */
        self.subscribe("AddressBookData",Session.get("cnt"));  //cnt 숫자만큼 구독
    });

    /* 4. 마우스 스크롤 이벤트시 스크롤이 아래부분에 도달하면 세션변수에 30을 더해준다. */
    $(window).scroll(function () {
        var scrollHeight = $(window).scrollTop() + $(window).height();
        var documentHeight = $(document).height();
        if (scrollHeight + 200 >= documentHeight) {
            Session.set("cnt" , Session.get("cnt") + 30);  //세션변수에 30을 더하기
        }
    });

});


Template.addressList.helpers({
    list(){
        return AddressBook.find({},{ /* limit:10 , */ sort :{name:1}});
    }
});

Template.addressList.events({
    "click button[name=more]" (evt,tmpl){
        Session.set("cnt" , Session.get("cnt") + 5);
    }
});

Template.addressInput.events({
    'click button[name=saveAddress]' (evt,tmpl){

        var address = {
            name    : tmpl.find("input[name=name]").value
            ,phone   : tmpl.find("input[name=phone]").value
            ,email   : tmpl.find("input[name=email]").value
            ,company : tmpl.find("input[name=company]").value
            ,birthday    : tmpl.find("input[name=birthday]").value
            ,owner : Meteor.userId() /* 로그인된 사용자 아이디 추가 */
        };

        /* 1. 데이터 검증코드 */

        try {
            check(address.name , NotEmptyString);
            check(address.email , EmailString);
            check(address.phone, PhoneString);
            check(address.company , NotEmptyString);
            check(address.birthday , BirthDayString);

        }catch(err){
            alert("입력값을 확인하세요  : [" + err.message + "]");
            return ;
        }

        /* 2. 검증후 등록 */
        AddressBook.insert(address);

        tmpl.find("input[name=name]").value = "";
        tmpl.find("input[name=phone]").value = "";
        tmpl.find("input[name=email]").value = "";
        tmpl.find("input[name=company]").value = "";
        tmpl.find("input[name=birthday]").value = "";
    }
});

Template.addressListItem.events({
    'click button[name=remove]' (evt,tmpl){
        AddressBook.remove( { _id : this._id } );
    },
    'click button[name=modify]' (evt,tmpl){
        Session.set("editItem",this._id);
    },

    /* 수정모드에서 저장 버튼 구현 */
    'click button[name=save]' (evt,tmpl){
        var address = {
            name    : tmpl.find("input[name=name]").value
            ,phone   : tmpl.find("input[name=phone]").value
            ,email   : tmpl.find("input[name=email]").value
            ,company : tmpl.find("input[name=company]").value
            ,birthday    : tmpl.find("input[name=birthday]").value
        };

        try {

            check(address.name , NotEmptyString);
            check(address.email , EmailString);
            check(address.phone, PhoneString);
            check(address.company , NotEmptyString);
            check(address.birthday , BirthDayString);

        }catch(err){
            alert("입력값을 확인하세요  : [" + err.message + "]");
            return ;
        }

        AddressBook.update({_id:this._id},{$set:address});
        Session.set("editItem",null);
    },

    /* 수정모드에서 취소 버튼 구현 */
    'click button[name=cancel]' (evt,tmpl){
        Session.set("editItem",null);
    },

    /* 뷰모드에서 텍스트 버튼 클릭시 수정모드로 전환*/
    'click .edit-thing' (evt,tmpl){
        Session.set("editItem",this._id);
    }
});

Template.addressListItem.helpers({
    editing (){
        return this._id == Session.get("editItem");
    }
});



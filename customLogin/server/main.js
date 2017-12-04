import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

});


Accounts.onCreateUser(function(options, user) {

    user.profile = options.profile;  //사용자 입력 값을 저장될 값으로 넣어줌
    user.profile.isAdmin = false;    //기본이 어드민 아님

    return user;

});


Accounts.validateNewUser(function (user) {

    console.log('Accounts.validateNewUser',user);

    if (user.username && user.username.length >= 3){
        return true;
    } else {
        throw new Meteor.Error(403, "사용자 명은 적어도 3자 이상입니다.");
    }

});

Accounts.validateLoginAttempt(function(obj){
    return obj.user.profile.isAdmin;
});

Accounts.onLogin(function(user){
    console.log("onLogin" , user);
});

Accounts.onLoginFailure(function(a,b){
    console.log("a",a);
    console.log("b",b);
});


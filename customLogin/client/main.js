
Template.customSignUp.events({
    "click button[name=signUp]" (evt,tmpl){

        var username = tmpl.find('input[name=username]').value;
        var email    = tmpl.find('input[name=email]').value;
        var password = tmpl.find('input[name=password]').value;
        var password2 = tmpl.find('input[name=password2]').value;
        var name     = tmpl.find('input[name=name]').value;

        if(password!=password2) {
            alert("패스워드를 확인하세요");
            return;
        }

        var userInfo = { username , email , password , profile : { name } };
        Accounts.createUser(userInfo,function(error){
            if(!!error){
                alert(error.reason);
            }else{
                alert("가입성공");
                $(tmpl.findAll('input')).val("");
            }
        });

    }
});

Template.customLogIn.events({
    "click button[name=login]" (evt,tmpl){
        var email    = tmpl.find('input[name=email]').value;
        var password = tmpl.find('input[name=password]').value;
        Meteor.loginWithPassword(email,password,function(error){

            if(!error){
                Meteor.logoutOtherClients();
            }else{
                alert(error.reason);
            }
        });
    },
    "click button[name=logout]" (evt,tmpl){
        Meteor.logout();
    }
});

Template.customLogIn.helpers({
    loginYn(){
        return !!Meteor.user();
    },
    username(){
        var usr =  Meteor.user();
        if(!!usr) return usr.username;
        else return "";
    }
});


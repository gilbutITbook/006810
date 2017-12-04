
Template.container.onCreated(function () {
    var self = this;
    subl = self.subscribe("dots","MeteorSchool");
});

Template.container.helpers({
    dots (){
        return Dot.find({pid:"MeteorSchool"},{sort:{idx:1}});
    }
    ,
    currentColor (){
        return Session.get("selectedColor");
    }
});

Template.container.events({
    "click button[name=reset]" (evt,tmpl){
        Meteor.call("resetContainer","MeteorSchool",Session.get("selectedColor"),function(err,result){
            console.log(err,result);
        });
    }
});


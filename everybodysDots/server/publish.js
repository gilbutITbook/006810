
Meteor.publish("dots",function(pid){
    return Dot.find({pid:pid});
});
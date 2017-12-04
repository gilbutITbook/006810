
Template.roomList.onCreated(function(){
    var self = this;
    self.roomListSub = self.subscribe("roomList");
});


Template.roomList.onDestroyed(function(){
    var self  = this;
    self.roomListSub.stop();
});

Template.roomList.helpers({
    list(){
        return Rooms.find();
    }
});


Template.roomListItem.events({
    "click a[name=selectRoom]" (){
        Session.set("viewMode","chatRoom");
        Session.set("currentRoom",this._id);
    }
});

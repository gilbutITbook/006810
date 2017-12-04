
Template.roomHeader.helpers({
    roomName () {
        return Session.get("currentRoom");
    }
});

Template.roomHeader.events({
    "click a[name=goChatMain]"() {
        Session.set("viewMode","chatMain");
    }
});

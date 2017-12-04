
Meteor.methods({
    insertMessage(messageObject){
        if(Meteor.isClient){
            messageObject["isClient"] = true;
        }
        Messages.insert(messageObject);

        /* 시간필드 업데이트 */
        Rooms.update({_id:messageObject.roomId},{
            $set : {lastMessageTime:messageObject.timestamp}
        });
    }
});


import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});


Messages = new Mongo.Collection("messages");

Meteor.methods({
    insertMessage(messageObject){

        if(!this.userId){
            throw new Meteor.Error('로그인하세요');
        }

        var id = Messages.insert(messageObject);
        return id;

    }
});



ShoppingCart = new Mongo.Collection(null);


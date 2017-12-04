
Meteor.publish("AddressBookData" , function(count){
    var userId = this.userId;
    if(userId){
        return AddressBook.find({owner:userId},{limit:count , sort : {name : 1} });
    }
});
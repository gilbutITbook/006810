// 실행위치 : 서버/클라이언트
AddressBook = new Mongo.Collection("addressBook");

// 실행위치 : 서버
if(Meteor.isServer){
    AddressBook.allow({
        insert (userId, doc) {
            return (userId && doc.owner === userId);
        },
        update (userId, doc, fields, modifier) {
            return (userId && doc.owner === userId);
        },
        remove (userId, doc) {
            return (userId && doc.owner === userId);
        }
    });
}

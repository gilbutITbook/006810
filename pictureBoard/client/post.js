
//로케일 선언
moment.locale('kr');

Template.post.helpers({
    ago(timestamp){
        return moment(timestamp).fromNow();
    }
});



Template.post.events({
    "click button[name=removePost]"(evt,tmpl){
        Meteor.call('removePost', this._id ,(err,data)=>{
            if(err){
                alert('서버에러 => ' + err.error);
            }else{
                console.log(data);
            }
        });
    }
    ,
    "keydown .editable" (evt,tmpl){

        var post = {
            _id : this._id,
            context : $(evt.target).html()
        };

        Meteor.call('updatePost', post ,(err,data)=>{
            if(err){
                console.log(err);
                alert('서버에러 => ' + err.error);
            }else{
                console.log(data);
            }
        });
    }
});


Template.post.onRendered(function () {
    var element = this.find(".editable");
    this.editor = new MediumEditor(element,{
        spellcheck : false
    });
});
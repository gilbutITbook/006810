
Template.dot.events({
    "mousedown div,touchstart div" (evt,tmpl){

        Session.set("dragMode",true);

        Dot.update({_id:this._id},{$set:{color:Session.get("selectedColor")}});

        evt.preventDefault();
    }
    ,
    "mousemove div,touchmove div" (evt,tmpl){

        if(Session.get("dragMode")){

            Dot.update({_id:this._id},{$set:{color:Session.get("selectedColor")}});
        }

        evt.preventDefault();

    }
    ,
    "mouseup div,touchend div" : function(evt,tmpl){

        Session.set("dragMode",false);

        evt.preventDefault();

    }

});


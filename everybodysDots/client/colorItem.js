
Template.colorItem.events({
    "click .colorItem" (){
        var self = this;
        Session.set("selectedColor",self.color);
    }
});

Template.colorPad.helpers({
    colorList (){

        var list =
            ["black","silver","maroon","red"
                ,"navy","blue","purple","fuchsia"
                ,"green","lime","olive","yellow"
                ,"teal","aqua","gray","white"];

        var cList = [];
        for(var i=0;i<list.length;i++)
            cList.push({color:list[i]});

        return cList;
    }
});

Template.colorPad.onCreated(function () {
    Session.set("selectedColor","black");
});


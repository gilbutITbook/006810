Template.regPost.helpers({
    tempImage : function(){
        return Template.instance().tempImage.get() ;
    }
});

Template.regPost.events({
    "click button[name=writePost]" (evt,tmpl){
        $(tmpl.findAll(".modal-dialog")).toggle();
    },
    "click button[name=save]" (evt,tmpl){

        /* 템플릿에서 데이터 가져오기 */

        var title = tmpl.find("input[type=text]").value;
        var context = tmpl.find("textarea").value;
        var atDate = new Date();

        var post = {
            title,
            context,
            atDate
        };

        if(tmpl.tempImage.get()!=""){
            post["image"] = tmpl.tempImage.get();
        }

        /* 서버 메소드 호출하기 */
        Meteor.call("savePost",post,(err,data)=>{
            if(err){
                alert('서버에러 => ' + err.error);
            }else{
                FlowRouter.go("/");
            }
        }); // Meteor.call

    },

    'change input[name=file-upload]' (event,tmpl) {

        //파일 업로드 구현
        var fileReader = new FileReader();
        var fileName = event.currentTarget.files[0].name ;
        var file = event.currentTarget.files[0];

        fileReader.onload = (file)=>{
            var image = {
                blob : file.srcElement.result,
                name : file.name,
                encoding : 'binary',
            };

            // 다음은 image 를 서버로 던지기 구현
            Meteor.call('saveFile',image,function(err,result){
                if(err){
                    alert(err);
                }else{
                    // alert("http://localhost:3000/temp/"+result.fileName);
                    // result 를 사용하여 미리보기 구현
                    tmpl.tempImage.set(result.fileName);  //임시 이미지 값 업데이트
                }
            });
        };
        fileReader.readAsBinaryString(file);
    },

    "click button[name=cancel]" : function(evt,tmpl){
        FlowRouter.go("/");
    },

});


Template.regPost.onRendered(function() {

    var element = this.find(".editable");
    this.editor = new MediumEditor(element,{
        /* 옵션 등록 부분 */
        spellcheck : false
    });

});

Template.regPost.onCreated(function () {

    this.tempImage = new ReactiveVar("");

    var instance = this;

});

// 드랍존 http://www.html5rocks.com/en/tutorials/file/dndfiles/?redirect_from_locale=ko
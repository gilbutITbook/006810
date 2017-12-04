import { Meteor } from 'meteor/meteor';
import fs from 'fs';


// application/json 파싱
Picker.middleware( bodyParser.json() );

// application/x-www-form-urlencoded 파싱
Picker.middleware( bodyParser.urlencoded( { extended: false } ) );

Picker.middleware( multer({

    //dest: "/Users/ppillip/Projects/uploadTemp", // 업로드 파일 임시 저장소
    dest: Meteor.settings.filePath,

    limits: {
        fileSize: undefined
    },

    rename: function(fieldName, fileName){
        return fieldName + Date.now();
    },

    onFileUploadStart: function(file){
        console.log("[.]" + file.originalname + " upload has started at " + Date.now());
    },

    onFileUploadComplete: function(file){
        console.log("[.]" + file.originalname + " upload has finished at " + Date.now());
        done = true;
    },

    onFileSizeLimit: function(file){
        console.log("[.]" + file.originalname + " file size limit has been reached");
    },

    onError: function(){
        console.log("[.]ERROR!");
    }

}));

Fruit = new Mongo.Collection("fruits");

Meteor.startup(() => {
    if(Fruit.find().count() == 0){
        Fruit.insert({name:"사과",color:"red"});
        Fruit.insert({name:"딸기",color:"red"});
        Fruit.insert({name:"바나나",color:"yello"});
        Fruit.insert({name:"수박",color:"green"});
        Fruit.insert({name:"자두",color:"red"});
        console.log("fixture 생성 완료");
    }
});

Picker.route("/fruits/color/:color", function(params, req, res, next) {

    //url 분석
    var color = params.color;

    //http 헤더 작성
    res.writeHead(200);

    //디비 질의 후 json 오브젝트 생성
    var obj = {list:Fruit.find({color:color}).fetch()};

    //응답해주기
    res.end(JSON.stringify(obj));

});

Picker.route("/fileupload", function(params, req, res, next) {

    console.log("\n=== req.body ===");
    console.log(req.body);

    console.log("\n=== req.files ===");
    console.log(req.files);

    //#1 파일 읽기
    var blob = Meteor.wrapAsync(fs.readFile)(req.files.testFile.path);
    //#2 파일 쓰기
    Meteor.wrapAsync(fs.writeFile)(Meteor.settings.filePath + "/" + req.files.testFile.originalname , blob);
    //#3 임시폴더 파일 삭제
    Meteor.wrapAsync(fs.unlink)(req.files.testFile.path);

    res.end("OK");

});

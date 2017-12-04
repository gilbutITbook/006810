
import { Meteor } from 'meteor/meteor'
import fs from 'fs';

Meteor.methods({
    savePost(post){
        if(!post  || !post.image ){
            throw new Meteor.Error("입력값이 없습니다");
        }

        //#1 경로 변수
        var tempDir = "/Users/ppillip/Projects/temp/" ;
        var imageDir = "/Users/ppillip/Projects/images/" ;

        //#2 파일 읽기
        var blob = Meteor.wrapAsync(fs.readFile)(tempDir+post.image);

        //#3 파일 쓰기
        Meteor.wrapAsync(fs.writeFile)(imageDir + post.image, blob);

        //#4 임시폴더 파일 삭제
        Meteor.wrapAsync(fs.unlink)(tempDir + post.image);

        //#4 url 셋팅 하기
        post.url = "/images/"+post.image;

        return Posts.insert(post);

    },
    removePost(post_id){
        if(!post_id){
            throw new Meteor.Error("입력값이 없습니다");
        }

        return Posts.remove({_id:post_id});
    }
    ,
    updatePost(post={}){
        if(!post._id || !post.context){
            console.log(post);
            throw new Meteor.Error("데이터를 확인하세요");
        }
        return Posts.update({_id:post._id},{$set:{context:post.context}});
    }
    ,
    saveFile(image = {blob:"",name:"",encoding:""}){

        // #1  경로변수 설정 , 랜덤 id 생성
        var path = '/Users/ppillip/Projects/temp/';
        var fileName = Random.id();

        // #2  writeFile 함수를 sync 함수로 만들기
        var fsWriteFile = Meteor.wrapAsync(fs.writeFile);

        // #3 저장하기
        fsWriteFile(path + fileName, image.blob, image.encoding);

        return {fileName:fileName,name:image.name};  // #4 결과값 리턴

    }
});




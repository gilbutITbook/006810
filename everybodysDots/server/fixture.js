
Meteor.startup(()=>{
    if(!Container.findOne({_id:"MeteorSchool"})) {
        /*컨테이너 등록*/
        Container.insert({_id:"MeteorSchool",name:"MeteorSchool"});

        /*점들 등록*/
        var size = 50*50 ; //돔에서 보여질 점의 가로 세로 갯수 결정

        for(var i= 0; i<size;i++){
            /* 17 개마다 점을 검정색으로 찍어 보자 */
            var color = i%17==0?"black":"white";
            Dot.insert({pid : "MeteorSchool",idx : i, color:color});
        }
    }
});


Meteor.methods({
    resetContainer (pid,color){
        console.log("호출은 되나");
        var cnt = Dot.update({pid:pid},{$set:{color:color}},{multi:true});
        console.log(cnt," 건이 반영되었습니다.");
        return {count:cnt};
    }
});


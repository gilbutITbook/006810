
Template.messageList.onCreated(function () {
    var inst  = this;

    /* 세션변수 limit 30으로 초기화  */
    Session.set("limit",30);

    /* 컴퓨테이션 함수로 만들자 */
    inst.subcnt = 0;
    inst.autorun(function () {
        inst.messagesSub = inst.subscribe( "messages",
                           Session.get("currentRoom"),
                           Session.get("limit") ,
                           function(){
                               /* 최초 구독완료시 && 현재 함수 처음 1번 실행시에만  */
                               if (inst.subcnt==0) {
                                   inst.subcnt = 1;
                                   $('.panel-body').scrollTop($('.chat').height());
                               }
                           });

        inst.subscribe("room",Session.get("currentRoom"),function(){
            // 감지해서 바닥으로보내는 코드를 작성하자
            Rooms.find({_id:Session.get("currentRoom")}).observe({
                changed : function(newDoc,oldDoc){
                    $('.panel-body').scrollTop($('.chat').height());
                }
            });
        });
    });
});

Template.messageList.onDestroyed(function () {
    var inst  = this;
    inst.messagesSub.stop();
});

Template.messageList.helpers({
    messages() {
        return Messages.find({},{sort:{timestamp:1}});
    }
});

Template.messageList.onRendered(function () {
    /* 정적 요소 사이즈 */
    var staticSize = 90;
    /* 스크롤 유지 */
    $(".panel-body").height($(window).height() - staticSize);
    /* 윈도우 사이즈가 변경되도 유지 */
    $(window).resize(function(){
        $(".panel-body").height($(window).height() - staticSize);
    });

    /* 무한스크롤 */
    $(".panel-body").scroll(function () {
        /*console.log( $(".panel-body").scrollTop() );*/
        if ($(".panel-body").scrollTop() == 0) {
            $(".panel-body").scrollTop(30);
            Session.set("limit",Session.get("limit")+10);
        }
    });
});


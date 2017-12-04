
FlowRouter.route('/', {
    action: function(params, queryParams) {
        console.log("루트에 접근 하시는군요");
        BlazeLayout.render('boardLayout', { content: "postList" });
    }
});

FlowRouter.route('/writePost', {
    action: function(params, queryParams) {
        BlazeLayout.render('boardLayout', { content: "regPost" });
    }
});


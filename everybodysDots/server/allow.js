
Dot.allow({
    update (userId, doc) {
        /* 항목 존재 여부만 체크 */
        return doc._id && doc.pid && doc.color ;
    }
});

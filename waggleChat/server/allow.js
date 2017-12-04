
Rooms.allow({
    insert (userId, doc) {
        return (userId && doc.owner === userId);
    }
});

/* 추가 */
Messages.allow({
    insert (userId, doc) {
        return (userId && doc.owner === userId);
    }
});

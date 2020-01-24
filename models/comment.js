var ddb = require("./album").ddbC;

var userTable = 'USERDB';

function addComment(album, user, comment, cb) {
    var addItem = {
        TableName: userTable,
        Item:{
            "ID": user.ID.S,
            "EMAIL": user.EMAIL.S,
            "POST_TIME": comment.POST_TIME,
            "ALBUM_NAME": album[1],
            "ARTIST_NAME": album[0],
            "USER_COMMENTS": comment.USER_COMMENTS
        },
        ConditionExpression: "ID <> :y AND POST_TIME <> :pt",
        ExpressionAttributeValues:{
            ":y": user.ID.S,
            ":pt": comment.POST_TIME
        }
    };
    ddb.put(addItem, function(err, data) {
        if (err) {
            console.error("Unable to add comment. Error JSON:", JSON.stringify(err, null, 2));
            return cb(err, null);
        } else {
            console.log("Adding comment succeeded");
            return cb(null, data)
        }
    });
}

function findByID(user, cb) {
    var params = {
        TableName: userTable,
        Key: {
            "ID": user[0],
            "POST_TIME": Number(user[1])
        }
    }
    ddb.get(params, function(err, piece) {
        if (err || Object.getOwnPropertyNames(piece).length == 0) {
            console.log("Unable to find the comment!");
            return cb(err, null);
        } else {
            return cb(null, piece);
        }
    })
}

function findAndUpdate(old, comment, cb) {
    ddb.get({
        TableName: userTable,
        Key: {
            "ID": old[0],
            "POST_TIME": Number(old[1])
        }
    }, function(err, original) {
        if (err) {
            return cb(err, null);
        } else {
            ddb.delete({
                TableName: userTable,
                Key: {
                    "ID": old[0],
                    "POST_TIME": Number(old[1])
                },
                ReturnValues: "ALL_OLD"
            },
            function(err, retr) {
                if (err) {
                    console.log("Unable to delete!", err);
                    return cb(err, null);
                } else {
                    var params = {
                        TableName: userTable,
                        Item: {
                            "ALBUM_NAME": retr.Attributes.ALBUM_NAME,
                            "ARTIST_NAME": retr.Attributes.ARTIST_NAME,
                            "EMAIL": retr.Attributes.EMAIL,
                            "ID": retr.Attributes.ID,
                            "POST_TIME": Date.now(),
                            "USER_COMMENTS": comment.USER_COMMENTS
                        }
                    }
                    ddb.put(params, function(err, data) {
                        if (err) {
                            console.log("Unable to recreate album!", err);
                            return cb(err, null);
                        } else {
                            return cb(null, params.Item);
                        }
                    });
                }
            });
        }
    })
}

function findAndDelete(old, cb) {
    ddb.delete({
        TableName: userTable,
        Key: {
            "ID": old[0],
            "POST_TIME": Number(old[1])
        }
    }, function(err, deleted) {
        if (err) {
            console.log("Unable to delete comment", err);
            return cb(err, null);
        } else {
            console.log("Deleted");
            return cb(null, deleted);
        }
    });
}

module.exports = {
    addComment: addComment,
    findByID: findByID,
    findAndUpdate: findAndUpdate,
    findAndDelete: findAndDelete
};
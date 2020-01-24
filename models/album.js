var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });
var ddbC = new AWS.DynamoDB.DocumentClient();
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

var albumTable = "ALBUMDB";
var userTable = "USERDB";

function findAndUpdate(album, newAlbum, cb) {
    ddbC.get({
        TableName: albumTable,
        Key:{
            "ARTIST_NAME": album[0],
            "ALBUM_NAME": album[1]
        }
    }, function(err, original) {
        if (err) {
            return cb(err, null);
        } else {
           if (original.Item.ALBUM_NAME === newAlbum.album && original.Item.ARTIST_NAME === newAlbum.artist) {
                ddbC.update({
                    TableName: albumTable,
                    Key:{
                        "ARTIST_NAME": original.Item.ARTIST_NAME,
                        "ALBUM_NAME": original.Item.ALBUM_NAME,
                    },
                    UpdateExpression: "set ALBUM_COVER = :u",
                        ExpressionAttributeValues:{
                        ":u": newAlbum.cover
                    },
                    ReturnValues: "ALL_NEW"
                },
                function(err, data) {
                    if (err) {
                        return cb(err, null);
                    }
                    return cb(null, data);
                });
            } else {
                ddbC.delete({
                    TableName: albumTable,
                    Key: {
                        "ARTIST_NAME": album[0],
                        "ALBUM_NAME": album[1]
                    },
                    ReturnValues: "ALL_OLD"
                },
                function(err, retr) {
                    if (err) {
                        console.log("Unable to delete!", err);
                        return cb(err, null);
                    } else {
                        var updateAlbum = {
                            TableName: albumTable,
                            Item: {
                                "ALBUM_NAME": newAlbum.album,
                                "ARTIST_NAME": newAlbum.artist,
                                "ALBUM_COVER": newAlbum.cover,
                                "EMAIL": retr.Attributes.EMAIL,
                                "ID": retr.Attributes.ID,
                                "PURCHASE_LINK": retr.Attributes.PURCHASE_LINK,
                                "SONGS": retr.Attributes.SONGS
                            }
                        }
                        ddbC.put(updateAlbum, function(err, data) {
                            if (err) {
                                console.log("Unable to create album!", err);
                                return cb(err, null);
                            } else {
                                return cb(null, updateAlbum.Item);
                            }
                        });
                    }
                });
            }
        }
    })
}

function findAndDelete(album, cb) {
    ddbC.delete({
        TableName: albumTable,
        Key: {
            "ARTIST_NAME": album[0],
            "ALBUM_NAME": album[1]
        },
        ReturnValues: "ALL_OLD"
    },
    function(err, retr) {
        if (err) {
            console.log("Unable to delete album", err);
            return cb(err, null);
        } else {
            console.log("Deleted");
            return cb(null, retr);
        }
    });
}

function findByID(album, cb) {
    ddbC.get(
        {
            TableName: albumTable,
            Key: {
                "ARTIST_NAME": album[0],
                "ALBUM_NAME": album[1]
            }
        },
        function(err, album) {
            if (err || Object.getOwnPropertyNames(album).length == 0) {
                return cb(err, null, null);
            } else {
                ddbC.query(
                    {
                        TableName: userTable,
                        IndexName: 'ALBUM_COMMENT',
                        KeyConditionExpression: 'ALBUM_NAME = :al',
                        FilterExpression: 'ARTIST_NAME = :ar',
                        ExpressionAttributeValues: {
                            ':al': album.Item.ALBUM_NAME,
                            ':ar': album.Item.ARTIST_NAME
                        },
                        ProjectionExpression: 'ID, USER_COMMENTS, POST_TIME'
                    },
                    function(err, userComments) {
                        if (err) {
                            console.error("Unable to read comments. Error JSON:", JSON.stringify(err, null, 2));
                            return cb(err, null, null);
                        } else {
                            return cb(null, album.Item, userComments.Items);
                        }
                    }
                );
            }
        }
    );
}

function findAlbum(album, cb) {
    ddbC.get(
        {
            TableName: albumTable,
            Key: {
                "ARTIST_NAME": album[0],
                "ALBUM_NAME": album[1]
            }
        },
        function(err, album) {
            if (err || Object.getOwnPropertyNames(album).length == 0) {
                return cb(err, null);
            } else {
                return cb(null, album);
            }
        }
    );
}

module.exports = {
    ddb: ddb,
    ddbC: ddbC,
    findAndUpdate: findAndUpdate, 
    findAndDelete: findAndDelete,
    findByID: findByID,
    findAlbum: findAlbum
};
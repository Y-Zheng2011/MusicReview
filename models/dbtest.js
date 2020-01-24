var AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-2' });
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

/*var db = {
    TableName: 'ALBUMDB',
    KeySchema: [
        {
            AttributeName: 'ARTIST_NAME',
            KeyType: 'HASH'
        },
        {
            AttributeName: 'ALBUM_NAME',
            KeyType: 'RANGE'
        }
    ],
    AttributeDefinitions: [
        {
            AttributeName: 'ALBUM_NAME',
            AttributeType: 'S'
        },
        {
            AttributeName: 'ARTIST_NAME',
            AttributeType: 'S'
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
};

// Call DynamoDB to create the table
ddb.createTable(db, function(err, data) {
  if (err) {
    console.log("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});*/

/*var addSingle = {
    TableName: 'ALBUMDB',
    Item: {
        'ARTIST_NAME' : {S: 'Eminem'},
        'ALBUM_NAME' : {S: 'Revival'},
        'ALBUM_COVER' : {S: 'https://www.nme.com/wp-content/uploads/2019/06/Webp.net-resizeimage-2-5.jpg'}
    }
};

ddb.putItem(addSingle, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data);
    }
});*/

/*var getSingle = {
    TableName: 'ALBUM_LIST',
    Key: {
        'ARTIST_NAME': {S: 'Eminem'},
        'ALBUM_NAME' : {S: 'Revival'}
    },
    ProjectionExpression: 'ARTIST_NAME'
}

ddb.getItem(getSingle, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Item);
    }
});*/

var addBatch = {
    RequestItems: {
        "ALBUMDB": [
            {
                PutRequest: {
                    Item: {
                        "ARTIST_NAME": { "S": "Linkin Park" },
                        "ALBUM_NAME": { "S": "One More Light" },
                        "COVER_LINK": { "S": "https://consequenceofsound.net/2017/05/album-review-linkin-park-one-more-light/" },
                        "ALBUM_COVER": {"S": "https://consequenceofsound.net/wp-content/uploads/2017/02/linkin-park.jpg?quality=80"},
                        "SONGS": {
                            "L": [
                                {"S": "Nobody Can Save Me"},
                                {"S": "Good Goodbye"},
                                {"S": "Talking to Myself"},
                                {"S": "Battle Symphony"},
                                {"S": "Invisible"},
                                {"S": "Heavy"},
                                {"S": "Sorry for Now"},
                                {"S": "Halfway Right"},
                                {"S": "One More Light"},
                                {"S": "Sharp Edges"}
                            ]
                        }
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "ARTIST_NAME": { "S": "Ed Sheeran" },
                        "ALBUM_NAME": { "S": "Divide" },
                        "COVER_LINK": { "S": "https://www.amazon.com/Divide-Deluxe-Version-Ed-Sheeran/dp/B01MY72DNS" },
                        "ALBUM_COVER": {"S": "https://images-na.ssl-images-amazon.com/images/I/618VVjlKb1L.jpg"}
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "ARTIST_NAME": { "S": "Linkin Park" },
                        "ALBUM_NAME": { "S": "The Hunting Party" },
                        "COVER_LINK": { "S": "https://soundcloud.com/qwerty_lp/sets/linkin-park-the-hunting-party-extended" },
                        "ALBUM_COVER": {"S": "https://i1.sndcdn.com/artworks-000092484079-plxv0j-t500x500.jpg"}
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "ARTIST_NAME": { "S": "Eminem" },
                        "ALBUM_NAME": { "S": "Recovery" },
                        "COVER_LINK": { "S": "https://www.amazon.com/Recovery-2-LP-Eminem/dp/B003KZZ4TO" },
                        "ALBUM_COVER": {"S": "https://images-na.ssl-images-amazon.com/images/I/71JZDiN8BEL._SY355_.jpg"},
                        "SONGS": {
                            "L": [
                                {"S": "Cold Wind Blows"},
                                {"S": "Talkin' 2 Myself"},
                                {"S": "On Fire"},
                                {"S": "Won't Back Down"},
                                {"S": "W.T.P."},
                                {"S": "Going Through Changes"},
                                {"S": "Not Afraid"},
                                {"S": "Seduction"},
                                {"S": "No Love"},
                                {"S": "Space Bound"},
                                {"S": "Cinderella Man"},
                                {"S": "25 to Life"},
                                {"S": "So Bad"},
                                {"S": "Almost Famous"},
                                {"S": "Love the Way You Lie"},
                                {"S": "You're Never Over"}
                            ]
                        }
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "ARTIST_NAME": { "S": "Eminem" },
                        "ALBUM_NAME": { "S": "Revival" },
                        "COVER_LINK": { "S": "https://www.nme.com/blogs/nme-blogs/eminem-rank-the-albums-2505938" },
                        "ALBUM_COVER": {"S": "https://www.nme.com/wp-content/uploads/2019/06/Webp.net-resizeimage-2-5.jpg"}
                    }
                }
            }
        ]
    }
};

ddb.batchWriteItem(addBatch, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data);
    }
});

var ddbC = new AWS.DynamoDB.DocumentClient();

/*var updateItem = {
    TableName: 'ALBUMDB',
    Key:{
        "ARTIST_NAME": 'Eminem',
        "ALBUM_NAME": 'Recovery'
    },
    UpdateExpression: "set SONGS = :s",
        ExpressionAttributeValues:{
        ":s": ["Remind Me (Intro)"]
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");
ddbC.update(updateItem, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});*/

/*var deletSingle = {
    TableName: 'ALBUM_LIST',
    Key:{
        "ARTIST_NAME": 'Linkin Park',
        "ALBUM_NAME": 'One More Light'
    }
}

console.log("Attempting to delete an item...");
ddb.delete(deletSingle, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
});*/

/*var addSingle = {
    TableName: 'ALBUMDB',
    Item: {
        "ARTIST_NAME": "Linkin Park",
        "ALBUM_NAME": "One More Light",
        "ALBUM_COVER": "https://consequenceofsound.net/wp-content/uploads/2017/02/linkin-park.jpg?quality=80",
        "SONGS": ["Nobody Can Save Me", "Good Goodbye",	"Talking to Myself", "Battle Symphony", "Invisible", "Heavy", "Sorry for Now", 	"Halfway Right",	"One More Light", "Sharp Edges"]
    }
}

console.log("Adding a new item...");
ddbC.put(addSingle, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});*/

/*var update = {
    TableName: 'ALBUMDB',
    Key: {
        "ARTIST_NAME": "Linkin Park",
        "ALBUM_NAME": "One More Light"
    },
    UpdateExpression: "set SONGS = :s",
    ExpressionAttributeValues:{
        ":s":["Nobody Can Save Me", "Good Goodbye",	"Talking to Myself", "Battle Symphony", "Invisible", "Heavy", "Sorry for Now", 	"Halfway Right",	"One More Light", "Sharp Edges"]
    },
    ReturnValues:"UPDATED_NEW"
}

console.log("Adding a new item...");
ddbC.update(update, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Updated item:", JSON.stringify(data, null, 2));
    }
});
*/

/*ddb.deleteTable({TableName: "ALBUM_LIST"}, function(err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});*/


/* ddb.listTables({}, function(err, data) {
   if (err) console.log(err, err.stack);
   else     console.log(data);
 });*/
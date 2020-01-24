var AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-2' });
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

var schemaUSERDB = {
    AttributeDefinitions: [
    {
        AttributeName: 'ID',
        AttributeType: 'S'
    },
    {
        AttributeName: 'POST_TIME',
        AttributeType: 'N'
    },
    {
        AttributeName: 'ALBUM_NAME',
        AttributeType: 'S'
    }
    ],
    KeySchema: [
    {
        AttributeName: 'ID',
        KeyType: 'HASH'
    },    
    {
        AttributeName: 'POST_TIME',
        KeyType: 'RANGE'
    }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: 'USERDB',
    GlobalSecondaryIndexes: [
        {
            IndexName: 'ALBUM_COMMENT',
            KeySchema: [
                {
                    AttributeName: 'ALBUM_NAME',
                    KeyType: 'HASH'
                },
                {
                    AttributeName: 'POST_TIME',
                    KeyType: 'RANGE'
                }
            ],
            Projection: {
                ProjectionType: "ALL"
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        }
    ]
};

var schemaUSER = {
    AttributeDefinitions: [
    {
        AttributeName: 'ID',
        AttributeType: 'S'
    },
    ],
    KeySchema: [
    {
        AttributeName: 'ID',
        KeyType: 'HASH'
    },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: 'USER'
};

var addBatch = {
    RequestItems: {
        "USERDB": [
            {
                PutRequest: {
                    Item: {
                        "ID": { S: "Harry Potter"},
                        "EMAIL" : { S: "hpotter@hogwarts.edu"},
                        "ALBUM_NAME": { S: "One More Light"},
                        "ARTIST_NAME": { S: "Linkin Park"},
                        "USER_COMMENTS": { S: "This is the BEST album ever!"},
                        "POST_TIME": { N: "1495252740000"}
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "ID": { S: "Harry Potter"},
                        "EMAIL" : { S: "hpotter@hogwarts.edu"},
                        "ALBUM_NAME": { S: "One More Light"},
                        "ARTIST_NAME": { S: "Linkin Park"},
                        "USER_COMMENTS": { S: "After listening to this album for 100 times, I sincerely recommend it to everyone."},
                        "POST_TIME": { N: "1495512000000"}
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "ID": { S: "Ron Weasley" },
                        "EMAIL" : { S: "rweasley@hogwarts.edu"},
                        "ALBUM_NAME": { S: "One More Light"},
                        "ARTIST_NAME": { S: "Linkin Park"},
                        "USER_COMMENTS": { S: "I kinda doubt Harry's comment!"},
                        "POST_TIME": { N: "1495252940000"}
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "ID": { S: "Ron Weasley" },
                        "EMAIL" : { S: "rweasley@hogwarts.edu"},
                        "ALBUM_NAME": { S: "One More Light"},
                        "ARTIST_NAME": { S: "Linkin Park"},
                        "USER_COMMENTS": { S: "OK Harry, you've got your point. But 100 times... Don't you sleep??"},
                        "POST_TIME": {N: "1495536140000"}
                    }
                }
            }
        ]
    }
};

function create(schema) {
    ddb.createTable(schema, function(err, data) {
        if (err) {
            console.log("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}

function userSeeds() {
    ddb.batchWriteItem(addBatch, function(err, data) {
        if (err) {
                console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}

//create(schemaUSERDB);
//create(schemaUSER);
userSeeds();
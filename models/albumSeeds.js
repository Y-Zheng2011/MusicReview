var ddb = require("./album").ddb;

const TableName = 'ALBUMDB';
const tbparams = {
    TableName: TableName
};

var schema = {
    AttributeDefinitions: [
    {
        AttributeName: 'ARTIST_NAME',
        AttributeType: 'S'
    },
    {
        AttributeName: 'ALBUM_NAME',
        AttributeType: 'S'
    }
    ],
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
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: TableName
};


var addBatch = {
    RequestItems: {
        "ALBUMDB": [
            {
                PutRequest: {
                    Item: {
                        "ARTIST_NAME": { "S": "Linkin Park" },
                        "ALBUM_NAME": { "S": "One More Light" },
                        "PURCHASE_LINK": { "S": "https://amzn.to/36ffPZT" },
                        "ALBUM_COVER": {"S": "//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B06X1558KW&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=musicrev09-20"},
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
                        },
                        "ID": { "S": "admin"},
                        "EMAIL": { "S": "admin"}
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "ARTIST_NAME": { "S": "Ed Sheeran" },
                        "ALBUM_NAME": { "S": "Divide" },
                        "PURCHASE_LINK": { "S": "https://amzn.to/38pNLUU" },
                        "ALBUM_COVER": {"S": "//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B01MY72DNS&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=musicrev09-20"},
                        "SONGS": {
                            "L": [
                                {"S": "Eraser"},
                                {"S": "Castle on the Hill"},
                                {"S": "Dive"},
                                {"S": "Shape of You"},
                                {"S": "Perfect"},
                                {"S": "Galway Girl"},
                                {"S": "Happier"},
                                {"S": "New Man"},
                                {"S": "Hearts Don't Break Around Here"},
                                {"S": "What Do I Know?"},
                                {"S": "How Would You Feel (Paean)"},
                                {"S": "Supermarket Flowers"},
                            ]
                        },
                        "ID": { "S": "admin"},
                        "EMAIL": { "S": "admin"}
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "ARTIST_NAME": { "S": "Linkin Park" },
                        "ALBUM_NAME": { "S": "The Hunting Party" },
                        "PURCHASE_LINK": { "S": "https://amzn.to/2RCcT48" },
                        "ALBUM_COVER": {"S": "//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B00JYKU6BK&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=musicrev09-20"},
                        "SONGS": {
                            "L": [
                                {"S": "Keys to the Kingdom"},
                                {"S": "All for Nothing"},
                                {"S": "Guilty All the Same"},
                                {"S": "The Summoning"},
                                {"S": "War"},
                                {"S": "Wastelands"},
                                {"S": "Until It's Gone"},
                                {"S": "Rebellion"},
                                {"S": "Mark the Graves"},
                                {"S": "Drawbar"},
                                {"S": "Final Masquerade"},
                                {"S": "A Line in the Sand"},
                            ]
                        },
                        "ID": { "S": "admin"},
                        "EMAIL": { "S": "admin"}
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "ARTIST_NAME": { "S": "Eminem" },
                        "ALBUM_NAME": { "S": "Recovery" },
                        "PURCHASE_LINK": { "S": "https://amzn.to/2NKIM9y" },
                        "ALBUM_COVER": {"S": "//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B003SWU9R6&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=musicrev09-20"},
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
                        },
                        "ID": { "S": "admin"},
                        "EMAIL": { "S": "admin"}
                    }
                }
            },
            {
                PutRequest: {
                    Item: {
                        "ARTIST_NAME": { "S": "Eminem" },
                        "ALBUM_NAME": { "S": "Revival" },
                        "PURCHASE_LINK": { "S": "https://amzn.to/2uibl7r" },
                        "ALBUM_COVER": {"S": "//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B077YYZYYN&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=musicrev09-20"},
                        "SONGS": {
                            "L": [
                                {"S": "Walk on Water"},
                                {"S": "Believe"},
                                {"S": "Chloraseptic"},
                                {"S": "Untouchable"},
                                {"S": "River"},
                                {"S": "Remind Me (Intro)"},
                                {"S": "Remind Me"},
                                {"S": "Revival (Interlude)"},
                                {"S": "Like Home"},
                                {"S": "Bad Husband"},
                                {"S": "Tragic Endings"},
                                {"S": "Framed"},
                                {"S": "Nowhere Fast"},
                                {"S": "Heat"},
                                {"S": "Offended"},
                                {"S": "Need Me"},
                                {"S": "In Your Head"},
                                {"S": "Castle"},
                                {"S": "Arose"},
                            ]
                        },
                        "ID": { "S": "admin"},
                        "EMAIL": { "S": "admin"}
                    }
                }
            }
        ]
    }
};

function create() {
    ddb.createTable(schema, function(err, data) {
        if (err) {
            console.log("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    }); 
}

function albumSeeds() {
    ddb.batchWriteItem(addBatch, function(err, data) {
        if (err) {
                console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}

//create();
albumSeeds();
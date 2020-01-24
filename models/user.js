var ddb = require("./album").ddb,
    bcrypt = require('bcryptjs');

var tableName = 'USER';

function register(user, cb) {
    var params = {
        TableName: tableName,
        Key: {
            'ID': {S: user.id},
        },
    };
    ddb.getItem(params, function(err, data) {
        if (err){
            return cb(err, null);
        }
        if (data.Item) {
            return cb(null, null);
        } else {
            var params = {
                "TableName": tableName,
                "Item": {
                "ID": { "S": user.id},
                "EMAIL": {"S": user.email},
                "PASSWORD": { "S":bcrypt.hashSync(user.password,bcrypt.genSaltSync(10))}
                }
            }
            ddb.putItem(params, function(err,data){
                if (err){
                    console.log("Can't register!");
                    return cb(err, null);
                }else{
                    return cb(null, data);
                }
            })
        }
    });
}

module.exports = {register: register}

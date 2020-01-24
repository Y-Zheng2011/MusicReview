var ddb = require("./album").ddb,
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcryptjs');

var tableName = 'USER';

function setUpPassport(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.ID.S);
    });

    passport.deserializeUser(function(id, done) {
        ddb.getItem({"TableName":tableName,"Key": {"ID":{S:id}}}, function(err, user){
            done(err, user);
        })
    });
    
    passport.use(new LocalStrategy({
        usernameField: 'id'
    },
        function(id, password, done) {
            ddb.getItem({"TableName":tableName,"Key": {"ID":{S:id}}}, function(err,user){
                if (err){
                    return done(err);
                }
                if (user.Item && bcrypt.compareSync(password, user.Item.PASSWORD.S))
                {
                    return done(null, user.Item);
                }
                return done(null, false);
            }
        );
    }));
}

module.exports = {setUpPassport: setUpPassport};
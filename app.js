var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    AWS = require('aws-sdk'),
    comment = require("./models/comment"),
    passport = require("passport"),
    User = require("./models/user"),
    pp = require("./models/passport"),
    methodOverride = require("method-override"),
    flash = require("connect-flash");
    
var commentRoutes = require("./routes/comments"),
    albumRoutes = require("./routes/albums"),
    indexRoutes = require("./routes/index");

const host = 'localhost',
      port = 8080;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "Nanase is the best cutest idol!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
pp.setUpPassport(passport);

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.danger = req.flash("danger");
    res.locals.success = req.flash("success");
    next();
})

app.use(indexRoutes);
app.use("/albums", albumRoutes);
app.use("/albums/:id/comments", commentRoutes);

app.listen(port, host, function() {
    console.log("The server is up!");
});
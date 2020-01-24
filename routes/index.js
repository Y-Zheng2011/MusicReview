var express = require("express"),
    router = express.Router(),
    User = require("../models/user"),
    passport = require("passport");

//Root route
router.get("/", function(req, res) {
    res.render("landing");
});

//Regiter form route
router.get("/register", function(req, res) {
    res.render("register");
});

//Register logic route
router.post("/register", function(req, res) {
    User.register(req.body, function(err, user){
        if (err) {
            req.flash("danger","Unable to create account");
            return res.redirect("/register");
        } else if (!user) {
            req.flash("danger","User already existed!");
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Welcome to MusicReview! " + req.body.id);
            res.redirect("/albums");    
        });
    });
});

//Login form route
router.get("/login", function(req, res) {
    res.render("login");
})

//Login logic route
router.post("/login", passport.authenticate("local", {
        successRedirect: "/albums",
        failureRedirect: "/login",
        failureFlash: true
}));

//Logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success","Logged you out!");
    res.redirect("/albums");
});

module.exports = router;
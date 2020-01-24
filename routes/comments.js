var express = require("express"),
    router = express.Router({mergeParams: true}),
    COMMENT = require("../models/comment"),
    ALBUM = require("../models/album"),
    middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res) {
    var str = req.params.id.split("&");
    res.render("comments/new", {albumName: str[1], artistName: str[0]});
});


//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res) {
    var str = req.params.id.split("&");
    req.body.comment.POST_TIME = Date.now();
    COMMENT.addComment(str, req.user.Item, req.body.comment, function(err, data) {
        if (err) {
            req.flash("danger", "Unable to add comment!");
        } else {
            req.flash("success", "Successfully added comment!");
            res.redirect('/albums/' + req.params.id);
        }
    });
});

//Comments Edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    var userinfo = req.params.comment_id.split("&");
    var albuminfo = req.params.id.split("&");
    ALBUM.findAlbum(albuminfo, function(err, album){
        if (err || !album) {
            req.flash("danger", "Unable to find the album");
        } else {
            COMMENT.findByID(userinfo, function(err, piece) {
                if (err) {
                    req.flash("danger", "Unable to find the comment");
                    res.redirect("back");
                } else {
                    res.render("comments/edit", {piece: piece.Item});
                }
            });
        }
    });

});

//Comments Update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    var userinfo = req.params.comment_id.split("&");
    COMMENT.findAndUpdate(userinfo, req.body.comment, function(err, data) {
        if (err) {
            req.flash("danger", "Unable to find the comment");
            res.redirect("back");
        } else {
            req.flash("success", "Successfully edited comment!");
            res.redirect("/albums/" + req.params.id);
        }
    })
})

//Comments Delete
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    var userinfo = req.params.comment_id.split("&");
    console.log(userinfo);
    COMMENT.findAndDelete(userinfo, function(err, data) {
        if (err) {
            console.log("Error: ", err);
        }
        req.flash("success", "Comment deleted!");
        res.redirect("back");
    })
})



module.exports = router;
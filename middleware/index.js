var ALBUM = require("../models/album"),
    COMMENT = require("../models/comment");

var middlewareObj={};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("danger","Please Login First!");
    res.redirect("/login");
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        var str = req.params.comment_id.split("&");
        COMMENT.findByID(str, function(err, piece) {
            if (err || !piece) {
                req.flash("danger","Unable to find the comment!");
                res.redirect("/albums");
            } else {
                if (piece.Item.ID===req.user.Item.ID.S){
                    next();
                } else {
                    req.flash("danger","Permission denied!");
                    res.redirect("/albums");
                }
            }
        });
    } else {
        req.flash("danger","Please Login First!");
        res.redirect("/login");
    }
}

middlewareObj.checkAlbumOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        var str = req.params.id.split("&");
        ALBUM.findByID(str, function(err, album, comments) {
            if (err || !album) {
                req.flash("danger","Unable to find the album!");
                res.redirect("back");
            } else {
                if (album.ID==req.user.Item.ID.S){
                    next();
                } else {
                    req.flash("danger","Permission denied!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("danger","Please Login First!");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;
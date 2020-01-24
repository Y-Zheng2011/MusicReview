var express = require("express"),
    router = express.Router(),
    ALBUM = require("../models/album"),
    middleware = require("../middleware");

var albumTable = 'ALBUMDB';
var userTable = 'USERDB';

//Index route
router.get("/", function(req, res) {
    ALBUM.ddbC.scan(
    {
        TableName: albumTable,
        ProjectionExpression: "ALBUM_NAME, ARTIST_NAME, ALBUM_COVER",
        }, function(err, allAlbums) {
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("On Index page");
                res.render("albums/index", {albums: allAlbums.Items});
            }
        }
    );
});

//Create route
router.post("/", middleware.isLoggedIn, function(req, res) {
    ALBUM.ddbC.put(
    {
        TableName: albumTable,
        Item: {
            "ARTIST_NAME": req.body.artist,
            "ALBUM_NAME": req.body.album,
            "ALBUM_COVER": req.body.cover,
            "ID": req.user.Item.ID.S,
            "EMAIL": req.user.Item.EMAIL.S
        }
    },
    function(err, data) {
        if (err) {
            req.flash("danger","Unable to add albums!");
            res.redirect("/albums");
        } else {
            req.flash("success","Successfully added new album!");
            res.redirect("/albums");
        }
    });
});

//New route
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("albums/new");
});

//Show route
router.get("/:id", function(req, res) {
    var str = req.params.id.split("&");
    ALBUM.findByID(str, function(err, album, comments) {
        if (err || !album) {
            req.flash("danger","Unable to find albums!");
            res.redirect("/albums");
        } else {
            res.render("albums/show", {album:album, comments: comments});
        }
    });
});

//Edit route
router.get("/:id/edit", middleware.checkAlbumOwnership, function(req, res) {
    var str = req.params.id.split("&");
    ALBUM.findByID(str, function(err, album, comments) {
        if (err) {
            console.error(JSON.stringify(err, null, 2));
            res.redirect("/albums");
        } else {
            res.render("albums/edit", {album: album});
        }
    });
})

//Show route
router.put("/:id", middleware.checkAlbumOwnership, function(req, res) {
    var str = req.params.id.split("&");
    ALBUM.findAndUpdate(str, req.body.album, function(err, data) {
        if (err) {
            console.error(JSON.stringify(err, null, 2));
            res.redirect("/albums");
        } else {
            console.log("Item updated");
            res.redirect("/albums/" + data.ARTIST_NAME + '&' + data.ALBUM_NAME);
        }
    });
})

router.delete("/:id", middleware.checkAlbumOwnership, function(req, res) {
    var str = req.params.id.split("&");
    ALBUM.findAndDelete(str, function(err, data) {
        if (err) {
            console.error(JSON.stringify(err, null, 2));
        } else {
            console.log("Item deleted");
        }
        res.redirect("/albums");
    });
})



module.exports = router;
"use strict";

const Bookmark = require("../models/bookmark");

exports.getAllBookmarks = (req, res) => {
    Bookmark.find({})
        .exec()
        .then(bookmarks => {
            res.render("bookmarks", {
                bookmarks: bookmarks
            });
        })
        .catch((error) => {
            console.log(error.message);
            return [];
        })
        .then(() => {
            console.log("promise complete");
        });
};

// Wird wegen getAllBookmarks() nicht mehr benötigt, meine ich
/*
exports.sendBookmarks = (req, res) => {
    res.render("bookmarks");
};
*/

exports.saveBookmarks = (req, res) => {
    let newBookmark = new Bookmark({
        title: req.body.title,
        url: req.body.url
    });
    newBookmark
        .save()
        .then(() => {
            res.render("done");
        })
        .catch((error) => {
            res.send(error);
        });
};
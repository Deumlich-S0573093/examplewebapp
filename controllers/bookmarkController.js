"use strict";

const Bookmark = require("../models/bookmark");

exports.getAllBookmarks = (req, res) => {
    Bookmark.find({})
        .exec()
        .then(bookmarks => {
            res.render("bookmarks", {
                bookmarks: bookmarks,
                savedData: false,
                newBookmark: null
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

exports.saveBookmarks = (req, res) => {
    let newBookmark = new Bookmark({
        title: req.body.title,
        url: req.body.url
    });
    newBookmark
        .save()
        .then(() => {
            res.render("bookmarks", {
                bookmarks: null,
                savedData: true,
                newBookmark: newBookmark
            });
        })
        .catch((error) => {
            res.send(error);
        });
};
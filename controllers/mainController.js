"use strict"

const Topic = require("../models/topic");
const Bookmark = require("../models/bookmark");

exports.sendOverview = (req, res) => {
    console.log(`Controller from: ${req.url}`);

    const topics = Topic.find();
    const bookmarks = Bookmark.find();

    Promise.all([
        topics,
        bookmarks
        ]).then(data => {
        let [topics, bookmarks] = data;
        res.render('index', {topics: topics, bookmarks: bookmarks});
    });

};
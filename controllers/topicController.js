"use strict";
const Topic = require("../models/topic");

exports.getAllTopics = (req, res) => {
    Topic.find({})
        .exec()
        .then(topics => {
            res.render("topics", {
                topics: topics
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

exports.saveTopics = (req, res) => {
    let newTopic = new Topic({
        title: req.body.title
    });
    newTopic
        .save()
        .then(() => {
        res.render("done");
    })
        .catch((error) => {
            res.send(error);
        });
};
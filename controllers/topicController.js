"use strict";
const Topic = require("../models/topic");

exports.getAllTopics = (req, res) => {
    Topic.find({})
        .exec()
        .then(topics => {
            res.render('topics', {
                topics: topics
            });
        })
        .catch((error) => {
            console.log(error.message);
            return [];
        })
        .then(() => {
            console.log('promise complete');
        });
};

exports.saveTopics = (req, res) => {
    let newTopic = new Topic({
        title: req.body.title,
        description: req.body.description
        //TODO: author: here must be completed after implementing the user scheme
    });
    newTopic
        .save()
        .then(() => {
            res.redirect('back');
        })
        .catch((error) => {
            res.send(error);
        });
};

exports.getTopic = (req, res) => {
    const topicId = req.params.id
    Topic.findById(topicId, function (error, topic) {
        if (error) {
            res.send(error);
        } else {
            // console.log(req.params.id);
            // console.log(topic);
            res.render('topic',{topic:topic});
        }
    });


}
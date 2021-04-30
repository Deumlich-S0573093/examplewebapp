"use strict";

const topics = [
    {
        title: "Topic A",
        subtitle: "subtopic 1"
    },
    {
        title: "Topic B",
        subtitle: "subtopic 1"
    },
    {
        title: "Topic C",
        subtitle: "subtopic 1"
    }
];

exports.sendTopics = (req, res) => {
    console.log(`Controller from: topic!!`);
    res.render("topics", {
        activeTopics: topics
    });
};
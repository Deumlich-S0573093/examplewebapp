"use strict";

//Require mongoose
const mongoose = require("mongoose");

//Define schema properties
const topicSchema = mongoose.Schema({
    title: String,
    description: String,
    creationDate: {type: Date, default: Date.now},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        body: String, date: Date, author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    isSubtopic: Boolean,
    subTopics: [{type: mongoose.Schema.Types.ObjectId, ref: 'Topic'}]

});

//Export the model
module.exports = mongoose.model("Topic", topicSchema, "topics");
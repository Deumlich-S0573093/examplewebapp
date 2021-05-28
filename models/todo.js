"use strict";

//Require mongoose
const mongoose = require("mongoose");

//Define schema properties
const todoSchema = mongoose.Schema({
    title: String,
    creationDate: {type: Date, default: Date.now},
    dueDate: Date,
    status: {
        type: String,
        enum: ['CREATED','STARTED', 'PAUSED', 'DONE'],
        default: 'CREATED'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

//Export the model
module.exports = mongoose.model("Todo", todoSchema, "todos");
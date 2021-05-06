"use strict";

//Require mongoose
const mongoose = require("mongoose");

//Define schema properties
const topicSchema = mongoose.Schema({
    title: String,
});

//Export the model
module.exports = mongoose.model("Topic", topicSchema, "topics");
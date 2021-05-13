"use strict";

//Require mongoose
const mongoose = require("mongoose");

//Define schema properties
const bookmarkSchema = mongoose.Schema({
        title: String,
        url: String,
        // labels: [] <--- von Labels - Schema
    });

//Export the model
module.exports = mongoose.model("Bookmark", bookmarkSchema, "bookmarks");
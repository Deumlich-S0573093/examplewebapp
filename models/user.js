"use strict";

const mongoose = require("mongoose"),
    { Schema } = require("mongoose");

const userSchema = new Schema(
    {
        name: {
            first: {
                type: String,
                trim: true
            },
            last: {
                type: String,
                trim: true
            }
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },
        topics: [{type: Schema.Types.ObjectId, ref: "Topics"}],
        bookmarks: [{type: Schema.Types.ObjectId, ref: "Bookmarks"}]
    },
    {
        timestamps: true
    }
);

userSchema.virtual("fullName").get(function() {
    return `${this.name.first} ${this.name.last}`;
});

module.exports = mongoose.model("User", userSchema);

"use strict";

const express = require("express"),
    app = express(),
    layouts = require("express-ejs-layouts"),
    logController = require("./controllers/logController"),
    errorController = require("./controllers/errorController"),
    mainController = require("./controllers/mainController"),
    topicController = require("./controllers/topicController"),
    todoController = require("./controllers/todoController"),
    bookmarkController = require("./controllers/bookmarkController"),
    mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(
    process.env.MONGODB_URI ||
    /* "mongodb://localhost:27017/yapp-db", */
    "mongodb+srv://group04:wtat-ss21@cluster0.lsuqg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex:true,
        useUnifiedTopology: false
    }
);

const db = mongoose.connection;

let port = 0;

app.set("view engine", "ejs");

// register layouts (ejs)
app.use(layouts);

// body parsing
app.use(
    express.urlencoded({
        extended: false
    })
);

// serving static files
app.use(express.static("public"));

app.use(express.json());

// basic request logging
app.use(logController.logRequests);

app.get("/", mainController.sendOverview);
app.get("/topics", topicController.getAllTopics);
app.get("/todos", todoController.sendToDos);

app.get("/bookmarks", bookmarkController.getAllBookmarks);
app.post("/add", bookmarkController.saveBookmarks);
app.post("/addTopic", topicController.saveTopics);

app.get("/test", async (req, res) => {
    res.json({message: 'pass!'});
});

app.use(errorController.pageNotFound);
app.use(errorController.internalServer);

port = app.get("port");

db.once("open", () => {
    //console.log("Successfully connected to MongoDB using Mongoose!");
});

module.exports = app;
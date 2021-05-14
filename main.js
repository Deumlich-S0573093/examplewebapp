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
    "mongodb://localhost:27017/yapp-db",
    {useNewUrlParser: true, useFindAndModify: false, useCreateIndex:true, useUnifiedTopology: true}
);

const db = mongoose.connection;

let port = 0;

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3030);

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
app.post("/topics", topicController.saveTopics);

app.use(errorController.pageNotFound);
app.use(errorController.internalServer);

port = app.get("port");

app.listen(port, () => {
    console.log(`Server running at http:localhost:${port}`);
});

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});
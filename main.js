"use strict";

const express = require("express"),
    app = express(),
    logConstroller = require("./controllers/logController"),
    errorController = require("./controllers/errorController"),
    mainController = require("./controllers/mainController"),
    topicController = require("./controllers/topicController"),
    todoController = require("./controllers/todoController"),
    bookmarkController = require("./controllers/bookmarkController");

let port = 0;

app.set("port", process.env.PORT || 3000);

// body parsing
app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

// basic request logging
app.use(logConstroller.logRequests);

app.use("/", mainController.sendOverview);
app.use("/topics", topicController.sendTopics);
app.use("/todos", todoController.senToDos);
app.use("/bookmarks", bookmarkController.sendBookmarks);

app.use(errorController.pageNotFound);
app.use(errorController.internalServer);

port = app.get("port");

app.listen(port, () => {
    console.log(`Server running at http:localhost:${port}`);
});
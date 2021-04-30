"use strict";

const express = require("express"),
    app = express(),
    layouts = require("express-ejs-layouts"),
    logController = require("./controllers/logController"),
    errorController = require("./controllers/errorController"),
    mainController = require("./controllers/mainController"),
    topicController = require("./controllers/topicController"),
    todoController = require("./controllers/todoController"),
    bookmarkController = require("./controllers/bookmarkController");

let port = 0;

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

// register layouts (ejs)
app.use(layouts);

// body parsing
app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

// basic request logging
app.use(logController.logRequests);

// serving static files
app.use(express.static("public"));

app.get("/", mainController.sendOverview);
app.get("/topics", topicController.sendTopics);
app.get("/todos", todoController.sendToDos);
app.get("/bookmarks", bookmarkController.sendBookmarks);

app.use(errorController.pageNotFound);
app.use(errorController.internalServer);

port = app.get("port");

app.listen(port, () => {
    console.log(`Server running at http:localhost:${port}`);
});
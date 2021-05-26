"use strict";

const express = require("express"),
    app = express(),
    layouts = require("express-ejs-layouts"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),//Require the method-override module.
    logController = require("./controllers/logController"),
    errorController = require("./controllers/errorController"),
    mainController = require("./controllers/mainController"),
    topicController = require("./controllers/topicController"),
    todoController = require("./controllers/todoController"),
    bookmarkController = require("./controllers/bookmarkController"),
    usersController = require("./controllers/usersController"); //added

mongoose.Promise = global.Promise;

mongoose.connect(
    process.env.MONGODB_URI ||

    /* "mongodb://localhost:27017/yapp-db", */

    "mongodb+srv://group04:wtat-ss21@cluster0.lsuqg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useFindAndModify: false,

        useCreateIndex: true,

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
//Configure the application router to use methodOverride as middleware.
app.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
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
app.get("/topics/:id", topicController.getTopic);

app.post("/add", bookmarkController.saveBookmarks);
app.post("/topics", topicController.saveTopics);

//for USER:
app.get("/users", usersController.index, usersController.indexView); // all users.
app.get("/users/new", usersController.new); //Handle requests to view the creation form.
app.post("/users/create", usersController.create, usersController.redirectView); //Handle requests to submit data from the creation form, and display a view.
app.get("/users/:id", usersController.show, usersController.showView); //uses the /users path along with an :id parameter. This parameter will be filled with the user’s ID.
app.get("/users/:id/edit", usersController.edit);//send users to view edit.ejs
app.put("/users/:id/update", usersController.update, usersController.redirectView);//Process data from the edit form, and display the user show page.
app.delete ("/users/:id/delete", usersController.delete, usersController.redirectView);//handles DELETE requests that match the path users/ plus the user’s ID plus /delete.

app.get("/test", async (req, res) => {
    res.json({message: 'pass!'});
});

app.use(errorController.pageNotFound);
app.use(errorController.internalServer);

port = app.get("port");

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

module.exports = app


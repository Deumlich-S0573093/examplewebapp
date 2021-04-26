"use strict";

const express = require("express"),
    app = express(),
    logConstroller = require("./controllers/logController"),
    errorController = require("./controllers/errorController");

let port = 0;

app.set("view engine", "ejs");
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

// TODO: remove when controllers get implemented
app.get("/", (req, res) => {
    res.render("index");
});

app.use(errorController.pageNotFound);
app.use(errorController.internalServer);

port = app.get("port");

app.listen(port, () => {
    console.log(`Server running at http:localhost:${port}`);
});
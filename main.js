"use strict";

const express = require("express"),
    app = express();
let port = 0;

app.set("port", process.env.PORT || 3000);

// body parsing
app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Yet antoher todo app");
});

port = app.get("port");

app.listen(port, () => {
    console.log(`Server running at http:localhost:${port}`);
});
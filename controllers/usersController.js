"use strict";

const User = require("../models/user");

module.exports = {
    index: (req, res, next) => {
        User.find()
            .then(users => {
                res.locals.users = users;
                next();
            })
            .catch(error => {
                console.log(`Error fetching users: ${error.message}`);
                next(error);
            });
    },
    indexView: (req, res) => {
        res.render("users/index");
    },
    //Add the new action to render a form.
    new: (req, res) => {
        res.render("users/new");
    },
    //Add the create action to save the user to the database.
    create: (req, res, next) => {
        let userParams = {
            name: {
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            password: req.body.password
        };
        User.create(userParams)
            .then(user => {
                res.locals.redirect = "/users";
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error saving user: ${error.message}`);
                next(error);
            });
    },
    //Render the view in a separate redirectView action.
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let userId = req.params.id; //Collect the user ID from the request params.
        User.findById(userId) //Find a user by its ID.
            .then(user => {
                res.locals.user = user; //Pass the user through the response object to the next middleware function.
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error); //Log and pass errors to next function.
            });
    },
    //Render show view.
    showView: (req, res) => {
        res.render("users/show");
    },
    //Edit action.
    edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId) //Use findById to locate a user in the database by their ID.
            .then(user => {
                res.render("users/edit", { //Render the user edit page for a specific user in the database.
                    user: user
                });
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },
    //Update action.
    update: (req, res, next) => {
        let userId = req.params.id,
            userParams = { //Collect user parameters from request.
                name: {
                    first: req.body.first,
                    last: req.body.last
                },
                email: req.body.email,
                password: req.body.password,
            };
        User.findByIdAndUpdate(userId, { //Use findByIdAndUpdate to locate a user by ID and update the document record in one command.
            $set: userParams
        })
            .then(user => {
                res.locals.redirect = `/users/${userId}`;
                res.locals.user = user; //Add user to response as a local variable, and call the next middleware function.
                next();
            })
            .catch(error => {
                console.log(`Error updating user by ID: ${error.message}`);
                next(error);
            });
    },
    //Delete action
    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId) //Deleting a user with the findByIdAndRemove method
            .then(() => {
                res.locals.redirect = "/users";
                next();
            })
            .catch(error => {
                console.log(`Error deleting user by ID: ${error.message}`);
                next();
            });
    }
};
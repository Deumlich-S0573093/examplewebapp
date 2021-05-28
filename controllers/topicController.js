"use strict";

const Topic = require("../models/topic");

module.exports = {

    getAllTopics: (req, res) => {
        Topic.find({})
            .exec()
            .then(topics => {
                res.render('topics', {
                    topics: topics
                });
            })
            .catch((error) => {
                console.log(error.message);
                return [];
            })
            .then(() => {
                console.log('promise complete');
            });
    },

    getTopic: (req, res) => {
        const topicId = req.params.id
        Topic.findById(topicId, function (error, topic) {
            if (error) {
                res.send(error);
            } else {
                res.render('topic', {topic: topic});
            }
        });
    },

    saveTopics: (req, res) => {
        let newTopic = new Topic({
            title: req.body.title,
            description: req.body.description
            //TODO: author: here must be completed after implementing the user scheme
        });
        newTopic
            .save()
            .then(() => {
                res.redirect('back');
            })
            .catch((error) => {
                res.send(error);
            });
    },

    // //Update action.
    // update: (req, res, next) => {
    //     let topicId = req.params.id,
    //         topicParams = { //Collect user parameters from request.
    //
    //         };
    //     Topic.findByIdAndUpdate(topicId, { //Use findByIdAndUpdate to locate a user by ID and update the document record in one command.
    //         $set: topicParams
    //     })
    //         .then(user => {
    //             res.locals.redirect = `/users/${topicId}`;
    //             res.locals.topic = topic; //Add user to response as a local variable, and call the next middleware function.
    //             next();
    //         })
    //         .catch(error => {
    //             console.log(`Error updating Topic by ID: ${error.message}`);
    //             next(error);
    //         });
    // }

    deleteTopic: async (req, res) => {
        let topicId = req.params.id;
        console.log(topicId,'api/delete')
        console.info("I am here")

        await Topic.findByIdAndDelete(topicId) //Deleting a user with the findByIdAndRemove method
            .then(() => {
                res.locals.redirect = "/topics";
            })
            .catch(error => {
                console.log(`Error deleting user by ID: ${error.message}`);
            });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },

    // show: (req, res, next) => {
    //     let userId = req.params.id; //Collect the user ID from the request params.
    //     User.findById(userId) //Find a user by its ID.
    //         .then(user => {
    //             res.locals.user = user; //Pass the user through the response object to the next middleware function.
    //             next();
    //         })
    //         .catch(error => {
    //             console.log(`Error fetching user by ID: ${error.message}`);
    //             next(error); //Log and pass errors to next function.
    //         });
    // },
    // //Render show view.
    // showView: (req, res) => {
    //     res.render("users/show");
    // },
    //Edit action.

    // edit: (req, res, next) => {
    //     let userId = req.params.id;
    //     User.findById(userId) //Use findById to locate a user in the database by their ID.
    //         .then(user => {
    //             res.render("users/edit", { //Render the user edit page for a specific user in the database.
    //                 user: user
    //             });
    //         })
    //         .catch(error => {
    //             console.log(`Error fetching user by ID: ${error.message}`);
    //             next(error);
    //         });
    // },
    // //Update action.
    // update: (req, res, next) => {
    //     let userId = req.params.id,
    //         userParams = { //Collect user parameters from request.
    //             name: {
    //                 first: req.body.first,
    //                 last: req.body.last
    //             },
    //             email: req.body.email,
    //             password: req.body.password,
    //         };
    //     User.findByIdAndUpdate(userId, { //Use findByIdAndUpdate to locate a user by ID and update the document record in one command.
    //         $set: userParams
    //     })
    //         .then(user => {
    //             res.locals.redirect = `/users/${userId}`;
    //             res.locals.user = user; //Add user to response as a local variable, and call the next middleware function.
    //             next();
    //         })
    //         .catch(error => {
    //             console.log(`Error updating user by ID: ${error.message}`);
    //             next(error);
    //         });
    // },
    //Delete action

};

//
// exports.saveSubtopics = (req, res) => {
//     const topicId = req.params.id
//     const topic = Topic.findById(topicId)
//     let newTopic = new Topic({
//         title: req.body.title,
//         description: req.body.description
//         //TODO: author: here must be completed after implementing the user scheme
//     });
//     topic.update()
//
// }
//

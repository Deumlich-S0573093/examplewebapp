"use strict";

const httpStatus = require("http-status-codes");

exports.pageNotFound = (req, res) => {
    let errorCode = httpStatus.StatusCodes.NOT_FOUND;
    res.status(errorCode);
    res.send(`${errorCode} | This page could not be found`);
};

exports.internalServer = (req, res) => {
    let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occured: ${errorCode.stack}`);
    res.status(errorCode);
    res.send(`${errorCode} | Sorry! Your application is taking an nap!`);
};
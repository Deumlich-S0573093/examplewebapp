exports.logRequests = (req, res, next) => {
    console.log(`Request was made to: ${req.url}`);
    next();
};
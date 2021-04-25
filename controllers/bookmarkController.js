exports.sendBookmarks = (req, res) => {
    console.log(`Controller from: ${req.url}`);
    res.send(`This Page is for: ${req.url}`);
};
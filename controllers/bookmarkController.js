exports.sendBookmarks = (req, res) => {
    console.log(`Controller from: ${req.url}`);
    res.render("bookmarks");
};
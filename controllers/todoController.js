exports.sendToDos = (req, res) => {
    console.log(`Controller from: ${req.url}`);
    res.render("todos");
};
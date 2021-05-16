const app = require("./app");

app.set("port", process.env.PORT || 3030);

app.listen(app.get("port"), () => {
    //console.log(`Server running at http://localhost:${app.get("port")}`);
});
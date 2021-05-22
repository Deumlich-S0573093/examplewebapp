const app = require("./app");
/*const result = dotenv.config()

if (result.error) {
  throw result.error
}

console.log(result.parsed)
*/

app.set("port", process.env.PORT || 3030);

app.listen(app.get("port"), () => {

    //console.log(`Server running at http://localhost:${app.get("port")}`);
});

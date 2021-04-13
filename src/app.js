const path = require("path");
const express = require("express");
const hbs = require("hbs");
const routes = require("./routes/admin");
const app = express();
const port = process.env.PORT || 8000;

//Express path config
const viewPath = path.join(__dirname, "../Templates/views");
const publicDirectory = path.join(__dirname, "../Public");
const partialsDirectory = path.join(__dirname, "../Templates/partials");

//handlebars template engine location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsDirectory);

//setup static directory to serve
app.use(express.static(publicDirectory));

app.use("/", routes);

app.get("/*", notFound);

app.listen(port, () => {
  console.log("app listening on port 8000");
});

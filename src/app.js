const path = require("path");
const express = require("express");
const hbs = require("hbs");
const routes = require("./routes/admin");
const admin = require("./models/admin");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("cookie-session");
const passport = require("passport");
require("dotenv").config({ path: "variables.env" });
require("./db/mongoose");

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

// app.use(morgan()); // log every request to the console
app.use(cookieParser(process.env.SECRET)); // read cookies (needed for auth)
// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressValidator());

app.use(
  session({
    name: "session",
    // keys: [
    //   /* secret keys */
    // ],
    secret: process.env.SECRET,

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

passport.use(admin.createStrategy());
passport.serializeUser(admin.serializeUser());
passport.deserializeUser(admin.deserializeUser());

app.use("/", routes);

app.listen(port, () => {
  console.log("app listening on port 8000");
});

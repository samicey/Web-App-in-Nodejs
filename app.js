const express = require("express");
const path = require("path");
const chalk = require("chalk"); // to set colors to codes
const debug = require("debug")("app"); // for stronger debugging capabillities
const morgan = require("morgan"); // morgan is used to log out web requests to your console
const bodyParser = require("body-parser");
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config()

const app = express();

//  MIDDLEWARES
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:process.env.SECRET}))

require('./src/config/passport.js')(app);
app.use(express.static(path.join(__dirname, "/public")));

//  This code serves the static js and css from the node_modules directory in
//  order to easily run updates. The program flow first checks in public then
//  proceeds to check in other specified directories if the file is not found
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules", "bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules", "jquery/dist"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules", "bootstrap/dist/js"))
);
app.set("views", "./src/views");
app.set("view engine", "ejs");

const nav = [
  { links: "/books", title: "Book" },
  { links: "/authors", title: "Author" }
];
const bookRouter = require("./src/routes/bookRoutes")(nav);
const adminRouter = require("./src/routes/adminRoutes")(nav);
const authRouter = require("./src/routes/authRoutes")(nav);

app.use("/books", bookRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 4200;

app.get("/", (req, res) => {
  res.render("index", {
    nav: [
      { links: "/books", title: "Books" },
      { links: "/authors", title: "Authors" },
      { links: "/auth/logout", title: "Logout" }      
    ],
    title: "Library"
  });
});
app.listen(PORT, () => {
  debug(`App listening on PORT ${chalk.green(PORT)}`);
});

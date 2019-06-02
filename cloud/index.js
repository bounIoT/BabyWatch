const express = require('express'); // Web Framework
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient; // Database Client
const mongoose = require("mongoose"); // Database Connector
const session = require("express-session");  // Session Handler
const cookieParser = require("cookie-parser"); // Cookie Parser
const MongoStore = require("connect-mongo")(session); // Storing Sessions
const helmet = require('helmet'); // Security plugin
const CONFIG = require('./config.js'); // Config
const url = require("url"); // Parsing URL
const PORT = process.env.PORT || 5000;

app.use(helmet()); // Security plugin

mongoose.connect(CONFIG.mongo.uri, { useNewUrlParser: true }); //Database Connection

const models = {
  user: require("./models/user").user,
  baby: require("./models/baby").baby,
  device: require('./models/device').device,
  data: require("./models/data").data
}; //Database Schemas

let nav = [
  {
    title: 'Homepage',
    url: '/',
    icon: 'home'
  },
  {
    title: 'Login',
    url: '/login',
    icon: 'person'
  },
  {
    title: 'Register',
    url: '/register',
    icon: 'person_add'
  }
]; //Defined Navigation

app.use(cookieParser()); //Cookie Parser Middleware
app.use(bodyParser.urlencoded({ extended: true })); //BodyParser Middleware
app.use(bodyParser.json());

app.use(
    session({
      secret: CONFIG.sessionSecret,
      resave: true,
      saveUninitialized: false,
      store: new MongoStore({
        mongooseConnection: mongoose.connection
      })
    })
  ); //Session Middleware

app.use('/assets',express.static('public')); //Handling assets URI

app.use((req,res,next) => {
  req.args = {};
  req.args.url = req.originalUrl;
  next();
}); //Passing URL as a parameter to front-end

var api = require("./routers/api"); // API Router

app.use(function (req, res, next) {
    if (
        (req.session && req.session.username) ||
        req.url.includes("/login") ||
        req.url.includes("/api") ||
        req.url.includes("/assets") ||
        req.url === "/favicon.ico" ||
        req.url === "/logout" ||
        req.url === "/register"
    ) {
        return next();
    } else {
        res.redirect("/login");
    }
}); // Excluding pages from session control


var dash = require("./routers/dash"); // Dash Router

 app.use("/api", api);
 app.use("/dash", dash);
// app.use("/user", user);

app.set("view engine", "ejs"); //Defining EJS as viewing engine

app.get("/", function (req, res) {
    (req.session && req.session.username) ? res.redirect("/dash") : res.redirect("/login"); //Redirecting to dashboard if logged in
}); 

// Login & Register Pages

app.get("/register", function (req, res) {
  res.render("pages/register", {
    title: "Register",
    args: req.args,
    nav: nav
  });
}); 

app.get("/login", function (req, res) {
  res.render("pages/login", {
    title: "Login",
    args: req.args,
    nav: nav
  });
});

app.post("/register", function (req, res) {
    if (
        req.body.email &&
        req.body.password === req.body.passwordConf
    ) {
        var userData = {
        email: req.body.email,
        name: req.body.name,
        username: req.body.username,
        surname: req.body.surname,
        password: req.body.password
        };

        models.user.create(userData, function (err, user) {
        if (err) {
            return res.send(err);
        } else {
            return res.redirect("/");
        }
        });
    }
}); //Registering user if neccessary fields given.

app.post("/login", function (req, res) {
    if (req.body.email && req.body.password) {
      models.user.authenticate(req.body.email, req.body.password, function (
        error,
        user
      ) {
        if (error || !user) {
          res.redirect(
            url.format({
              pathname: "/login",
              query: {
                error: "Wrong login details!",
                email : req.body.email || ''
              }
            })
          );
        } else {
          req.session.username = user.username;
          return res.redirect("/dash");
        }
      });
    } else {
      res.redirect(
        url.format({
          pathname: "/login",
          query: {
            error: "One or more field is empty!",
            email : req.body.email || ''
          }
        })
      );
    }
}); // Logging user in

app.get("/logout", function (req, res, next) {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect("/");
            }
        });
    }
}); // Logging user out

app.listen(PORT, function () {
    console.log("magic happens on *:" + PORT);
}); // Listening given port  
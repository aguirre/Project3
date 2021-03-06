const express = require("express");
const session = require("express-session");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes");
const schedule = require("node-schedule");

const history = require("connect-history-api-fallback");
require("dotenv").config({path: "./keys/apikey.env"});

const ResortInfo = require("./weather_api/weather");
const ResState = require("./resort_state");

var passport = require("./configuration/passport");
// Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  
}

app.use(history());



// Passport info
app.use(
  session({ secret: "snowroutes", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(routes);

// Job scheduler
const snowInfo = schedule.scheduleJob("0 43 19 * * *", function() {
  console.log("scheduler working");
  ResortInfo();
  // ResState();
});
// Add Sequelize

// Start Server
app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}`);
});

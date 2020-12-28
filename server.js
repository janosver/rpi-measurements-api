const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to rpi-measurements API" });
});

require("./routes/measurements.routes.js")(app);

// set port, listen for requests
app.listen(8000, () => {
  console.log("Server is running on port 8000.");
});
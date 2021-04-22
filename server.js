const express = require("express");
const bodyParser = require("body-parser");

const swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./rpi-measurements-api.v1.1.json');

const apiConfig = require('./config/config.json');

swaggerurl = apiConfig.apiUrl + ":" + apiConfig.apiPort +"/swagger";

swaggerDocument =JSON.parse(JSON.stringify(swaggerDocument).replace("http://localhost:8000", apiConfig.apiUrl+":"+apiConfig.apiPort));

const app = express();
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/measurements.routes.js")(app);

app.get("/", (req, res) => {
  
  res.send(`
  <!DOCTYPE html>
  <html lang="en" style="background-color: #f1f1f1;">
  <body style="max-width: 1050px;margin:auto;background-color: #ffffff; height: 100vh; padding:10px">
  <h1 style="margin-top:0px">Welcome to rpi-measurements-api</h1>
  <p>This is an API to store and retreive temperature, humidity and soil moisture measurements.</p>
  <p>Swagger: <a href ="`+swaggerurl+`">`+swaggerurl+`</a><br>
  More info and source code: <a href="https://github.com/janosver/rpi-measurements-api">https://github.com/janosver/rpi-measurements-api</a>
  </p>
  </body>
  </html>
  `);
});

// set port, listen for requests
app.listen(apiConfig.apiPort, () => {
  console.log(`Server is running on port ${apiConfig.apiPort}.`);
  console.log ('Swagger is available at '+ swaggerurl);
});

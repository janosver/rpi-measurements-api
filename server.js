const express = require("express");
const bodyParser = require("body-parser");

const swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./rpi-measurements-api.v1.json');

const apiConfig = require('./config/config.json');

swaggerDocument =JSON.parse(JSON.stringify(swaggerDocument).replace("http://localhost:8000", apiConfig.apiUrl+":"+apiConfig.apiPort));

const app = express();
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/measurements.routes.js")(app);

// set port, listen for requests
app.listen(apiConfig.apiPort, () => {
  console.log(`Server is running on port ${apiConfig.apiPort}.`);
  console.log ('Swagger is available at '+apiConfig.apiUrl+":"+apiConfig.apiPort+'/swagger')
});

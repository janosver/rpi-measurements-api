module.exports = app => {
  const tempAndHum = require("../controllers/measurements.controller.js");

  // Create a new Measurement
  app.post("/tempAndHum", tempAndHum.create);

  // Retrieve all Customers
  app.get("/tempAndHum", tempAndHum.getAll);

  // Retrieve a single Customer with customerId
  app.get("/tempAndHum/:device", tempAndHum.findByDevice);
};
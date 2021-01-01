module.exports = app => {
  const tempAndHum = require("../controllers/measurements.controller.js");

  // Create a new Measurement
  app.post("/tempandhum", tempAndHum.create);

  // Retrieve all Customers
  app.get("/tempandhum", tempAndHum.getAll);

  // Retrieve a single Customer with customerId
  app.get("/tempandhum/:device", tempAndHum.findByDevice);
};
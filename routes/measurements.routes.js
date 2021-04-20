module.exports = app => {
  const tempAndHum = require("../controllers/measurements.controller.js");
  const soilMoisture = require("../controllers/measurements.controller.js");

  // Save a new temperature and humidity measurement
  app.post("/tempandhum", tempAndHum.saveTempAndHum);

  // Retrieve all temperature and humidity measurements
  app.get("/tempandhum", tempAndHum.getAllTempAndHum);

  // Retrieve a single temperature and humidity measurements by device
  app.get("/tempandhum/:device", tempAndHum.findByDevice);

  
  // Save a new soil moisture measurement
  app.post("/soilmoisture", soilMoisture.saveSoilMoisture);

  // Retrieve all soil moisture measurements
  app.get("/soilmoisture", soilMoisture.getAllSoilMoisture);

  // Retrieve a single temperature and humidity measurements by device and sensor
  app.get("/soilmoisture/:device/:sensor", soilMoisture.findSoilMoisture);
  
};
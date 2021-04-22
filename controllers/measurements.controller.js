var dateFormat = require("dateformat");

const tempAndHum = require("../models/tempandhum.measurments.model");
const soilMoisture = require("../models/soilmoisture.measurments.model.js");

// Save a new temperature and humidity measurement
exports.saveTempAndHum = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Save new temperature and humidity measurements
    const tandh = new tempAndHum({
      device: req.body.device,
      dateTime: req.body.dateTime,
      temperature: req.body.temperature,
      humidity: req.body.humidity
    });

    // Save temperature and humidity measurement in the database
    tempAndHum.savetempAndHum(tandh, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while saving the measurement."
        });
      else res.send(data);
    });
  };

// Retrieve all temperature and humidity measurements from the database.
exports.getAllTempAndHum = (req, res) => {
  var fromDate = new Date();
  fromDate.setHours(fromDate.getHours() - 48);
  fromDate = dateFormat(fromDate ,"yyyy-mm-dd	HH:MM:ss");

  tempAndHum.getAll(fromDate, (err, data) => {
      if (err)
          res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving measurements."
          });
      else res.send(data);
      });  
};

// Find the latest temperature and humidity measurements for a device
exports.findByDevice = (req, res) => {
  tempAndHum.findByDevice(req.params.device, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found measurments for device ${req.params.device}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving measurments for device " + req.params.device
            });
          }
        } else res.send(data);
      });
};

// Save a new soil moisture measurement
exports.saveSoilMoisture = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

   // Save new soil moisture measurements
   const soilm = new soilMoisture({
    device: req.body.device,
    dateTime: req.body.dateTime,
    sensor: req.body.sensor,
    voltage: req.body.voltage,
    moistureLevel: req.body.moistureLevel
  });
  
    // Save soil moisture measurement in the database
    soilMoisture.save(soilm, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while saving the measurement."
        });
      else res.send(data);
    });  
};

// Retrieve all soil moisture measurements in the last 48 hours from the database
exports.getAllSoilMoisture = (req, res) => {
  var fromDate = new Date();
  fromDate.setHours(fromDate.getHours() - 48);
  fromDate = dateFormat(fromDate ,"yyyy-mm-dd	HH:MM:ss");

  soilMoisture.getAll(fromDate, (err, data) => {
      if (err)
          res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving measurements."
          });
      else res.send(data);
      });  
};

// Find the latest soil moisture measurements for a given sensor of a device
exports.findSoilMoisture = (req, res) => {
  soilMoisture.findByDeviceAndSensor(req.params.device, req.params.sensor, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found measurments for device ${req.params.device} and sensor ${req.params.sensor}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving measurments for device " + req.params.device + " and sensor " + req.params.sensor
          });
        }
      } else res.send(data);
    });
};
const tempAndHum = require("../models/measurements.model.js");

// Create and Save a new Measurement
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create Measurements
    const tandh = new tempAndHum({
      device: req.body.device,
      dateTime: req.body.dateTime,
      temperature: req.body.temperature,
      humidity: req.body.humidity
    });
  
    // Save measurement in the database
    tempAndHum.create(tandh, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while saving the measurement."
        });
      else res.send(data);
    });
  };

// Retrieve all measurements from the database.
exports.getAll = (req, res) => {
    tempAndHum.getAll((err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving measurements."
            });
        else res.send(data);
        });  
};

// Find the latest measurements for a device
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


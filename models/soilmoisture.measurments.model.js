var dateFormat = require("dateformat");

const sql = require("./db.js");

// constructor
const soilMoisture = function(soilmoisture) {
    this.device = soilmoisture.device;
    this.dateTime = soilmoisture.dateTime;
    this.sensor = soilmoisture.sensor;
    this.voltage = soilmoisture.voltage;
    this.moistureLevel = soilmoisture.moistureLevel;
  };
  
  soilMoisture.save = (newMeasurement, result) => {
    //Convert dateTime to a format MySQL can understand
    newMeasurement.dateTime = dateFormat(newMeasurement.dateTime ,"yyyy-mm-dd	HH:MM:ss");
    sql.query("INSERT INTO SoilMoisture SET ?", newMeasurement, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      //Convert dateTime back to ISO format
      newMeasurement.dateTime =new Date(newMeasurement.dateTime).toISOString();
      console.log("Saved new measurement: ",{ ...newMeasurement } );
      result(null, { ...newMeasurement });
    });
  };
  
  // Get all soil measurements from the database on or after a given date
  soilMoisture.getAll = (fromDate, result) => {
    sql.query(`SELECT device, dateTime, sensor, voltage, moistureLevel FROM SoilMoisture WHERE dateTime>="${fromDate}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Measurements: ", res);
      result(null, res);
    });
  };
  
  soilMoisture.findByDeviceAndSensor = (device, sensor, result) => {
     sql.query(`SELECT device, dateTime, sensor, voltage, moistureLevel FROM SoilMoisture where DateTime=(SELECT max(DateTime) FROM SoilMoisture WHERE device = "${device}" and sensor="${sensor}") and device = "${device}" and sensor="${sensor}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Found measurement: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found any measurements for the device
      result({ kind: "not_found" }, null);
    });
  };
  
module.exports = soilMoisture;
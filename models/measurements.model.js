var dateFormat = require("dateformat");

const sql = require("./db.js");

// constructor
const tempAndHum = function(tempandhum) {
  this.device = tempandhum.device;
  this.dateTime = tempandhum.dateTime;
  this.temperature = tempandhum.temperature;
  this.humidity = tempandhum.humidity;
};

tempAndHum.create = (newMeasurement, result) => {
  //Convert dateTime to a format MySQL can understand
  newMeasurement.dateTime = dateFormat(newMeasurement.dateTime ,"yyyy-mm-dd	HH:MM:ss");
  sql.query("INSERT INTO TempAndHum SET ?", newMeasurement, (err, res) => {
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

tempAndHum.findByDevice = (device, result) => {
  sql.query(`select device, dateTime, temperature, humidity from TempAndHum where DateTime=(SELECT max(DateTime) FROM TempAndHum WHERE device = "${device}") and device = "${device}"`, (err, res) => {
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

tempAndHum.getAll = result => {
  sql.query("SELECT device, dateTime, temperature, humidity FROM TempAndHum", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Measurements: ", res);
    result(null, res);
  });
};


module.exports = tempAndHum;
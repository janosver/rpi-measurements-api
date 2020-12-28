const sql = require("./db.js");

// constructor
const TempAndHum = function(tempandhum) {
  this.device = tempandhum.device;
  this.datetime = tempandhum.datetime;
  this.temperature = tempandhum.temperature;
  this.humidity = tempandhum.humidity;
};

TempAndHum.create = (newMeasurement, result) => {
  sql.query("INSERT INTO TempAndHum SET ?", newMeasurement, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Saved new measurement: ", { id: res.insertId, ...newMeasurement });
    result(null, { id: res.insertId, ...newMeasurement });
  });
};

TempAndHum.findByDevice = (device, result) => {
  sql.query(`select * from TempAndHum where DateTime=(SELECT max(DateTime) FROM TempAndHum WHERE device = "${device}") and device = "${device}"`, (err, res) => {
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

TempAndHum.getAll = result => {
  sql.query("SELECT * FROM TempAndHum", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Measurements: ", res);
    result(null, res);
  });
};


module.exports = TempAndHum;
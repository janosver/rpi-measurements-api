# rpi-measurements-api
API to store and retreive measurements made with a Raspberry Pi and stored in a MySQL database

## Configuration

### Database
Create a new database using the following SQL script
```
CREATE TABLE `TempAndHum` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Device` varchar(50) NOT NULL COMMENT 'Name of the device which took the measurement',
  `DateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'Time of measurement (sent by the device)',
  `Temperature` float NOT NULL COMMENT 'Temperature in Celsius',
  `Humidity` float NOT NULL COMMENT 'Humidity in percentage'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### Database connection
Create a directory called `config` and within that a file called `db.config.js` and add the following 
```
module.exports = {
    HOST: "<hostname where the database is located>",
    USER: "<database username>",
    PASSWORD: "<password of the above database user>",
    DB: "<database name>"
  };
```

## Running the API
```
node server.js
```
# rpi-measurements-api
API to store and retreive measurements made with a Raspberry Pi and stored in a MySQL database

## Configuration

### Essential configuration
Create a directory called `config` and within that a file called `config.json` and add the following
```
{
    "apiHost" : "<URL where the API will be running>",
    "apiPort": "<port number>"
    "dbHost" : "<hostname where the database is located>",
    "dbUser" : "<database username>",
    "dbPassword" : "<password of the above database user>",
    "dbName" : "<database name>"
}
```
Example `config.json` file
```
{
    "apiUrl" : "http://raspberrypi",
    "apiPort" : "8000",
    "dbHost" : "localhost",
    "dbUser" : "raspberrydbuser",
    "dbPassword" : "a-randomly-generated-password-like_ZV_erZSu+CE;'35z",
    "dbName" : "rpi-measurements"
}
```

### Database
Create a new table using the following SQL script
```
CREATE TABLE `TempAndHum` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Device` varchar(50) NOT NULL COMMENT 'Name of the device which took the measurement',
  `DateTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'Time of measurement (sent by the device)',
  `Temperature` float NOT NULL COMMENT 'Temperature in Celsius',
  `Humidity` float NOT NULL COMMENT 'Humidity in percentage'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## Endpoints

A swagger documentation is available at the `/swagger` url (e.g. at http://raspberrypi:8000/swagger/) once the api is up and running. 

### Send measurements to the API which then saves these in the MySQL database table
URL: /tempandhum

Method: `POST`

Data
```
{
    "device": "<Name of the device which took the measurement>",
    "dateTime": "<Time of measurement in ISO format>",
    "temperature": <Temperature value in Celsius>,
    "humidity": <Humidity value in percentage>
}
```

Data example
```
{
    "device": "raspberrypizero",
    "dateTime": "2020-12-28T17:06:17Z",
    "temperature": 19.1,
    "humidity": 56.4
}
```

### Get **all** measurements
URL: /tempandhum

Method: `GET`

Response
```
[{
    "device": "<Name of the device which took the measurement>",
    "dateTime": "<Time of measurement in ISO format>",
    "temperature": <Temperature value in Celsius>,
    "humidity": <Humidity value in percentage>
}]
```

Response example
```
[
  {
    "device": "raspberrypizero",
    "dateTime": "2020-12-28T17:06:17Z",
    "temperature": 21.1,
    "humidity": 56.4
  },
  {
    "device": "raspberrypizero",
    "dateTime": "2020-12-28T18:06:17Z",
    "temperature": 21.5,
    "humidity": 55.8
  }
]
```

### Get the **latest** measurement for a given **device**
URL: /tempandhum

Method: `GET`

Required URL parameter: `device=[string]`


Response
```
{
    "device": "<Name of the device which took the measurement>",
    "dateTime": "<Time of measurement in ISO format>",
    "temperature": <Temperature value in Celsius>,
    "humidity": <Humidity value in percentage>
}
```

Data example
```
{
  "device": "raspberrypizero",
  "dateTime": "2020-12-29T17:06:17Z",
  "temperature": 20.1,
  "humidity": 47.4
}
```

## Running the API
```
node server.js
```
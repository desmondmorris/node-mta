# MTA for Node.js

[![NPM](https://nodei.co/npm/mta.png)](https://nodei.co/npm/mta/)
[![wercker status](https://app.wercker.com/status/82e56f8c44fe588b2ba40df44801a832 "wercker status")](https://app.wercker.com/project/bykey/82e56f8c44fe588b2ba40df44801a832)

A library that retrieves New York MTA data


## Installation
npm install mta


## Usage

```JavaScript
var mta = require('mta')();

// Get status for all services
mta.status(function(err, status){
  if (err) throw err;

  console.log(status);
});


// Get status for the subway system
mta.status('subway', function(err, status){
  if (err) throw err;

  console.log(status);
});
```

## Changelog
* **0.0.1**: Initial version

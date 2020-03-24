# Vanlo Shippo Compatible API Node.js SDK

Vanlo offers a Shippo Compatible API for customers switching from Shippo to Vanlo.

## Installation:
You can install this package by running the follwing command:
```shell
  npm install git+https://github.com/VanloCorp/shippo-node-client
```

## Usage:

Initialize your `shippo` instance using your `Vanlo API Key` provided to you on the `Developers > API Keys` page in the Vanlo Dashboard.

```js
    var shippo = require('shippo')('VANLO_API_KEY');
```
The snippet below demonstrates how to create an address object. Check examples.js for more detailed example for generating a shipping label:

```js
    var shippo = require('shippo')('VANLO_API_KEY');

    shippo.address.create({
          'name' : 'Mr Hippo',
          'company' : 'SF Zoo',
          'street1' : '2945 Sloat Blvd',
          'city' : 'San Francisco',
          'state' : 'CA',
          'zip' : '94132',
          'country' : 'US',
          'phone' : '+1 555 341 9393',
          'email' : 'mrhippo@goshippo.com'
    }).then(function(address){
      console.log("shipment : %s", JSON.stringify(address));
    });
```

### International Multipiece Shipment Example

This example demonstrates how to purchase a label for an international shipment.
Creating domestic shipment would follow a similiar proccess but would not require
the creation of CustomsItems and CustomsDeclaration objects.

```js

var shippo = require('shippo')('VANLO_API_KEY');

var addressFrom  = {
	"name":"Ms Hippo",
	"company":"Vanlo",
	"street1":"345 California St.",
	"city":"San Francisco",
	"state":"CA",
	"zip":"94104",
	"country":"US", //iso2 country code
	"phone":"1 555 341 9393",
	"email":"ms-hippo@goshippo.com",
}

var addressTo = {
	"name":"Mr Hippo",
	"street1":"803 Clayton St.",
	"city":"San Francisco",
	"state":"CA",
	"zip":"94117",
	"country":"US", //iso2 country code
	"phone":"1 555 341 9394"
};

// VANLO COMPATIBILITY NOTE: Vanlo only supports inches and ounces and the
// 'distance_unit' and 'mass_unit' params will be ignored.

var parcel = {
	"length":"6",
	"width":"5",
	"height":"4",
	"distance_unit":"in",
	"weight":"18",
	"mass_unit":"oz"
}

shippo.shipment.create({
	"address_from": addressFrom,
	"address_to": addressTo,
	"parcels": [parcel]
}).then(function(shipment) {
		console.log("Select a rate and buy a shipping label:");
		console.log(shipment.rates[0]);

		shippo.transaction.create({
			"rate": shipment.rates[0].object_id,
			"label_file_type": "PNG",
		}).then(function(transaction) {
			console.log("Successfully purchased shipping label:");
			console.log(transaction);

		}, function(err) {
			console.log("There was an error buying shipment:");
			console.log(err);
		});
    
}, function(err) {
    console.log("There was an error creating shipment:");
		console.log(err);
});
```

## Tests:

### Requirements:
For the test cases the following packages are required:
```js
  npm install mocha
  npm install chai
  npm install mocha-as-promised
  npm install chai-as-promised
```

## Credits

This project is a fork of Shippo's official Node.js SDK [Node.js SDK](https://github.com/goshippo/shippo-node-client).

## Documentation

Please see [https://shippo-compatible-api-docs.vanlo.com/](https://shippo-compatible-api-docs.vanlo.com/) for documentation.


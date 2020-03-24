/**
This example demonstrates how to purchase a label for a domestic shipment.
**/

// replace VANLO_API_KEY with your Vanlo API Key
var shippo = require('shippo')('VANLO_API_KEY');
shippo.setHost('beta.vanlo.com', 443, 'https');

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


var shippo = require('shippo')('VANLO_API_KEY');
shippo.setHost('beta.vanlo.com', 443, 'https');

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

	console.log("address : %s", JSON.stringify(address));

	shippo.address.validate(address.object_id).then(function(validated_address){
		console.log("validated address : %s", JSON.stringify(validated_address));

	}, function(err) {
    console.log("There was an error validating address:");
		console.log(err);
	});

}, function(err) {
    console.log("There was an error creating address:");
    console.log(err);
});


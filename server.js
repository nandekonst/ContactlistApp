var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');
var request = require('request');
var token;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//get access token
var data = {key: '62bb1d3b8dc043de174b14aec2b89f90', secret: 'd488864ac9ab63ca6fc6a7128292386465a5a3d04436c73f'};
var options = {
	url: 'http://82e90450-9a6d-11e5-bfa1-3b5373a1e28c.app.jexia.com',
	json: true,
	body: data
};
request.post(options, function(err, response, body) {
	console.log("body " + JSON.stringify(body));
	token = body.token;
	console.log("dit is de token" + token);
	
	
	//Get records
	var options = {
		url: 'http://82e90450-9a6d-11e5-bfa1-3b5373a1e28c.app.jexia.com/contacts',
		headers: {
		'Authorization': 'Bearer ' + token
	}
	};
	request.get(options, function(err, response, body) {
	console.log("requested data" + body);
	});

	
	//Insert new records
	var token = token;
	var options = {
		url: 'http://82e90450-9a6d-11e5-bfa1-3b5373a1e28c.app.jexia.com/contacts',
		json: true,
		body: data,
		headers: {
			'Authorization': 'Bearer ' + token
		}
	};
		request.post(options, function(err, response, body) {
			console.log(body);
	});
	
	//Delete Record
	app.delete('/contactlist/:id', function(req,res){

	var id = req.params.id;
	var options = {
	   "url":"http://82e90450-9a6d-11e5-bfa1-3b5373a1e28c.app.jexia.com/contacts" + id,
	   "headers":{
			"Authorization": "Bearer " + token 
		}

	};

	request.del(options, function(err, response, body){
		res.json(body);
		console.log("DELETING" + body);
	});	
	
	
		
		
	});
	
	
	
	
	
	
	
	
	
	
});


app.listen(3000);
console.log("Server running on port 3000");
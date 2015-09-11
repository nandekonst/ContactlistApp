var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');
var request = require('request');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function(req, res){
	console.log("I received a GET request")
	request('http://71183da0-4fe4-11e5-92dd-05d823229c00.test.jexia.com/contacts?jexia_token=fdb945bff12ae3770fcd4be7c3a90089', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.send(body) 
		}
	});
	
	/*db.contactlist.find(function(err,docs){
	console.log(docs);
	res.json(docs);
	
	})*/
	
	

})
app.post('/contactlist', function (req,res){
	request.post(
	"http://71183da0-4fe4-11e5-92dd-05d823229c00.test.jexia.com/contacts?jexia_token=fdb945bff12ae3770fcd4be7c3a90089" ,
	{form: req.body},
	function(err, httpResponse,body){
		console.log(err);
		//console.log(body);
		res.json(body);

	
	});

	
	/*db.contactlist.insert(req.body, function(err,doc){
		res.json(doc);
	})*/
})
app.delete('/contactlist/:id', function(req,res){
//console.log(JSON.stringify(req.params));
console.log('received delete '+ req.params.id );
request.del(
	"http://71183da0-4fe4-11e5-92dd-05d823229c00.test.jexia.com/contacts?jexia_token=fdb945bff12ae3770fcd4be7c3a90089" ,
	{form: {id:req.params.id}},
	function(err, httpResponse,body){
		console.log(err);
		//console.log(body);
		res.json(body);

	
	});	
	//var id = req.params.id;
	//console.log(id);
	//db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		//res.json(doc);
	//})
});
app.get('/contactlist/:id', function(req,res){
	request(
	'http://71183da0-4fe4-11e5-92dd-05d823229c00.test.jexia.com/contacts/'+req.params.id+'?jexia_token=fdb945bff12ae3770fcd4be7c3a90089', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.send(body) 
		}
	});
	
		/***
	var id= req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
	***/
});

app.put('/contactlist/:id', function(req,res){
	var id = req.params.id;
	console.log("PUTTING " + id);
	
	request.put(
	'http://71183da0-4fe4-11e5-92dd-05d823229c00.test.jexia.com/contacts/'+id+'?jexia_token=fdb945bff12ae3770fcd4be7c3a90089' ,
	{form: req.body},
	function(err, httpResponse,body){
		console.log(err);
		//console.log(body);
		res.json(body);
	});

	
	/***
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function(err,doc) {
			res.json(doc);
		});
		
	***/
});

app.listen(3000);
console.log("Server running on port 3000");
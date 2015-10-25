var express = require('express');
var app = express();
var fs = require("fs"); 

var usersRepository = {
	getAll: function (cbk) {
		fs.readFile( __dirname + "/" + "db/users.json", 'utf8', function (err, data) {
			cbk(data, err);
		});
	},
	getById: function(cbk, id) {
		fs.readFile( __dirname + "/" + "db/users.json", 'utf8', function (err, data) {
			data = JSON.parse(data);
			var user = data["user" + id];
			cbk(JSON.stringify(user), err);
		});
	}
};

app.get('/users', function (req, res) {
	usersRepository.getAll(function (data, err) {
		res.end(data);
	});
})

app.get('/users/:id', function (req, res) {
	usersRepository.getById(function (data, err) {
		res.end(data);
	}, req.params.id);
})

app.get('/users/a', function (req, res) {
	res.send('hello from a!');
})

var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("start listening at http://%s:%s", host, port)
})
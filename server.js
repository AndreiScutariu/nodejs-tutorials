var express     =   require("express");
var bodyParser  =   require("body-parser");
var fs			= 	require("fs"); 
var app         =   express();

//Repository
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

//Rest services
var userRestService = {
	list: function (req, res) { 
		usersRepository.getAll(function (data, err) {
			res.end(data);
		});
	},
	get: function (req, res) { 
		usersRepository.getById(function (data, err) {
			res.end(data);
		}, req.params.id);
	},
	post: function (req, res) { 
		var post_data = req.body;
		console.log(post_data);
  		res.end(post_data);
	},
	put: function (req, res) { 
		res.send('put'); 
	},
	delete: function (req, res) { 
		res.send('delete'); 
	}
};

//Route configuration
app.get('/users', userRestService.list);
app.get('/users/:id', userRestService.get);
app.post('/users', userRestService.post);
app.put('/users', userRestService.put);
app.delete('/users', userRestService.delete);

//Aplication config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Application start
var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("start listening at http://%s:%s", host, port)
})
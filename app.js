// app.js

// set up express
var express = require('express');
var port = 3000;
var app = express();

// set up static paths
var path = require('path');
var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// set up handlebars
var handlebars = require('express-handlebars').create({'defaultLayout':'main'});
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars');

// set up body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// LOGGING for TROUBLESHOOTING
app.use(function(req, res, next) {
	console.log(req.method + " " + req.path);
	console.log(res.statusCode);
	next();
});

// ---------------------------------------------- //
var birds = [{'name': 'Bald Eagle', 'sightings': 3},
			{'name': 'Yellow Billed Duck', 'sightings': 7},
			{'name': 'Great Cormorant', 'sightings': 4}];

// routing
app.get('/', function(req, res){
	res.render('index');
});
app.get('/birds', function(req, res){
	res.render('birds', birds);
});
app.post('/birds', function(req, res) {
	var found = false;
	birdname = req.body.birdname;
	console.log("POSTED: " + birdname);
	for (var i = 0; i < birds.length; i++) {
		if (birds[i].name === birdname) {
			birds[i].sightings += 1;
			found = true;
			break;
		}
	}
	if (!found) {
		birds.push({'name': birdname, 'sightings': 1});
	}
	res.redirect('/birds');
});



app.listen(port);
console.log('Started server on port ' + port + ', CTRL + C to exit');








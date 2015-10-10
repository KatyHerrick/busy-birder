// app.js

var express = require('express');
var port = 3000;
var app = express();

var path = require('path');
var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));


app.listen(port);
console.log('Started server on port ' + port + ', CTRL + C to exit');
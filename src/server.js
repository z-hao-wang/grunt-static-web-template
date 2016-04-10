var express = require('express'),
	app = express(),
	path = require("path");

var PORT = 9000;

// Serve all static files in '/'
app.use(express.static(path.join(__dirname, '../')));

app.listen(PORT, function () {
	console.log('Example app listening on port ' + PORT + '!');
});
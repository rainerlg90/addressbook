//addressBook.js
var express = require("express"),
			  path = require('path');
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.configure(function () {    
    app.use(express.static(path.join(__dirname, 'www')));
});

app.get('/', function(req, res) {
  res.send('Hello World!');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
var express = require('express'),
			  http = require( 'http' ),
			  path = require('path'),
			  logfmt = require('logfmt'),
			  database = require('./routes/database'),
			  app = express();

var port = Number(process.env.PORT || 5000);			  
			  
//environments			  
app.use(logfmt.requestLogger());
app.configure(function () {    
    app.use(express.static(path.join(__dirname, 'www')));
	app.use(express.logger('dev'));
	app.use( express.bodyParser());
	app.use(express.methodOverride());//?
	app.use( app.router );	
});


//routes
app.get( '/allContacts', 	database.allContacts); //show allContacts
app.post( '/addContact',      database.addContact);
app.delete( '/deleteContact/:id', database.deleteContact);
//app.get(  '/editContact/:id',    database.edit );


app.listen(port, function() {
  console.log("Listening on " + port);
});




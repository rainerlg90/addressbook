var mongo = require('mongodb');
var mongoose = require('mongoose');

var MONGOLAB_URI = 'mongodb://heroku_app23916129:database5@ds047057.mongolab.com:47057/heroku_app23916129/?uri.ssl=true';
  
//connecting to mongolab database
mongoose.connect(MONGOLAB_URI, function (err, res) {
  if (err) { 
    console.log ('***ERROR connecting to: ' + MONGOLAB_URI + '. ' + err);
  } else {
    console.log ('***Succeeded connected to: ' + MONGOLAB_URI);
  }
});


var contacts = [];

//schema of contacts
var contactSchema = new mongoose.Schema({
  name:String,
  address:String,
  phone:String
});
//compile schema into a model within the 'Contacts' collection
var contactModel = mongoose.model('Contacts', contactSchema);

//test: creating sample user and saving it to the database.  
// var contactInfo = {
  // name: 'Fname Lname',
  // address: 'address',
  // phone: '987 654 321'
// };
// var sampleContact = new contactModel(contactInfo);
// sampleContact.save(function (err) {if (err) console.log ('***Error on save!'+ sampleContact)});

var db = mongoose.connection;

//json list of all contacts
exports.allContacts = function(req, res) {
	console.log("***here in allcontacts..");
	contacts = [];
	var all_contacts;
	contactModel.find().
		exec(function(err, results){
			if (err){
				 res.status(500).json({status: 'failure'});
			}else{
				all_contacts = results;
				for (var contact in all_contacts){
					//console.log('***pushing' + all_contacts[contact]);
					contacts.push(all_contacts[contact]);
				}
				res.json(contacts);
			}
		});
};

//adding a new contact
exports.addContact = function ( req, res, next ){
	console.log("***Contact Info:" + req);
	new contactModel({
	  name:		req.param('name'),
	  address:  req.param('address'),
	  phone:    req.param('phone')
	}).save( function ( err, contact, count ){
	if( err ) return next( err );
	res.redirect( '/' );
	});
};

//deleting a contact
exports.deleteContact = function(req, res){
	console.log("***from db deleting:" + req.param('id'));
	var id = req.param('id');
	
	//well idk why the deletion its not wrking!!!!!
	//delete from mongolab
	contactModel.remove({'_id':id});
	//contactModel.remove({});
	//contactModel.remove();
	//contactModel.remove([{}]);
	//db.contacts.remove({});
	console.log("***contact w id: "+ id +" deleted...");
		
};














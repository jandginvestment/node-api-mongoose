// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var user = require('./DAL/user.dal');
var jwt = require('jsonwebtoken');
var config = require('./config');
var mongoose = require('mongoose');


//modules
var userRoutes = require('./routes');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('superSecret', config.secret); 

var port = process.env.PORT || 8040;        // set our port

mongoose.connect(config.database, {useMongoClient: true});


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) =>{
    res.json({ message: 'hooray! welcome to our api!' });   
});



// more routes for our API will happen here





// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', userRoutes);
//app.use('/api/user', userRoutes);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

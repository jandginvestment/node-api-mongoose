const routes = require('express').Router();
var express    = require('express');        // call express
var app        = express();  
var jwt = require('jsonwebtoken');
var config = require('../config');
var user = require('../Model/user');
app.set('superSecret', config.secret); 
var userRouter = require('./user-routes');



routes.post('/authenticate', (req, res)=> {

 const tes = new user ('tees','test');
var token = jwt.sign(tes, app.get('superSecret'), {
          expiresIn : 60*60*24 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });

});
//routes.use('/user',userRouter);

// route middleware to verify a token
routes.use((req, res, next)=> {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), (err, decoded)=> {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.'  
    });

  }
});

routes.get('/', (req, res) => {
  res.json({ message: 'Welcome to the coolest API on earth!' });

});

routes.use('/user',userRouter);

module.exports = routes;

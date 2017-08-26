'use strict';
var express    = require('express'); 
var app        = express(); 
var user = require('../DAL/user.dal');
var bodyParser = require('body-parser');

var routes = express.Router();   
app.use('/', express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // support json encoded bodies


routes.get('/', (req, res) => {
  res.json({ message: 'Welcome to the coolest user' });

});

routes.get('/getAll',(req,res)=>{
 
 new user().getAll((error,result)=>{
   if(error) {res.json({error:error});
   console.log('error') ;
   return;
  } // error should be logged before throwing
   res.json({data:result});
 })
});

routes.post('/Add',(req,res)=>{
    console.log(req.body.colorName);
  new user().add(req.body,(error,result)=>{
    if(error) {
      res.json({error:error});
      return;
    };
    res.json({data:result});
  })
})

module.exports = routes;

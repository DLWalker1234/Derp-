var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
// var Trump = mongoose.model('Trump');

//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
  
  
    //Get requests
    if(req.method === "GET"){
      return next();
    }
    if (req.isAuthenticated()){
      return next();
    }
  
    //return to the login page
    return res.redirect('/#login');
  };

router.get('*', function (req, res) {
	res.sendfile('./public/trump');
});

module.exports = router;
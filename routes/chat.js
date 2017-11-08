var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Chat = mongoose.model('Chat');

// // development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

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

//authentication middleware
// router.use('/posts', isAuthenticated);


router.post('/message', function (req, res) {

	var message = new Message ({
		username: req.body.username,
    	message : req.body.message
    });

    message.save(function (err, saved) {
    	if (err) {
    		res.send(400);
    		return console.log('error saving to db');
    	}
    	res.send(saved);
    	io.sockets.emit('receiveMessage', saved);
    })
});

router.get('/message', function (req, res) {
	Message.find(function (err, allMessages) {
  	if (err) {
  		return res.send(err);
  	};
  	res.send(allMessages);
  })
});

// app.get('*', function (req, res) {
// 	res.sendfile('./public/chat.html');
// });

module.exports = router;
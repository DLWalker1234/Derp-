var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Post = mongoose.model('Post');

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
router.use('/posts', isAuthenticated);

router.route('/posts')
	//Post request
	.post(function(req, res){

		var post = new Post();
		post.derp = req.body.derp;
		post.derp_by = req.body.derp_by;
		post.save(function(err, post) {
			if (err){
				return res.send(500, err);
			}
			return res.json(post);
		});
	})
	//gets for all posts
	.get(function(req, res){
		console.log('Beuller');
		Post.find(function(err, posts){
			console.log('Beuller');
			if(err){
				return res.send(500, err);
			}
			return res.send(200,posts);
		});
	});

//not working currently
router.route('/posts/:id')
	//gets specified post
	.get(function(req, res){
		Post.findById(req.params.id, function(err, post){
			if(err)
				res.send(err);
			res.json(post);
		});
	}) 
	//updates specified post
	.put(function(req, res){
		Post.findById(req.params.id, function(err, post){
			if(err)
				res.send(err);

			post.derp_by = req.body.derp_by;
			post.derp = req.body.derp;

			post.save(function(err, post){
				if(err)
					res.send(err);

				res.json(post);
			});
		});
	})
	//deletes the post
	.delete(function(req, res) {
		console.log(req.params.id);
		Post.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
				res.send(err);
			res.json("something was deleted");
		});
	});

module.exports = router;
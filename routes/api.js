var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
  
  if(req.method === "GET"){

    return next();
  }

  if(!req.isAuthenticated()){
    res.redirect('#/login');
  }

  return next();
})

router.route('/posts')

    .get(function(req, res){

      //temp
      res.send({message: 'RETURN all posts'})
    })

    .post(function(req, res){

      res.send({message: 'crease a post dude.'})
    });

router.route('/posts/:id')

    //return one post
    .get(function(req, res){
      
      res.send({message: 'return a post' + req.params.id})
    })

    .put(function(req, res){

      res.send({message: 'need to do' + req.params.id})
    });

    .delete(function(req, res){

      res.send({message: 'NEED TO DELETE' + req.params.id})
    })

module.exports = router;
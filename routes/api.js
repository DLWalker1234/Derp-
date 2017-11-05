var express = require('express');
var router = express.Router();

router.route('/posts')

    .get(function(req, res){

      //temp
      res.send({message: 'RETURN all posts'})
    })

    .post(function(req, res){

      res.send({message: 'crease a post dude.'})
    });

module.exports = router;
var express = require('express');
var router = express.Router();

//Send to the main index page
router.get('/', function(req, res, next) {
	res.render('index', { title: "Derp"});
});

module.exports = router;
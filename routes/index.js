var express = require('express');
var router = express.Router();


// This is not working!! Get help.
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'KingTUT' });
});

module.exports = router;

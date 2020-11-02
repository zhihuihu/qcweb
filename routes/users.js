var express = require('express');
var router = express.Router();
var qcweb = require('../qcweb');
const userModel = require('../models/user');

const userInst = qcweb.getInst(userModel);

router.get('/list', function(req, res, next) {
  var { search} = req.query;
  var list = userInst.list(search);
  res.send(qcweb.common.responseMessage(list));
});

module.exports = router;

var express = require('express');
var router = express.Router();
var qcweb = require('../qcweb');
var projectModel = require('../models/project')

var projectInst = qcweb.getInst(projectModel);

router.get('/list', function(req, res, next) {
  var { search } = req.query;
  var list = projectInst.list(search);
  res.send(qcweb.common.responseMessage(list));
});

router.get('getById',function (req, res, next) {
  var { id } = req.query;
  if(qcweb.common.isEmpty(id)){
    res.send(qcweb.common.responseMessage(null,1,"ID为空"))
  }
  var data = projectInst.getById(id);
  res.send(qcweb.common.responseMessage(data));
});

module.exports = router;

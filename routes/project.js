var express = require('express');
var router = express.Router();
var qcweb = require('../qcweb');
var projectModel = require('../models/project')

var projectInst = qcweb.getInst(projectModel);

async function list(req,res){
  var { pageNum,pageSize,search} = req.query;
  var count = await projectInst.listCount(search);
  if(count <= 0){
    res.send(qcweb.common.responseMessage({count:0}));
    return;
  }
  var list = await projectInst.list(search,pageNum,pageSize);
  res.send(qcweb.common.responseMessage({list: list,count:count}));
}

router.get('/list', function(req, res, next) {
  list(req,res)
    .then(function(data){

    })
    .catch(function(err){
      res.send(qcweb.common.responseMessage(null,400,err.message));
    })
});

async function getById(req,res){
  var { id } = req.query;
  if(qcweb.common.isEmpty(id)){
    res.send(qcweb.common.responseMessage(null,1,"ID为空"))
  }
  var data = await projectInst.getById(id);
}

router.get('getById',function (req, res, next) {
  getById(req,res)
    .then(function(data){

    })
    .catch(function(err){
      res.send(qcweb.common.responseMessage(null,400,err.message));
    })
});

async function add(req,res){
  var { name, describe, folder, workspace,checkDir } = req.body;
  if(qcweb.common.isEmpty(name)){
    res.send(qcweb.common.responseMessage(null,1,"名称为空"));
    return;
  }
  if(qcweb.common.isEmpty(describe)){
    res.send(qcweb.common.responseMessage(null,1,"描述为空"));
    return;
  }
  if(qcweb.common.isEmpty(folder)){
    res.send(qcweb.common.responseMessage(null,1,"项目文件夹为空"));
    return;
  }
  if(qcweb.common.isEmpty(workspace)){
    res.send(qcweb.common.responseMessage(null,1,"根目录为空"));
    return;
  }
  if(qcweb.common.isEmpty(checkDir)){
    res.send(qcweb.common.responseMessage(null,1,"检查文件夹为空"));
    return;
  }
  var checkName = await projectInst.getByName(name);
  if(null != checkName){
    res.send(qcweb.common.responseMessage(null,1,"项目名已存在"));
    return;
  }

  let project = {
    id: qcweb.idWorker.generate(),
    name: name,
    describe: describe,
    folder: folder,
    workspace: workspace,
    checkDir: checkDir,
  }
  projectInst.add(project)
    .then(function(data){
      res.send(data);
    })
    .catch(function(e){
      res.send(e);
    })
}
router.post('/add', function(req, res, next) {
  add(req,res)
    .then(function(data){

    })
    .catch(function(err){
      res.send(qcweb.common.responseMessage(null,400,err.message));
    })
});

module.exports = router;

var fs = require('fs');
var express = require('express');
var router = express.Router();
var multer  = require('multer')
var qcweb = require('../qcweb');
var historyModel = require('../models/history');
var config = require('.././config.json');
var projectModel = require('../models/project');
const compressing = require('compressing');

var upload = multer({  })
var historyInst = qcweb.getInst(historyModel);
var projectInst = qcweb.getInst(projectModel);

async function list(req,res){
  var { pageNum,pageSize,projectId } = req.param;
  var count = await historyInst.listCount(projectId);
  if(count <= 0){
    res.send(qcweb.common.responseMessage({count:0}));
    return;
  }
  var list = await historyInst.list(projectId,pageNum,pageSize);
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

async function newVersion(req, res){
  var { projectId } = req.body;
  if(qcweb.common.isEmpty(projectId)){
    res.send(qcweb.common.responseMessage(null,1,"项目ID为空"));
    return;
  }
  var project = await projectInst.getById(projectId);
  if(!project){
    res.send(qcweb.common.responseMessage(null,1,"项目不存在"));
    return;
  }
  var file = req.files[0];
  if(req.files == null || req.files.length <=0){
    res.send(qcweb.common.responseMessage(null,1,"请选择文件"));
    return;
  }
  if(!file.originalname.endsWith(".tar.gz")){
    res.send(qcweb.common.responseMessage(null,1,"请上传后缀名未.tar.gz的文件"));
    return;
  }
  var desFile = config.deploy.hisWorkspace + project.folder + "-" + qcweb.idWorker.generate()+".tar.gz";
  if(!fs.existsSync(config.deploy.hisWorkspace)){
    fs.mkdirSync(config.deploy.hisWorkspace);
  }
  fs.writeFileSync(desFile,file.buffer);
  // 解压文件并替换文件
  await compressing.tgz.uncompress(desFile, project.workspace,{zipFileNameEncoding :"utf8"});
  res.send(qcweb.common.responseMessage("更新成功"));
}
router.post('/newVersion', upload.any(), function(req,res,next){
  newVersion(req,res)
    .catch(function(err){
      res.send(qcweb.common.responseMessage(null,400,err.message));
    })
});

module.exports = router;

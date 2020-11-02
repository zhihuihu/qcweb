var fs = require('fs');
var express = require('express');
var router = express.Router();
var multer  = require('multer')
var qcweb = require('../qcweb');
var historyModel = require('../models/history');
var config = require('.././config.json');
var projectModel = require('../models/project');
const compressing = require('compressing');
const basicAuth = require('basic-auth');
const userModel = require('../models/user');

var upload = multer({  })
var historyInst = qcweb.getInst(historyModel);
var projectInst = qcweb.getInst(projectModel);
var userInst = qcweb.getInst(userModel);

async function list(req,res){
  var { pageNum,pageSize,projectId } = req.param;
  pageNum = pageNum ? pageNum : 1;
  pageSize = pageSize ? pageSize : 10;
  if(qcweb.common.isEmpty(projectId)){
    res.send(qcweb.common.responseMessage(null,1,"项目ID为空"));
    return;
  }
  var count = await historyInst.listCount(projectId);
  if(count <= 0){
    res.send(qcweb.common.responseMessage({count:0}));
    return;
  }
  var list = await historyInst.list(projectId,pageNum,pageSize);
  res.send(qcweb.common.responseMessage({list: list,count:count}));
}
router.get('/list', function(req, res, next) {
  const credentials = basicAuth(req);
  if(!credentials){
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate','Basic realm="example');
    res.send('error auth');
    return;
  }
  list(req,res)
    .then(function(data){

    })
    .catch(function(err){
      res.send(qcweb.common.responseMessage(null,400,err.message));
    })
});

async function newVersion(req, res){
  /*const credentials = basicAuth(req);
  if(!credentials){
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate','Basic realm="example');
    res.send('go away');
    return;
  }
  var { projectId, userId } = credentials;*/
  var { projectId, userId, describe } = req.body;
  if(qcweb.common.isEmpty(projectId)){
    res.send(qcweb.common.responseMessage(null,1,"项目ID为空"));
    return;
  }
  var project = projectInst.getById(projectId);
  if(!project){
    res.send(qcweb.common.responseMessage(null,1,"项目不存在"));
    return;
  }
  var user = userInst.getById(userId);
  if(!user){
    res.send(qcweb.common.responseMessage(null,1,"用户不存在"));
    return;
  }
  var file = req.files[0];
  if(req.files == null || req.files.length <=0){
    res.send(qcweb.common.responseMessage(null,1,"请选择文件"));
    return;
  }
  if(!file.originalname.endsWith(".zip")){
    res.send(qcweb.common.responseMessage(null,1,"请上传后缀名为.zip的文件"));
    return;
  }
  var desFile = config.deploy.hisWorkspace + project.folder + "-" + qcweb.idWorker.generate()+".zip";
  if(!fs.existsSync(config.deploy.hisWorkspace)){
    fs.mkdirSync(config.deploy.hisWorkspace);
  }
  fs.writeFileSync(desFile,file.buffer);
  // 解压文件并替换文件
  var tempFolder = project.folder + "-" + qcweb.idWorker.generate();
  let tempWorkspace = config.deploy.hisWorkspace + tempFolder;
  fs.mkdirSync(tempWorkspace);
  await compressing.zip.uncompress(desFile, tempWorkspace,{zipFileNameEncoding :"utf8"});
  if(!fs.existsSync(tempWorkspace + '/' + project.checkDir)){
    qcweb.common.deleteFolder(tempWorkspace);
    res.send(qcweb.common.responseMessage(null,1,'文件校验失败'));
    return;
  }
  let projectWorkspace = project.workspace + project.folder;
  qcweb.common.deleteFolder(projectWorkspace + '/' + project.checkDir);
  qcweb.common.copyFolder(tempWorkspace,projectWorkspace);
  qcweb.common.deleteFolder(tempWorkspace);
  var history = {
    "id": qcweb.idWorker.uuid(),
    "projectId": projectId,
    "projectName": project.name,
    "fileUrl": desFile,
    "result": 10,
    "operatorId": userId,
    "operator": user.name,
    "describe": describe,
  }
  await historyInst.add(history);
  res.send(qcweb.common.responseMessage("更新成功"));
}
router.post('/new', upload.any(), function(req,res,next){
  newVersion(req,res)
    .catch(function(err){
      res.send(qcweb.common.responseMessage(null,400,err.message));
    })
});

async function rollback(req,res){
  var { projectId, userId, historyId } = req.body;
  if(qcweb.common.isEmpty(projectId) || qcweb.common.isEmpty(userId) || qcweb.common.isEmpty(historyId)){
    res.send(qcweb.common.responseMessage(null,1,"参数有误"));
    return;
  }
  var project = projectInst.getById(projectId);
  if(!project){
    res.send(qcweb.common.responseMessage(null,1,"项目不存在"));
    return;
  }
  var user = userInst.getById(userId);
  if(!user){
    res.send(qcweb.common.responseMessage(null,1,"用户不存在"));
    return;
  }
  var history = await historyInst.getById(historyId);
  if(!history || history.result !== 10){
    res.send(qcweb.common.responseMessage(null,1,"回滚历史版本号有误"));
    return;
  }
  // 解压文件并替换文件
  var tempFolder = project.folder + "-" + qcweb.idWorker.generate();
  let tempWorkspace = config.deploy.hisWorkspace + tempFolder;
  fs.mkdirSync(tempWorkspace);
  await compressing.zip.uncompress(history.fileUrl, tempWorkspace,{zipFileNameEncoding :"utf8"});
  if(!fs.existsSync(tempWorkspace + '/' + project.checkDir)){
    qcweb.common.deleteFolder(tempWorkspace);
    res.send(qcweb.common.responseMessage(null,1,'文件校验失败'));
    return;
  }
  let projectWorkspace = project.workspace + project.folder;
  qcweb.common.deleteFolder(projectWorkspace + '/' + project.checkDir);
  qcweb.common.copyFolder(tempWorkspace,projectWorkspace);
  qcweb.common.deleteFolder(tempWorkspace);
  history.id = qcweb.idWorker.uuid();
  history.operatorId = userId;
  history.operator = user.name;
  history.describe = "版本回滚-->" + history.describe;
  await historyInst.add(history);
  res.send(qcweb.common.responseMessage("更新成功"));
}
router.post('/rollback', function(req,res,next){
  rollback(req,res)
    .catch(function(err){
      res.send(qcweb.common.responseMessage(null,400,err.message));
    })
});

module.exports = router;

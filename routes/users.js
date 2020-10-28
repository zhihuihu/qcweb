var express = require('express');
var router = express.Router();
var qcweb = require('../qcweb');
const userModel = require('../models/user');

const userInst = qcweb.getInst(userModel);

async function list(req,res){
	var { pageNum,pageSize,search} = req.query;
	var count = await userInst.listCount(search);
	if(count <= 0){
		res.send(qcweb.common.responseMessage({count:0}));
		return;
	}
	var list = await userInst.list(search,pageNum,pageSize);
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

async function add(req,res){
  var { name,password } = req.body;
  if(qcweb.common.isEmpty(name)){
    res.send(qcweb.common.responseMessage(null,1,"名称为空"));
    return;
  }
  if(qcweb.common.isEmpty(password)){
    res.send(qcweb.common.responseMessage(null,1,"密码为空"));
    return;
  }
  var checkName = await userInst.getByName(name);
  if(null != checkName){
    res.send(qcweb.common.responseMessage(null,1,"用户名已存在"));
    return;
  }

  let user = {
    id: qcweb.idWorker.generate(),
    name: name,
    password: password,
    salt: "1234",
  }
  userInst.save(user)
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

async function login(req, res){
	var { name,password } = req.body;
	if(qcweb.common.isEmpty(name)){
		res.send(qcweb.common.responseMessage(null,1,"名称为空"));
		return;
	}
	if(qcweb.common.isEmpty(password)){
		res.send(qcweb.common.responseMessage(null,1,"密码为空"));
		return;
	}
	var checkName = await userInst.getByName(name);
	if(null == checkName || password != checkName.password){
		res.send(qcweb.common.responseMessage(null,1,"用户名或密码错误"));
		return;
	}
	res.send(qcweb.common.responseMessage("登录成功"));
}

router.post('/login', function(req, res, next) {
	login(req,res)
		.then(function(data){

		})
		.catch(function(err){
			res.send(qcweb.common.responseMessage(null,400,err.message));
		})
});

module.exports = router;

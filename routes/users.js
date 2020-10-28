var express = require('express');
var router = express.Router();
var qcweb = require('../qcweb');
const userModel = require('../models/user');

const userInst = qcweb.getInst(userModel);

/* GET users listing. */
router.get('/list', function(req, res, next) {

  res.send('respond with a resource');
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

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;

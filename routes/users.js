var express = require('express');
var router = express.Router();
var qcweb = require('../qcweb');
const userModel = require('../models/user');

const userInst = qcweb.getInst(userModel);
const idWorker = qcweb.idWorker;

/* GET users listing. */
router.get('/list', function(req, res, next) {
  userInst.save()
  res.send('respond with a resource');
});

async function add(req,res){
  var { name,password } = req.body;
  if(name == null || name == ''){
    res.send(data);
    return;
  }

  let user = {
    id: idWorker.generate(),
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

    })
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;

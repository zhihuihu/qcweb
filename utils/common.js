let util = require('util');
let fs = require('fs');

Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}

function isEmpty(data){
  if(data === null || data === undefined){
    return true;
  }
  if(typeof data === 'string' && data === ''){
    return true;
  }
  if(Array.isArray(data) && data.length === 0){
    return true;
  }
  return false;
}


function deleteFolder(path) {
  var files = [];
  if (fs.existsSync(path)) {
    if (fs.statSync(path).isDirectory()) {
      files = fs.readdirSync(path);
      files.forEach(function (file, index) {
        var curPath = path + "/" + file;
        if (fs.statSync(curPath).isDirectory()) {
          deleteFolder(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    } else {
      fs.unlinkSync(path);
    }
  }
}

function copyFolder(from, to) {        // 复制文件夹到指定目录
  let files = [];
  if (fs.existsSync(to)) {           // 文件是否存在 如果不存在则创建
    files = fs.readdirSync(from);
    files.forEach(function (file, index) {
      var targetPath = from + "/" + file;
      var toPath = to + '/' + file;
      if (fs.statSync(targetPath).isDirectory()) { // 复制文件夹
        copyFolder(targetPath, toPath);
      } else {                                    // 拷贝文件
        fs.copyFileSync(targetPath, toPath);
      }
    });
  } else {
    fs.mkdirSync(to);
    copyFolder(from, to);
  }
}

function responseMessage(data,code,codeMessage){
  code = code || 0;
  return {
    code: code,
    codeMessage: codeMessage,
    data: data
  }
}
var common = {
  isEmpty: isEmpty,
  responseMessage: responseMessage,
  deleteFolder: deleteFolder,
  copyFolder: copyFolder
}

module.exports = common;


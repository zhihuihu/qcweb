const common = require('./utils/common');
const config = require('./config.json');
const fs = require('fs');
const path = require('path');
let insts = new Map();

/**
 * 获取一个model实例，如果不存在则创建一个新的返回
 * @param {*} m class
 * @example
 * yapi.getInst(groupModel, arg1, arg2)
 */
function getInst(m, ...args) {
	if (!insts.get(m)) {
		insts.set(m, new m(...args));
	}
	return insts.get(m);
}

function delInst(m) {
	try {
		insts.delete(m);
	} catch (err) {
		console.error(err); // eslint-disable-line
	}
}

/**
 * 获取真实配置文件
 * @param qcwebConfig
 * @param config
 * @returns {*}
 */
function getConfig(config){
  console.log("--find config file")
  // 获取qcwebConfig.json文件内容
  const qcwebCOnfigPath = path.resolve(__dirname,"../qcwebConfig.json");
  let qcwebConfig = null;
  if(fs.existsSync(qcwebCOnfigPath)){
    qcwebConfig = JSON.parse(fs.readFileSync(qcwebCOnfigPath).toString());
  }
  if(qcwebConfig){
    console.log(`use ${qcwebCOnfigPath} file`);
    return qcwebConfig;
  }else{
    console.log(`${qcwebCOnfigPath} file does not exist ,use ${path.resolve(__dirname,"./config.json")} file`)
    return config;
  }
}

var qcweb = {
	getInst: getInst, // 获取对象实例
	delInst: delInst, // 删除对象实例
  db: null, // 数据库DB
  idWorker: null, //生成ID实例
  common: common, //common工具
  config: getConfig(config), //获取配置文件
}

module.exports = qcweb;

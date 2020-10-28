const common = require('./utils/common');

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

var qcweb = {
	getInst: getInst, // 获取对象实例
	delInst: delInst, // 删除对象实例
  db: null, // 数据库DB
  idWorker: null, //生成ID实例
  common: common, //common工具
}

module.exports = qcweb;

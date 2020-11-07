var fs = require('fs');
var common = require('../utils/common');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

/**
 * 获取数据库连接
 * @param dbConfig
 * @returns {lowdb}
 */
function connect(dbConfig){
  var { location, tableSqls } = dbConfig;
  location = location.replace("\\", "/");
  common.mkdirPath(location.substring(0,location.lastIndexOf("/")));

  // 判断文件是否存在
	var exist = fs.existsSync(location);
	if(!exist){
		console.log("init database file");
		fs.openSync(location,'w');
	}

	// 初始化连接
	const adapter = new FileSync(location);
	const db = low(adapter);
	if(!exist){
		db.defaults({ history: [] })
			.write();
	}
  return db;
}

module.exports = {
  connect: connect,
}

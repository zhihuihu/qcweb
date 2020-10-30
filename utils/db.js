var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

/**
 * 获取数据库连接
 * @param dbConfig
 * @returns {sqlite3.Database}
 */
function connect(dbConfig){
  var { location, tableSqls } = dbConfig;
  var db = new sqlite3.Database(location);
  var exist = fs.existsSync(location);
  if(!exist){
    console.log("init database file");
    fs.openSync(location,'w');
  }
  tableSqls.forEach(function(item,index,arr){
    createTable(db,item);
  })
	initAsync(db);
  return db;
}

/**
 * 初始化DB连接的异步方法
 * @param db
 */
function initAsync(db){
	var runAsync = function (sql){
		var promise = new Promise(function(resolve, reject){
			db.run(sql,function(err){
				if(err == null){
					resolve(true);
				}else{
					reject(err);
				}
			})
		})
		return promise;
	}
	var getAsync = function (sql){
		var promise = new Promise(function(resolve, reject){
			db.get(sql,function(err,data){
				if(err == null){
					resolve(data);
				}else{
					reject(err);
				}
			})
		});
		return promise;
	}
	var allAsync = function (sql){
		var promise = new Promise(function(resolve, reject){
			db.all(sql,function(err,data){
				if(err == null){
					resolve(data);
				}else{
					reject(err);
				}
			})
		});
		return promise;
	}
	db.runAsync = runAsync;
	db.getAsync = getAsync;
	db.allAsync = allAsync;
}



function createTable(db,sql){
  db.run(sql, function(err){
    if(null != err){
      console.log("create table error:" + err)
    }
  });
}

module.exports = {
  connect: connect,
}

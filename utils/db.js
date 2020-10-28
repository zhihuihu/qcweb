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
  return db;
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

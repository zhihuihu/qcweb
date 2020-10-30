const baseModel = require('./base');
const qcweb = require('../qcweb');

class userModel extends baseModel{

  getName() {
    return "user";
  }

  getSchema() {
    return {

    }
  }

  async save(data){
    let saveData = {
      id: data.id,
      name: data.name,
      password: data.password,
      salt: data.salt,
    }
    var sql = `insert into user(id, name, password, salt, createTime) values('${saveData.id}', '${saveData.name}', '${saveData.password}', '${saveData.salt}', '${new Date().format("yyyy-MM-dd hh:mm:ss")}')`;
    var result = await this.runAsync(sql);
    return saveData;
  }

  async getByName(name){
    var sql = `select id, name, password, salt, createTime from user where name='${name}'`;
    var result = await this.getAsync(sql);
    return result;
  }

  async listCount(name){
  	var searchSql = "";
  	if(!qcweb.common.isEmpty(name)){
			searchSql = `and name like '%${name}%'`;
		}
		var sql = `select count(id) as c from user where 1=1 ${searchSql}`;
		var result = await this.getAsync(sql);
		return result.c;
  }

  async list(name,pageNum,pageSize){
		var searchSql = "";
		if(!qcweb.common.isEmpty(name)){
			searchSql = `and name like '%${name}%'`;
		}
  	var limit = pageSize;
  	var offset = (pageNum <= 1) ? 0 : (pageNum - 1)*pageSize;
		var sql = `select id, name, password, salt, createTime from user where 1=1 ${searchSql} limit ${limit} offset ${offset}`;
		var result = await this.allAsync(sql);
		return result;
  }

}

module.exports = userModel;

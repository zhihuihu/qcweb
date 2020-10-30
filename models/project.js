const baseModel = require('./base');
const qcweb = require('../qcweb');

class projectModel extends baseModel{

  getName() {
    return "project"
  }

  getSchema() {
    return {

    }
  }

  async getById(id){
    let sql = `select id, name, describe, folder, workspace, checkDir  createTime from project where id='${id}'`;
    var result = await this.getAsync(sql);
    return result;
  }

  async getByName(name){
    let sql = `select id, name, describe, folder, workspace, checkDir  createTime from project where name='${name}'`;
    var result = await this.getAsync(sql);
    return result;
  }

  async add(data){
    let saveData = {
      id: data.id,
      name: data.name,
      describe: data.describe,
      folder: data.folder,
      workspace: data.workspace,
      checkDir: data.checkDir,
      createTime: new Date().format("yyyy-MM-dd hh:mm:ss"),
    }
    let sql = `insert into project(id, name, describe, folder, workspace, checkDir,  createTime) values('${saveData.id}', '${saveData.name}', '${saveData.describe}', '${saveData.folder}', '${saveData.workspace}', '${saveData.checkDir}', '${saveData.createTime}')`;
    await this.runAsync(sql);
    return saveData;
  }

  async listCount(name){
    var searchSql = "";
    if(!qcweb.common.isEmpty(name)){
      searchSql = `and name like '%${name}%'`;
    }
    var sql = `select count(id) as c from project where 1=1 ${searchSql}`;
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
    var sql = `select id, name, describe, folder, workspace, checkDir, createTime from project where 1=1 ${searchSql} limit ${limit} offset ${offset}`;
    var result = await this.allAsync(sql);
    return result;
  }

}

module.exports = projectModel;

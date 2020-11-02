const baseModel = require('./base');
const qcweb = require('../qcweb');

class historyModel extends baseModel{

  getName() {
    return "history";
  }

  getSchema() {
    return {

    }
  }

  async add(data){
    let saveData = {
      id: data.id,
      projectId: data.projectId,
      projectName: data.projectName,
      fileUrl: data.fileUrl,
      result: data.result,
      operatorId: data.operatorId,
      operator: data.operator,
      describe: data.describe,
      createTime: new Date().format("yyyy-MM-dd hh:mm:ss"),
    }
    let sql = `insert into history(id, projectId, projectName, fileUrl, result, operatorId, operator, describe, createTime) values('${saveData.id}', '${saveData.projectId}', '${saveData.projectName}', '${saveData.fileUrl}', '${saveData.result}', '${saveData.operatorId}', '${saveData.operator}', '${saveData.describe}','${saveData.createTime}')`;
    await this.runAsync(sql);
    return saveData;
  }

  async getById(id){
    let sql = `select id, projectId, projectName, fileUrl, result, operatorId, operator, describe, createTime from history where id='${id}'`;
    var result = await this.getAsync(sql);
    return result;
  }

  async listCount(projectId){
    var searchSql = "";
    if(!qcweb.common.isEmpty(projectId)){
      searchSql = `and projectId = '${projectId}'`;
    }
    var sql = `select count(id) as c from history where 1=1 ${searchSql}`;
    var result = await this.getAsync(sql);
    return result.c;
  }

  async list(projectId,pageNum,pageSize){
    var searchSql = "";
    if(!qcweb.common.isEmpty(projectId)){
      searchSql = `and projectId = '${projectId}'`;
    }
    var limit = pageSize;
    var offset = (pageNum <= 1) ? 0 : (pageNum - 1)*pageSize;
    var sql = `select id, projectId, projectName, fileUrl, result, operatorId, operator, describe, createTime from history where 1=1 ${searchSql} order by createTime desc limit ${limit} offset ${offset}`;
    var result = await this.allAsync(sql);
    return result;
  }

}

module.exports = historyModel;

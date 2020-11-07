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

  add(data){
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
    this.db.get('history').push(saveData).write();
    return {...saveData};
  }

  getById(id){
		var result = this.db.get('history').find({id:id}).value();
    return {...result};
  }

  listCount(projectId){
    var filter = {};
    if(!qcweb.common.isEmpty(projectId)){
			filter.projectId = projectId;
    }
    var result = this.db.get('history').filter(filter).size().value();
    return result;
  }

  list(projectId,pageNum,pageSize){
		var filter = {};
    if(!qcweb.common.isEmpty(projectId)){
			filter.projectId = projectId;
    }
    var limit = pageSize;
		var result = this.db.get('history')
			.filter(filter)
			.orderBy('createTime','desc')
			.take(limit)
			.value();
    return result;
  }

}

module.exports = historyModel;

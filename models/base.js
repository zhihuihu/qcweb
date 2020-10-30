const qcweb = require('../qcweb');
const util = require('util')

class baseModel {
  constructor() {
		this.db = qcweb.db;
		var that = this;
		this.runAsync = qcweb.db.runAsync;
		this.getAsync = qcweb.db.getAsync;
		this.allAsync = qcweb.db.allAsync;
	}

  getName(){
    console.log("Model Class name")
  }

  getSchema(){
    console.log("table describe name")
  }
}
module.exports = baseModel;

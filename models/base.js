const qcweb = require('../qcweb');

class baseModel {
  constructor() {
		this.db = qcweb.db;
	}

  getName(){
    console.log("Model Class name")
  }

  getSchema(){
    console.log("table describe name")
  }
}
module.exports = baseModel;

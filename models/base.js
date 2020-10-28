const qcweb = require('../qcweb');
const util = require('util')

class baseModel {
  constructor() {
    this.db = qcweb.db;
    var that = this;
    this.runAsync = function (sql){
      var promise = new Promise(function(resolve, reject){
        that.db.run(sql,function(err){
          if(err == null){
            resolve();
          }else{
            reject(err);
          }
        })
      })
      return promise;
    }
    this.getAsync = function (sql){
      var promise = new Promise(function(resolve, reject){
        that.db.get(sql,function(err,data){
          if(err == null){
            resolve(data);
          }else{
            reject(err);
          }
        })
      });
      return promise;
    }
    this.allAsync = function (sql){
      var promise = new Promise(function(resolve, reject){
        that.db.all(sql,function(err,data){
          if(err == null){
            resolve(data);
          }else{
            reject(err);
          }
        })
      });
      return promise;
    }
  }

  getName(){
    console.log("Model Class name")
  }
}
module.exports = baseModel;

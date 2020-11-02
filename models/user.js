const baseModel = require('./base');
const qcweb = require('../qcweb');
const config = require('../config.json');

class userModel extends baseModel{

  getName() {
    return "user";
  }

  getSchema() {
    return {

    }
  }

  getById(id){
    let users = config.users;
    let result = null;
    users.forEach(function(value){
      if(value.id === id){
        result = value;
        return;
      }
    })
    return result;
  }

  getByName(name){
    let users = config.users;
    let result = null;
    users.forEach(function(value){
      if(value.name === name){
        result = value;
        return;
      }
    })
    return result;
  }

  list(name){
    let users = config.users;
    let results = [];
    users.forEach(function(value){
      if(value.name === name){
        results.push(value);
      }
    })
    return results;
  }

}

module.exports = userModel;

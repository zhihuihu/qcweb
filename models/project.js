const baseModel = require('./base');
const config = require('../config.json');

class projectModel extends baseModel{

  getName() {
    return "project"
  }

  getSchema() {
    return {

    }
  }
  getById(id){
    let projects = config.projects;
    let result = null;
    projects.forEach(function(value){
      if(value.id === id){
        result = value;
        return;
      }
    })
    return result;
  }

  getByName(name){
    let projects = config.projects;
    let result = null;
    projects.forEach(function(value){
      if(value.name === name){
        result = value;
        return;
      }
    })
    return result;
  }

  list(name){
    let projects = config.projects;
    let results = [];
    projects.forEach(function(value){
      if(value.name === name){
        results.push(value);
      }
    })
    return results;
  }

}

module.exports = projectModel;

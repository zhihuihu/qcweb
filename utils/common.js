var util = require('util')

function isEmpty(data){
  if(data === null || data === undefined){
    return true;
  }
  if(typeof data === 'string' && data === ''){
    return true;
  }
  if(Array.isArray(data) && data.length === 0){
    return true;
  }
  return false;
}

var common = {
  isEmpty: isEmpty,
}

module.exports = common;


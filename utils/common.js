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

function responseMessage(data,code,codeMessage){
  code = code || 0;
  return {
    code: code,
    codeMessage: codeMessage,
    data: data
  }
}
var common = {
  isEmpty: isEmpty,
  responseMessage: responseMessage,
}

module.exports = common;


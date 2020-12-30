let qcweb = require('../qcweb');

/**
 * 服务器启动助手
 */
class serverHandlerEnhance{
  // 用户自定义配置文件
  config = null;

  constructor(config) {
    this.config = config;
  }

  /**
   * 启动服务
   */
  start(){
    if(this.config){
      console.log("--config-- Override the default profile and use the user-defined incoming profile")
      qcweb.config = this.config;
    }
    let serverHandler = require('./serverHandler');
    let serverHandlerIns = new serverHandler();
    serverHandlerIns.start();
  }

}
module.exports = serverHandlerEnhance;

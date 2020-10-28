const baseModel = require('./base');

class userModel extends baseModel{

  getName() {
    return "user";
  }

  async save(data){
    let saveData = {
      id: data.id,
      name: data.name,
      password: data.password,
      salt: data.salt,
    }
    var sql = `insert into user(id, name, password, salt, createTime) values('${saveData.id}', '${saveData.name}', '${saveData.password}', '${saveData.salt}', '${new Date().toLocaleDateString()}')`;
    var result = await this.runAsync(sql);
    return saveData;
  }

  async getByName(name){
    var sql = `select id, name, password, salt, createTime from user where name='${name}'`;
    var result = await this.getAsync(sql);
    return result;
  }

}

module.exports = userModel;

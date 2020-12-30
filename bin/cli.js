#!/usr/bin/env node
const commander = require('commander');
const download = require('download-git-repo');      //github仓库下载
const inquirer = require('inquirer');       //命令行答询
const ora = require('ora');         //命令行中加载状态标识
const chalk = require('chalk');     //命令行输出字符颜色
const fs = require('fs');
const request = require('request');
const compressing = require('compressing');
const path = require("path");
const projectPackage = require('../package.json');

const qcwebProject = {
  url: 'direct:https://github.com/zhihuihu/qcweb.git'
}

// 工具版本号
commander.version(projectPackage.version);

commander
  .command('server-init')
  .description('init server project in current location')
  .action(function () {
    let cloneUrl = qcwebProject.url;
    if (fs.existsSync(path.resolve('./') + '/qcweb')) {
      console.log(chalk.red(`
                          server-init failed
      The "qcweb" folder already exists at the current path`
      ));
      return;
    }
    const spinner = ora('start download...').start();
    download(cloneUrl, 'qcweb', {clone: true}, err => {
      if (err) {
        spinner.fail('download failed');
        console.log(err);
      } else {
        if (!fs.existsSync(path.resolve('./')+'/qcwebConfig.json')) {
          fs.copyFileSync(path.resolve('./')+'/qcweb/config.json',path.resolve('./')+'/qcwebConfig.json');
        }else{
          console.log(chalk.green(`qcwebConfig.json already exists `));
        }
        spinner.succeed('download success');
        console.log(chalk.green(`
        Next you should do it
        
        config qcwebConfig.json file or config qcweb/config.json file
        
        cd qcweb && npm install
        
        then you can start the project and use config.json to config your project and user
        
        node ./bin/www
        `));
      }
    });
  });

commander
  .command('server <configPath>')
  .description('quick start qcweb service')
  .action(function (configPath) {
    let serverConfig;
    if(path.isAbsolute(configPath)){
      if(!fs.existsSync(configPath)){
        console.log(chalk.red(`[qcweb server] The configuration file does not exist`));
        return 0;
      }
      serverConfig = JSON.parse(fs.readFileSync(configPath).toString());
    }else{
      let truePath = path.resolve('./', configPath);
      if(!fs.existsSync(truePath)){
        console.log(chalk.red(`[qcweb server] The configuration file does not exist`));
        return 0;
      }
      serverConfig = JSON.parse(fs.readFileSync(truePath).toString());
    }
    // 临时解决方案，之前代码问题，为了快速发布采用该写法
    const serverHandlerEnhance = require('./serverHandlerEnhance')
    let serverHandlerEnhanceIns = new serverHandlerEnhance(serverConfig);
    serverHandlerEnhanceIns.start();
  });

async function deploy(url, describe) {
  while (!describe || describe === ''){
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'describe',
        message: '请输入发布描述',
        default: ''
      }
    ]);
    describe = answers.describe
  }
  console.log(chalk.green(`本次版本发布说明：${describe}`));
  const spinner = ora('start deploying...').start();
  const routerUrl = '/deploy/new';
  if (!fs.existsSync(path.resolve('./') + '/dist')) {
    spinner.fail('deployment failed');
    console.log(chalk.red(`
                          package failed
      The "dist" folder not exists at the current path`
    ));
    return;
  }
  if (fs.existsSync(path.resolve('./') + '/dist.zip')) {
    fs.unlinkSync(path.resolve('./') + '/dist.zip');
  }
  await compressing.zip.compressDir(path.resolve('./') + '/dist', path.resolve('./') + '/dist.zip');
  let formData = {
    describe: describe,
    file: fs.createReadStream(path.resolve('./') + '/dist.zip')
  }
  request.post({url: url + routerUrl, formData: formData, json: true}, function (err, rep, body) {
    if (err) {
      spinner.fail('deployment failed');
      printError("deploy failed",err);
    } else {
      if (body.code !== 0) {
        spinner.fail('deployment failed');
        printFailed('deploy failed',body);
      } else {
        spinner.succeed('deployment success');
        printSuccess(`deploy success`,body);
      }
    }
  });
}

commander
  .command('deploy <url> [describe]')
  .description('package .zip file and deploy new version to server')
  .action(function (url, describe) {
    deploy(url, describe)
      .catch(function (err) {
        printError("deploy failed",err);
      });
  });

async function rollback(url,historyId){
  while (!historyId || historyId === ''){
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'historyId',
        message: '请输入回滚版本ID',
        default: ''
      }
    ]);
    historyId = answers.historyId
  }
  console.log(chalk.green(`本次回退版本ID：${historyId}`));
  const spinner = ora('start rollback...').start();
  const routerUrl = '/deploy/rollback';
  let form = {
    historyId: historyId,
  }
  request.post({url: url + routerUrl, form: form, json: true}, function (err, rep, body) {
    if (err) {
      spinner.fail('rollback failed');
      printError("rollback failed",err);
    } else {
      if (body.code !== 0) {
        spinner.fail('rollback failed');
        printFailed('rollback failed',body);
      } else {
        spinner.succeed('rollback success');
        printSuccess(`rollback success`,body);
      }
    }
  });
}

commander
  .command('rollback <url> [historyId]')
  .description('rollback project to historyId version')
  .action(function (url, historyId) {
    rollback(url,historyId)
      .catch(function(err){
        printError("rollback failed",err);
      })
  });

commander
  .command('history <url> [top]')
  .description('show project deploy history')
  .action(function (url, top) {
    if(!top){
      console.log(chalk.yellow(`You did not pass in the [top] parameter. The default value is 10`));
      top = 10;
    }else{
      console.log(chalk.green(`本次查询条数：${top}`));
    }
    const spinner = ora('start querying history...').start();
    const routerUrl = '/deploy/list';
    request.get({
      url: url + routerUrl,
      qs: {
        pageNum: 1,
        pageSize: top
      },
      json: true
    }, function (err, rep, body) {
      if(err){
        spinner.fail('querying history failed');
        printError("history failed",err);
      }else{
        if (body.code !== 0) {
          spinner.fail('querying history failed');
          printFailed('history failed',body);
        } else {
          spinner.succeed('querying history success');
          console.log(chalk.green(`projectName: ${body.data.project.name} ; checkDir: ${body.data.project.checkDir}`));

          console.log(chalk.green(`historyId                             uploadUser         uploadTime    describe`));
          body.data.list.forEach(function (history) {
            console.log(chalk.green(`${history.id}  ${history.operator}   ${history.createTime}   ${history.describe}`));
          });
        }
      }

    })
  });

function printError(title,err){
  console.log(chalk.red(`${title}`));
  console.log(chalk.red(`${err}`));
}

function printFailed(title,body){
  console.log(chalk.red(`${title}`));
  console.log(chalk.red(`code=${body.code}`));
  console.log(chalk.red(`codeMessage=${body.codeMessage}`));
  console.log(chalk.red(`data=${body.data}`));
}

function printSuccess(title,body){
  console.log(chalk.green(`${title}`));
  console.log(chalk.green(`code=${body.code}`));
  console.log(chalk.green(`codeMessage=${body.codeMessage}`));
  console.log(chalk.green(`data=${body.data}`));
}

commander.parse(process.argv);

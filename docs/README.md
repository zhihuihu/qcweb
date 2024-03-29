### quick-start
### 工具介绍
qcweb 是一款快速部署前端网站的工具，认证采用了HTTP Basic 认证

数据库使用的 lowdb json文件数据库。

工具分为服务端和客户端两部分

#### 服务端
* 采用express作为web框架实现http的服务端，接收需要发布的项目文件然后发布

#### 客户端
* 采用request发起http请求把项目dist文件夹打包压缩并上传到服务端进行项目迭代更新

客户端所有的请求都需要带权限认证如以下URL

`http://<projectId>:<userId>@127.0.0.1:3000`

服务端为外部提供了三个标准接口
```
#发布接口：/deploy/new   更新项目版本
#回滚接口：/deploy/rollback      回滚项目版本
#历史版本查看接口：`/deploy/list     查看发布历史
```

### 项目的配置文件位于项目同级的 qcwebConfig.json（优先采用该文件） 或者根目录下的  config.json 文件 或者使用 qcweb 脚手架启动服务端使用自定义位置的配置文件
```
# 下面是配置文件说明
port  #项目启动端口号
db.location #lowdb json文件数据库地址，该文件存储发布历史记录信息
deploy.tempUpload #发布时上传文件的临时保存目录 必须以/结尾
deploy.hisWorkspace #发布项目后保存的历史上传版本包 必须以/结尾

users #用户配置 可以配置多个用户
{
  "id":"xxxx",//用户ID，必须唯一
  "name": "xxx",//用户名
  "createTime": "2020-10-30 14:21:53"//新增时间
}

projects #项目配置 可以配置多个项目
{
  "id": "392508c2-f4b3-48b9-84cd-93b8891f19ec",//项目ID
  "name": "测试项目",//项目名称
  "describe": "测试项目描述",//项目描述
  "folder": "test",//项目发布的文件夹
  "workspace": "E:\\temp\\",//项目发布的目录
  "checkDir": "dist",//项目更新需要检查的文件夹 比如我们上传的文件解压后必须有dist文件夹才能发布成功
  "needCheckDir": false,//发布的时候是否直接把checkDir复制到根目录，如果是false则复制checkDir里面的内容到项目文件夹中，否则直接复制checkDir到文件夹中
  "createTime": "2020-10-30 14:21:53"//创建时间
}
```
##### 示例配置 sample-config.json
```
{
  "port": "3000",
  "db": {
    "location": "E:/workspace/node/qcwebDb.json"
  },
  "deploy": {
    "tempUpload": "E:/workspace/node/temp/",
    "hisWorkspace": "E:/workspace/node/deployHistory/"
  },
  "256AesKey": "RmSestsqqyl1JFfWGPQaSxBaSfxXfgYc",
  "users": [
    {
      "id": "u-xxx",
      "name": "superAdmin",
      "password": "123456",
      "salt": "123456",
      "createTime": "2020-10-30 14:21:53"
    }
  ],
  "projects": [
    {
      "id": "p-xxx",
      "name": "公司官网",
      "describe": "公司官网",
      "folder": "home",
      "workspace": "E:/temp/",
      "checkDir": "dist",
      "needCheckDir": false,
      "createTime": "2020-10-30 14:21:53"
    }
  ]
}

```

#### 安装
使用项目提供的工具 qcweb 脚手架工具，部署 qcweb 平台是非常容易的 提供了两种方式部署、源码部署服务端和脚手架命令快速部署服务端
```shell script
# 安装脚手架
npm install -g qcweb
```
##### 一、源码方式安装服务端 会在执行命令的文件夹下面生成 qcweb 文件夹
```
qcweb server-init
# 执行 npm install
# 按照个人需求配置 config.json 文件
# 执行 node ./bin/www 平台即可运行成功
```
##### 二、脚手架快速启动服务端
```
qcweb server config.json #config.json文件是配置文件路径，可以是相对的也可以是绝对路径
```

#### 项目发布（客户端操作）

```shell script
* projectId 项目ID
* userId 用户ID
* describe 更新描述
* top 查看多少条
* historyId 历史版本ID


* 发布新版本 qcweb deploy "http://<projectId>:<userId>@127.0.0.1:3000" "<describe>"
# 如下 会把项目根目录下面的 dist 文件夹压缩为 dist.zip 文件 ，然后上传到服务器完成项目更新
qcweb deploy "http://392508c2-f4b3-48b9-84cd-93b8891f19ec:9da39bcc-aba0-44e0-927a-8f5feada0e13@127.0.0.1:3000" "测试脚手架"

* 查看发布历史 qcweb deploy "http://<projectId>:<userId>@127.0.0.1:3000" "<top>"
# 如下
qcweb history "http://392508c2-f4b3-48b9-84cd-93b8891f19ec:9da39bcc-aba0-44e0-927a-8f5feada0e13@127.0.0.1:3000" 10

会得到如下结果
* historyId                             uploadUser         uploadTime    describe
* b4af1ac0-1db6-11eb-85e1-55399207c7de  superAdmin   2020-11-03 17:26:51   版本回滚-->null
* be58f550-1db1-11eb-b14a-537213ab45fb  superAdmin   2020-11-03 16:51:20   版本回滚-->null
* 51910440-1db0-11eb-a67d-57e45b9bb2d2  superAdmin   2020-11-03 16:41:08   测试脚手架1
* d7625480-1daf-11eb-a67d-57e45b9bb2d2  superAdmin   2020-11-03 16:37:43   测试脚手架1
* 62229d10-1daf-11eb-a67d-57e45b9bb2d2  superAdmin   2020-11-03 16:34:26   测试脚手架
* 30330910-1ced-11eb-9f03-951397e20d0f  superAdmin   2020-11-02 17:24:20   版本回滚-->null
* 87fad5e0-1cea-11eb-bb1d-ff56e6f9c60d  superAdmin   2020-11-02 17:05:19   null
* 6f790820-1cea-11eb-82d4-f7f22ce15ed0  superAdmin   2020-11-02 17:04:38   null
* 66034f30-1cea-11eb-82d4-f7f22ce15ed0  superAdmin   2020-11-02 17:04:22   null
* 389b5100-1cea-11eb-82d4-f7f22ce15ed0  superAdmin   2020-11-02 17:03:06   null

* 回滚版本 qcweb rollback "http://<projectId>:<userId>@127.0.0.1:3000" "<historyId>"
# 如下 用上面得到的historyId即可使用
qcweb rollback "http://392508c2-f4b3-48b9-84cd-93b8891f19ec:9da39bcc-aba0-44e0-927a-8f5feada0e13@127.0.0.1:3000" "6f790820-1cea-11eb-82d4-f7f22ce15ed0"

```



FROM huzhihui/node:v14.15.0
MAINTAINER huzhihui_c@qq.com

COPY . /usr/local/server/app/

WORKDIR /usr/local/server/app/

RUN npm config set registry https://registry.npm.taobao.org
RUN npm install --unsafe-perm

EXPOSE 3000

ENV PROJECT_RUN_PARAM="node /usr/local/server/app/bin/www"

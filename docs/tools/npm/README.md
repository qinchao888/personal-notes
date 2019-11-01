---
title: NPM
lang: zh-CN
sidebarDepth: 0
---
#### 命令

```
npm list -g --depth 0 // 查看当前所有s已全局安装的模块

npm i // npm install

npm i -s // npm install --save（安装到dependencies中）

npm i -d // npm install --save-dev（安装到devDependencies中s）

npm view less versions // 查看所有的less版本

npm list less // 查看当前安装的less版本

npm init -y // 生成package.json文件

npm update 模块名 // 更新已安装的模块至最新版

npm cache clean // 删除缓存下的所有文件

npm install 模块名@3.1 --save-dev // 安装指定版本的模块

```

<p class="fg_t">npm install</p>

安装模块时会先去检测本地的 node_modules 中是否存在该模块，如果已存在不再安装。

强制重新安装：npm install -f | npm install --force

<p class="fg_t">npm view 模块名</p>

<p class="fb_th">可以查看当前模块所有的版本信息。</p>

等价于：

```
npm show 模块名

npm info 模块名

npm v 模块名
```
通过网址访问：https://registry.npmjs.org/模块名
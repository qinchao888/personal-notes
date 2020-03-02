---
title: NPM
lang: zh-CN
sidebarDepth: 2
---
## 基础用法

### 基础命令

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

### npm 安装模块版本

1. ~ ：匹配最近的小版本依赖包，比如~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0。
2. ^ ：匹配最新的大版本依赖包，比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0。
3. *：安装最新版本的依赖包。

```js
npm install name@1.2.x ---- 1.2.0 <= verion < 1.3.0
npm install name@1.x ---- 1.0.0 <= version < 2.0.0
npm install name@1.2.* ---- 1.2.0 <= version < 1.3.0
npm install name@1.* ---- 1.0.0 <= version < 2.0.0
npm install name@* ---- 0.0.0 <= version

npm install name@^1.2.3 ---- 1.2.3 <= version < 2.0.0 
npm install name@^0.2.3 ---- 0.2.3 <= version < 0.3.0
npm install name@^0.0.3 ---- 0.0.3 <= version < 0.1.0
npm install name@^1.2.x ---- 1.2.0 <= version <2.0.0
npm install name@^0.0.x ---- 0.0.0 <= version <0.1.0
npm install name@^0.0 ---- 0.0.0 <= version <0.1.0

npm install name@~1.2.3 ----- 1.2.3 <= version <1.3.0
npm install name@~1.2 ----- 1.2.0 <= version <1.3.0 (Same as 1.2.x)
npm install name@~1 ----- 1.0.0 <= version <2.0.0 (Same as 1.x)
npm install name@~0.2.3 ----- 0.2.3 <= version <0.3.0
npm install name@~0.2 ----- 0.2.0 <= version <0.3.0 (Same as 0.2.x)
npm install name@~0 ----- 0.0.0 <= version <1.0.0 (Same as 0.x)
```

[参考](https://segmentfault.com/a/1190000012227584)

### package-lock.json的理解

package-lock.json里是会保存项目所有的依赖(包括依赖的依赖)的版本，下载地址等。 因为项目package.json中对依赖版本不同的要求，会有不同写法，比如限定最低版本，限定版本范围等等。所以在不同时间运行npm i,可能期间有些依赖会出新的版本，造成package-lock.json变动。 就算自己的项目直接依赖固定了版本号，但是你的依赖的依赖没法固定，也会出现这种现象。

### npm ci

介绍：NPM 5.7.0 引入了一种新的安装依赖的方式。

优点：从 package-lock.json 文件安装依赖，安装速度比 npm i 更快。

1. 项目里面必须存在 package-lock.json 或 npm-shrinkwrap.json.
2. 如果 package lock 里面依赖和 package.json 不一致， npm ci 会报错并且退出， 而不是更新 package lock 文件。
3. npm ci 只能一次性安装整个工程的依赖， 不能使用这个命令单独安装依赖。
4. 如果 node_modules 文件夹存在， 它会在安装依赖之前删除这个文件夹。
5. 它不会改变 package.json 或者任何 package-locks.json。

[参考](https://www.jianshu.com/p/a6e79438871e)

## npm package

### socket.io

用于 websocket。

### pdf2json

可用于解析pdf中的txt文本内容。

### textract

可用于解析doc、docx中的txt文本。

### mmmagic

类似于 mac 中的 'file --mime -b 文件' 的功能。可用于获取文件的 contentType 和 charset。

### iconv-lite

使用指定的charset对内容进行编码和解码。
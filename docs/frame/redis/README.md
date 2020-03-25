---
title: redis
lang: zh-CN
sidebarDepth: 2
---

## 基础

### 查看redis版本

```js
>chao.qin@cfdeMacBook-Pro ~ % redis-server --version
Redis server v=5.0.6 sha=00000000:0 malloc=libc bits=64 build=7a57e483d6f8b275
>chao.qin@cfdeMacBook-Pro ~ % redis-server -v
Redis server v=5.0.6 sha=00000000:0 malloc=libc bits=64 build=7a57e483d6f8b275
```

### 关闭和启动redis

```js
// 启动
>redis-server &

// 关闭
>redis-cli shutdown

// 查看info
>redis-cli
>info
```
---
title: axios
lang: zh-CN
sidebarDepth: 2
---

## 基础用法

## 其他知识

### error 和 error.response的理解

```js
// axios的实现方式类似于
var error = new Error('this is a error');
error.response = {
  title: 'error',
  value: 1111
};
console.log('error', error); // error Error: this is a error
console.log('response', error.response); // { title: 'error', value: 1111 }
```

### 将jQuery中的ajax请求封装成promise对象使用

```js
getUsers () {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: 'http://192.168.99.239:8888/users',
      success: function (res) {
        resolve(res);
      },
      error: function (error) {
        reject(error);
      }
    });
  });
}

// 调用
this.getUsers().then(res => console.log('res', res));

// 或
...
const res = await this.getUsers();
```
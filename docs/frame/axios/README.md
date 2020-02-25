---
title: axios
lang: zh-CN
sidebarDepth: 2
---

## 请求方式

1. get：获取数据
2. post：提交数据（表单提交 + 文件上传）
3. put：更新数据（所有数据推送到后端）
4. patch：更新数据（只将修改的数据推送到后端）
5. delete：删除数据

## 请求的语法格式

### get

```js
// 方式一：
axios.get('http://localhost:8888/login?username=admin&password=123456').then(res => {
  console.log(res)
})

// 方式二：
axios.get('http://localhost:8888/login', {
  params: {
    username: 'admin',
    password: '123456'
  }
}).then(res => {
  console.log(res)
})

// 方式三：
axios({
  url: 'http://localhost:8888/login',
  params: {
    username: 'admin',
    password: '123456'
  }
}).then(res => {
  console.log(res)
})
```

### post 

```js
// 默认 Content-Type 为 application/json
// 方式一
axios.post('http://localhost:8888/register', {
  username: 'test',
  password: '123'
}, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
}).then(res => {
  console.log(res)
})

// 方式二
axios({
  url: 'http://localhost:8888/register',
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: {
    username: 'test',
    password: '123'
  }
}).then(res => {
  console.log(res)
})
```
```js
// Content-type 为 multipart/form-data，用于图片或文件上传

let formData = new FormData()
formData.append('id', 1234)
axios.post('http://localhost:8888/file', formData).then(res => {
  console.log(res)
})

/*
Content-Type: multipart/form-data;boundary=----WebKitFormBoundaryKRFSAiOj6GyRKsQ7

Form Data
  id: 1234
*/
```

### put 和 patch

```js
axios.put('http://localhost:8888/put', {
  username: 'test',
  password: '123'
}).then(res => {
  console.log(res)
})

axios.patch('http://localhost:8888/patch', {
  password: '123'
}).then(res => {
  console.log(res)
})
```

### delete

delete 中的参数可以放在 params 中 也可以放在 data 中，具体看后端如何定义。

```js
axios.delete('http://localhost:8888/delete', {
  params: {
    username: 'test',
    password: '123'
  }
}).then(res => {
  console.log(res)
})

axios({
  url: 'http://localhost:8888/delete',
  method: 'delete',
  params: {
    username: 'test',
    password: '123'
  }
}).then(res => {
  console.log(res)
})
/*
Query String Parameters
  username: test
  password: 123
*/

axios.delete('http://localhost:8888/delete', {
  data: {
    username: 'test',
    password: '123'
  }
}).then(res => {
  console.log(res)
})

axios({
  url: 'http://localhost:8888/delete',
  method: 'delete',
  data: {
    username: 'test',
    password: '123'
  }
}).then(res => {
  console.log(res)
})
/*
Request Payload
  username: "test"
  password: "123"
*/
```

## 并发请求

需要请求多个接口，但是需要同时处理这些接口的返回值的时候使用并发请求。

```js
axios.all([ // 执行多个并发请求
  axios.get('/a.json'),
  axios.get('/b.json')
]).then(axios.spread((aRes, bRes) => { // 两个请求都执行完成
  console.log(aRes, bRes)
}))
```

## axios 实例

后端接口地址有多个并且超时时长不一致，使用 axios 实例更方便。

```js
const instance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 10000 // default is `0` (no timeout)
})
instance.get('/a.json').then(res => {
  console.log(res)
})

/* 直接使用 axios.get()的时候实际上也是创建了一个实例，只不过这个实例是默认的实例。*/
```

## axios 配置方式

### 全局配置

```js
axios.defaults.timeout = 1000
axios.defaults.baseURL = 'http://localhost:8080'
```
### 实例配置

```js
axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000
})
// 或
const instance = axios.create() // 默认使用 axios.defaults 的配置
instance.defaults.baseURL = 'http://localhost:8080'
instance.defaults.timeout = 1000
```

### 请求配置

```js
const instance = axios.create({
  timeout: 3000
})
instance.get('/data.json', {
  timeout: 5000
})
```

优先级：请求配置 > 实例配置 > 全局配置

#### 实际应用

```js
/* 后端存在两个接口
http://localhost:8080
http://localhost:8081 */

const instance0 = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000
})

const instance1 = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 3000
})

instance0.get('/contactList', {
  params: {}
}).then(res => {
  console.log(res)
})

instance1.get('/orderList', {
  timeout: 5000
}).then(res => {
  console.log(res)
})
```

## 拦截器

```js
// 请求拦截器
axios.interceptors.request.use(config => {
  // 发送请求前的处理
  return config
}, err => { // 请求失败，即请求没有到后端
  // 请求错误时的处理
  return Promise.reject(err)
})

/* 请求错误的情况：
1. 401，请求超时
2. 404，接口没找到
*/

// 响应拦截器
axios.interceptors.response.use(res => {
  // 请求成功对响应数据的处理
  return res
}, err => { // 请求到了后端，但返回错误
  // 响应错误的处理
  return Promise.reject(err)
})

// 取消拦截器
const interceptors = axios.interceptors.request.use(config => {
  config.headers = {
    auth: true
  }
  return config
})
axios.interceptors.request.eject(interceptors)
```

### 登录状态

```js
// 访问需要登录的接口
const instance = axios.create()
instance.interceptors.request.use(config => {
  config.headers.token = ''
  return config
}, err => {
  return Promise.reject(err)
})

// 访问不需要登录的接口
const newInstance = axios.create()
```

### 请求loading

```js
// 移动端请求时经常会有一个 loading 状态
const instance_phone = axios.create({})
instance_phone.interceptors.request.use(config => {
  $('#modal').show()
  return config
})
instance_phone.interceptors.response.use(res => {
  $('#modal').hide()
  return res
})
```

### 错误处理

```js
const instance = axios.create()
instance.interceptors.request.use(config => {
  return config
}, err => { // 4开头，常见（400：not found 401：请求超时）
  $('#modal').show()
  setTimeout(() => {
    $('#modal').hide()
  }, 2000)
  return Promise.reject(err)
})

instance.interceptors.response.use(res => {
  return res
}, err => { // 5开头，常见（500：系统错误 502：系统重启）
  $('#modal').show()
  setTimeout(() => {
    $('#modal').hide()
  }, 2000)
  return Promise.reject(err)
})
```

### 取消请求

```js
const source = axios.CancelToken.source()
axios.get('/data.json', {
  cancelToken: source.token
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err) // {message: "http cancel"}
})
// 取消请求（message可选）
source.cancel('http cancel')
```

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
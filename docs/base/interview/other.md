---
title: 面试必备
lang: zh-CN
sidebarDepth: 2
---
### 大图片打包成base64字符串的缺点

大图片会导致打包后会占据较大的空间。影响页面渲染。

### stylus 和 stylus-loader

stylus是把stylus转化为css。

stylus-loader是使webpack能够理解和处理stylus类型的文件。

### in 关键字的使用

1. 数组：判断索引是否存在

```js
var arr = ['a', 'b']
0 in arr // true
2 in arr // false
'a' in arr // false
```

2. 对象：判断对象的属性是否存在

```js
var obj = {a: 1, b: 2}
a in obj // true
1 in obj // false
```

### 引入路由 router

```
可以使用 <router-view> <router-link> <keep-alive> ，提供了 $route 和 $router
```
### vue 中模板数据来源

1. data：自身数据
2. props：传入的数据
3. computed：数据来源：data/props/别的compute/state/getters

### 页面报错

1. Cannot read property 'a' of null

```js
var obj = null
obj.a // Cannot read property 'a' of null
```
2. Cannot read property 'b' of undefined 

```js
var obj = {}
obj.a.b // Cannot read property 'b' of undefined 
```
### 创建 better-scroll 实例的时机

滚动原理：子元素内容总高度超出父元素高度。

```js
// 方法一：
/*
1. 异步获取数据和页面更新完成才能创建实例
2. 利用回调函数
*/

// store
actions: {
  getGoodsInfo ({commit}, cb) {
    reqGoodsInfo().then(res => { // 发起请求
      if (res.status === 200) {
        const data = res.result
        commit('GOODS_INFO', data) // 执行 mutation
        cb && cb() // 执行回调
      }
    })
  }
}

// 页面
this.$store.dispatch('getGoodsInfo', () => { // 异步请求获取数据
  this.$nextTick(() => { // 页面数据更新完成
    new BScroll('.category') // 此处创建 better-scroll 实例
  })
})

// 方法二：
/* 通过 watch 监听数据，然后再 nextTick 中创建实例 */
watch: {
  goodList () { // 数据 goodList 已经异步获取成功
    this.$nextTick(() => {
      new BScroll('.category')
    })
  }
}
```
### 滚动的三种方式

1. 手指触摸滚动

2. 手机触摸滚动后离开产生的惯性滚动

3. 调用方法产生的滚动

### 实现css布局

```
一个div垂直居中
其距离屏幕左右两边各10px
其高度始终是宽度的50%

div中有文本'A'
其font—size:20px
文本水平垂直居中
```
```html
<style>
.wrap {
  display: flex;
  align-items: center;
  width: 400px;
  height: 400px;
  background-color: pink;
}
.box {
  position: relative;
  margin: 0 10px;
  width: 100%;
  padding: 25% 0;
  background-color: red;
}
.area {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 20px;
  background-color: skyblue;
}
</style>
</head>
<body>
  <div class="wrap">
    <div class="box">
      <div class="area">A</div>
    </div>
  </div>
</body>
```
### 类型比较

```js
if([]==false){console.log(1)}
if({}==false){console.log(2)}
if([]){console.log(3)}
if([1]==[1]){console.log(4)}
// res: 1 3
```

### 事件队列

先执行同步代码，再执行microtask，最后执行macrotask

```js
async function a1 () {
  console.log('a1 start') // 2
  await a2() // a2()会立即执行，但由于await是异步的，所以此处被阻塞，后面的代码不会执行，返回一个promise对象
  console.log('a1 end') // 9
}
async function a2 () {
  console.log('a2') // 3
}

console.log('script start') // 1

setTimeout(() => {
  console.log('setTimeout') // 10，检测微任务队列中是否存在微任务，没有执行该宏任务
}, 0)

Promise.resolve().then(() => { // 加入微任务队列1
  console.log('promise1') // 6
})

a1()

let promise2 = new Promise((resolve) => {
  resolve('promise2.then') // 加入微任务队列2
  console.log('promise2') // 4
})

promise2.then((res) => {
  console.log(res) // 7
  Promise.resolve().then(() => { // 加入微任务队列3
    console.log('promise3') // 8
  })
})
console.log('script end') // 5

/*res:
script start
a1 start
a2
promise2
script end
promise1
a1 end
promise2.then
promise3
setTimeout
*/
```
[参考](https://juejin.im/post/5c3d8956e51d4511dc72c200)

### 改正代码，输出0123401234

```js
function a () {
  for (var i = 0; i < 5; i++) {
    this.i = i
    setTimeout(function () {
      console.log(i)
    }, 0)
    console.log(this.i)
  }
}
a()
```

```js
// 方法一：闭包
function a () {
  for (var i = 0; i < 5; i++) {
    this.i = i;
    (function (i) {
      setTimeout(function () {
        console.log(i)
      }, 0)
    })(this.i)
    console.log(this.i)
  }
}

// 方法二：使用bind
function a () {
  for (var i = 0; i < 5; i++) {
    this.i = i
    setTimeout(function () {
      console.log(i)
    }.bind({i: i}), 0)
    console.log(this.i)
  }
}
```
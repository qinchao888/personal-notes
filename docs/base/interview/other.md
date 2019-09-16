---
title: 面试必备
lang: zh-CN
sidebarDepth: 2
---

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
promise2.then
promise3
a1 end
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
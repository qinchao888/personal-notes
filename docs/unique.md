---
title: 罕见特性
lang: zh-CN
sidebarDepth: 2
---

## 总结一

[摘自](https://segmentfault.com/a/1190000019364550)

### addEventListener 

参数：addEventListener(type, listener, options)

```js
element.addEventListener('click', doSomething, {
  capture: false,
  once: false,
  passive: false
});
```
capture:  Boolean，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。

once:  Boolean，表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。

passive: Boolean，设置为true时，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。

[参考MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

### scrollTo

传入ScrollToOptions对象参数，设置 behavior: 'smooth' 启用平滑滚动。

```js
window.scrollTo({
  left: 0,
  top: 1000,
  behavior: 'smooth' // 启用平滑滚动
});
```
[兼容性](https://caniuse.com/#feat=element-scroll-methods)

### setTimeout 和 setInterval

向回调函数中传入参数

```js
setTimeout(function (a, b) {
  console.log(a) // 10
  console.log(b) // 20
}, 1000, 10, 20)
```
### defaultChecked

找出默认被选中的单选按钮或复选框，即便更改选择后，defaultChecked的值也不会随之改变。

```html
<form>
  <input type="radio" value="one" name="group1"/>One
  <input type="radio" value="two" name="group1" checked/>Two
  <input type="radio" value="three" name="group1"/>Three
  <label for="box1">box1</label>
  <input type="checkbox" value="box1" id="box1"/>
  <label for="box2">box2</label>
  <input type="checkbox" value="box2" id="box2" checked/>
  <label for="box3">box3</label>
  <input type="checkbox" value="box3" id="box3"/>
</form>
```
```js
var inputList = document.getElementsByTagName('input')
for (var el of inputList) {
  if (el.defaultChecked === true) {
    console.log('当前默认选中', el.value)
  }
}
```
### normalize() 和 wholeText 

normalize()：合并单独的文本节点。

wholeText：相邻的节点的所有文本。

```html
<p id="el">This is default text</p>
```

```js
let el = document.getElementById('el');
el.appendChild(document.createTextNode(' new text'));
console.log(el.childNodes.length); // 2

// 操作一
el.normalize()
console.log(el.childNodes.length); // 1

// 操作二
console.log(el.childNodes[0].wholeText); // This is default text new text
console.log(el.childNodes[1].wholeText); // This is default text new text
console.log(el.childNodes.length); // 2
```
注：

1. 必须在文本节点上调用wholeText，而不是在元素上调用。因此 el.childNodes[0] 和 el.childNodes[1] 均可以正常工作。

2. 文本节点必须相邻，不能被 HTML 分隔。
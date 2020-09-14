---
title: React基础
lang: zh-CN
sidebarDepth: 2
---

## react

### JSX语法优势

1. 编译成JavaScript进行了优化。
2. 类型是安全的，在编译时就能发现错误。
3. 类似编写html的方式，使得编写模板更加快速。

### 触发 render 的三种方式

1. setState 改变状态的值。
2. 改变props的值。
3. 使用forceUpdate()方法。

### 条件渲染的方式

1. 使用变量结合 if else。
2. 使用 &&。
3. 使用三目运算符。
4. 使用 null 阻止组件渲染

```js
// 1
render () {
  let button =  null
  if (this.state.val) {
    button = <Test1/>
  } else {
    button = <Test2/>
  }
  return (
    <div>
      button
    </div>
  );
}

// 2
render () {
  return (
    <div>
      <h1>hello</h1>
      {val > 0 && <h1>world</h1>}
    </div>
  )
}

// 3
render () {
  return (
    <div>
      <h1>hello</h1>
      {val > 0 ? <h1>val</h1> : <h1>world</h1>}
    </div>
  )
}

// 4
function Message (props) {
	if (props.val === 1) {
		return null
	}
	return <h1>success</h1>
}

ReactDOM.render(
  <div>
    <Message val={1} />
  </div>,
  document.getElementById('example')
);
```

## redux

### action

store 数据的唯一来源。

### reducer

指定了应用状态的变化如何响应 actions 并发送到 store 的。

reducer中只单纯执行计算，不修改传入参数，不进行API 请求和路由跳转，调用非纯函数，如 Date.now() 或 Math.random()。

### store

将action、store、state关联到一起。

```
提供 getState() 方法获取 state；
提供 dispatch(action) 方法更新 state；
通过 subscribe(listener) 注册监听器;
通过 subscribe(listener) 返回的函数注销监听器。
```
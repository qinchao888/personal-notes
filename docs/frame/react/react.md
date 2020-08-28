---
title: React基础
lang: zh-CN
sidebarDepth: 2
---

:::tip

1. react 组件名必须以大写字母开头，形如：HelloMessage。
2. react 事件名使用驼峰命名。使用e.preventDefault()阻止默认行为。

:::

## 基础知识

```html
<!-- style写法1 -->
style={{backgroundColor: 'red'}}

<!-- style写法2 -->
style={{'background-color': 'red'}}

<!-- 错误写法1 -->
style={{'backgroundcolor': 'red'}}

<!-- 错误写法2 -->
style={{background-color: 'red'}}
```

### 注释

1. 在标签内部的注释需要花括号。
2. 在标签外的的注释不能使用花括号。

```js
ReactDOM.render(
  /*注释 */
  <h1>hello world {/*注释*/}</h1>,
  document.getElementById('example')
);
```

### JSX 允许在模板中插入数组，数组会自动展开所有成员

```html
<script type="text/babel">
  var arr = [1, 2];
  ReactDOM.render(
    <div>{arr}</div>,
    document.getElementById('example')
  );
</script>

<!-- 等价于 -->
<script type="text/babel">
  ReactDOM.render(
    <div>{12}</div>,
    document.getElementById('example')
  );
</script>
```

### 默认 Props

通过组件类的 defaultProps 属性为 props 设置默认值。

```js
class HelloMessage extends React.Component {
  static defaultProps = { // 等价于 HelloMessage.defaultProps = { name: 'Runoob' }
  	name: 'world'
  }
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}
```

### Props 验证

```js
class MyTitle extends React.Component {
  static propTypes = {
  	title: PropTypes.string // 属性 title 是必须的且是字符串，非字符串类型会自动转换为字符串
    name: PropTypes.string.isRequired // name为必填项
  }
  render() {
    return (
      <h1>Hello, {this.props.title}</h1>
    );
  }
}
```

### 事件传参

```html
<!-- 方式一 -->
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>

<!-- 方式二 -->
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
<!-- 通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面 -->
```

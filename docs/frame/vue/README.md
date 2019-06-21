---
title: Vue基础
lang: zh-CN
sidebarDepth: 2
---
## 总结

::: tip
（1）vue的{{}}中支持单个表达式，但不支持语句。

（2）不要对用户输入的内容使用插值，原因可能会造成xss攻击。

（3）指令的作用：当绑定的表达式的值改变时，产生的影响响应式的作用于DOM。

（4）在{{}}中进行的复杂逻辑运算应该使用计算属性computed指定，然后引入到页面中。优点：便于维护。

（5）当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS 属性时，如 transform，vue.js 会自动侦测并添加相应的前缀

（6）methods方法中接受的event对象是原生的DOM对象，显式的传入event对象使用变量$event。

```vue
<button @click="warn('this is a warning', $event)">warning</button>

warn: function(msg, e) {
    alert(msg + e.target.tagName);
}
```
（7）$attrs：用来获取在子元素中没有注册的prop值。

```js
<use-attr name="use-attr" value="1996"></use-attr>

Vue.component('use-attr',{
    props: ['value'],
    template:
     `
    <div>
        <h3>{{ value }}</h3>
        <h4>{{ $attrs.name }}</h4>
    </div>
    `
});
```
（8）当有相同标签名的元素切换时，需要通过 key 特性设置唯一的值来标记以让 Vue 区分它们，否则 Vue 为了效率只会替换相同标签内部的内容。

（9）在现代 UI 开发中，我们已经发现相比于把代码库分离成三个大的层次并将其相互交织起来，把它们划分为松散耦合的组件再将其组合起来更合理一些。在一个组件里，其模板、逻辑和样式是内部耦合的，并且把他们搭配在一起实际上使得组件更加内聚且更可维护。

（10）Vue 中的 data 中定义的属性名与 methods 中定义的方法名不能一致，否则会报错。

```js
// 例：
data () {
  change: 1
},
methods: {
  change: function () {
    this.change += 1
    // 此处的this.change，vue无法判断其为一个函数还是一个属性
  }
}
```
（11）Vue在进行嵌套路由切换时，切换子路由时，子组件内容和父组件内容显示在同一个页面上，但此时子组件并不会触发父组件的重新渲染(即父组件的 created，mounted 等方法不会被再次调用)。

（12）元素选择器应该避免在 scoped 中出现。

原因：在vue中大量的元素和特性组合的选择器 (比如 button[data-v-f3f3eg9]) 会比类和特性组合的选择器慢。

（13）如果一组 v-if + v-else 的元素类型相同，最好使用 key (比如两个\<div> 元素)。

目的：保证每次都是重新渲染，而不是复用上次的元素。

```html
<div v-if="error" key="search-status">错误：{{ error }}</div>
<div v-else key="search-results">{{ results }}</div>
```
（14）避免同时使用 v-if 和 v-for

<p class="fg_th">当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。</p>

```vue
// 过滤列表的正确做法
computed: {
  activeUsers: function () {
    return this.users.filter(function (user) {
      return user.isActive
    })
  }
}
<ul><li v-for="user in activeUsers" :key="user.id">{{ user.name }}</li></ul>
```
（15）组件的 data 必须是一个函数。

目的：使所有组件实例内部的data数据与其它实例相对独立。

```js
// 例外：
// 根实例(只存在一个)
new Vue({
  data: {
    foo: 'bar'
  }
})
```
（16）vue中在父组件中定义的key值不会被子组件继承。

```js
// 父组件
...
<child key="child" name="child"></child>
...
// 子组件
<div ref="child">
  <p>this is child</p>
</div>
mounted () {
  let child = this.$refs.child
  let attr = child.attributes // 获取所有属性对象[NamedNodeMap]
  console.log('attr', attr)
}
```
（17）this.$nextTick 和 setTimeout 的执行时机

this.$nextTick 执行在 setTimeout 之前
```js
new Vue({
  el: '#app',
  data: {
    value: 11
  },
  mounted () {
    this.value = 22
    setTimeout(() => {
      console.log('2')
    })
    this.$nextTick(function () {
      console.log('1')
    })
  }
})
```
（18）
:::

### 创建根实例

```js
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  created () {
    ...
  }
})

// 等价于
new Vue({
  el: '#app',
  render: h => h(App),
  created () {
    ...
  }
})

// render: h => h(App) 即为
render: function (createElement) {
    return createElement(App);
}
```
（19）插值 {{}} 中为null或undefined时不渲染。
### 多重值

常用于提供多个带前缀的值。

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
// 只会渲染数组中最后一个被浏览器支持的值。
```
### 获取全局注册的过滤器

```js
// utils/filter.js （注册）
import Vue from 'vue'
Vue.filter('formatAmount', function (val) { // '分'转为'元',有小数保留两位,删除尾数0
  return Number(val) === 0 ? 0 : parseFloat((val / 100).toFixed(3))
})

// main.js （获取）
...
import utils/filter.js
console.log(Vue.filter('formatAmount'))
// 局部注册的filters无法获取
```
::: warning 注意
filters中不支持传递当前的this，不能传递data中定义的数据。即filters中的数据不应该跟上下文有关系。
:::

### methods 和 computed 的区别

每次页面数据发生改变时都会重新执行methods方法，而computed属性是基于依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。不必再次执行函数。

### computed 和 watch 的使用

如果一个值依赖多个属性（多对一），用computed肯定是更加方便的。如果一个值变化后会引起一系列操作，或者一个值变化会引起一系列值的变化（一对多），用watch更加方便一些。

<p class="fg_t">watch 和 computed 参数分析：</p>

#### watch: 两个参数 

 newVal：新值 | oldVal：旧值

#### computed: 一个参数(为当前的this)

```js
watch: {
  newName: function (newVal, oldVal) {
    ...
  }
}
computed: {
  newName: function (obj) {
    console.log(this === obj) // true
  }
}
```

### v-if 和 v-show 指令

1. 带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS 属性 display。

2. v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

3. 一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

4. v-show 不支持 \<template> 元素

### class 和 style 用法

```html
<p :style="{color: 'red', 'font-size': '24px'}">pppp</p>
<!--或-->
<p :style="{color: 'red', fontSize: '24px'}">pppp</p>

<!--vue文件中静态属性-->
<p style="color:red;font-size:24px;">pppp</p>
<!--或-->
<p style="color:red;fontSize:24px;">pppp</p>
<!--html文件中不支持驼峰式css属性名-->
```
::: tip 注：
style 中使用的CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用单引号括起来) 来命名。
:::

### vue 过渡和动画

使用 transition 指定多个过渡名称。
```
/*方法一*/
.loading-enter, .loading-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
.loading-enter-active, .loading-leave-active {
  transition: transform 3s, opacity 3s;
}

/*方法二*/
.loading-enter-active, .loading-leave-active {
  transition-property: transform opacity;
  transition-duration: 2s;
}
```
### $data

获取 data 中的数据：

```vue
new Vue({
  data () {
    obj: {
      a: 1
    }
  }
})
...
data () {
  return {
    list: {
      b: 2
    }
  }
}
...
console.log(this.list === this.$data.list) // true
console.log(this.$root.obj === this.$root.$data.obj) // true
```

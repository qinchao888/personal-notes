---
title: Vue高级
lang: zh-CN
sidebarDepth: 2
---

## 生命周期

### 生命周期钩子

生命周期钩子：<span class="fg_t_i">beforeCreate  created  beforeMount  mounted  beforeUpdate  updated  activated  deactivated  beforeDestroy  destroyed  errorCaptured</span>

::: warning 注意
所有的生命周期钩子自动绑定this上下文到实例中，因此不能使用箭头函数来定义一个生命周期方法。
:::
如：

```js
created: () => this.fetchTodos()
//因为箭头函数绑定了父上下文，因此 this 与你期待的 Vue 实例不同，this.fetchTodos 的行为未定义。
```

```js
beforecreated：el 和 data 并未初始化 
created:完成了 data 数据的初始化，el没有
beforeMount：完成了 el 和 data 初始化 
mounted ：完成挂载
```

```js
beforecreate : 举个栗子：可以在这加个loading事件 
created ：在这结束loading，还做一些初始化，实现函数自执行 
mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情
beforeDestroy： 你确认删除XX吗？ destroyed ：当前组件已被删除，清空相关内容
```

```js
el:提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。

在实例挂载之后，元素可以用 vm.$el 访问。

如果在实例化时存在这个选项，实例将立即进入编译过程，否则，需要显式调用 vm.$mount() 手动开启编译。
```

### mixin extend 的执行时机

```js
const ex = {
  beforeCreate () {
    console.log('extend-beforeCreated')
  },
  created () {
    console.log('extend-created')
  },
  mounted () {
    console.log('extend-mounted')
  }
}
const mi = {
  beforeCreate () {
    console.log('mixin-beforeCreated')
  },
  created () {
    console.log('mixin-created')
  },
  mounted () {
    console.log('mixin-mounted')
  }
}
new Vue({
  el: '#app',
  extends: ex,
  mixins: [mi],
  beforeCreate () {
    console.log('beforeCreated')
  },
  created () {
    console.log('created')
  },
  mounted () {
    console.log('mounted')
  }
})  
/*
extend-beforeCreated
mixin-beforeCreated
beforeCreated
extend-created
mixin-created
created
extend-mounted
mixin-mounted
mounted 
先执行 extend 再执行 mixin */
```

### extend 和 mixin 的区别

1. Vue.extend用于创建vue实例
2. mixins可以混入多个mixin，extends只能继承一个
3. 优先级Vue.extend>extends>mixins

```js
const ex = {
  data: function () {
    return {
      name: 'extend'
    }
  }
}
const mi = {
  data: function () {
    return {
      name: 'mixin'
    }
  }
}
new Vue({
  el: '#app',
  extends: ex,
  mixins: [mi],
  data: {
    name: 'root'
  },
  mounted () {
    console.log('name', this.name) // root
    console.log('ex', this.$options.extends.data().name) // extend
    console.log('mi', this.$options.mixins[0].data().name) // mixin
  }
})
```
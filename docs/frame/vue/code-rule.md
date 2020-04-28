---
title: Vue编码规范
lang: zh-CN
sidebarDepth: 2
---

::: tip 命名规则
1. 驼峰命名法（Camel Case）

小驼峰命名法（Lower Camel Case）：第一个单词的首字母小写；第二个单词开始每个单词的的首字母大写。例如：firstName、lastName。

大驼峰命名法（Upper Camel Case：每一个单词的首字母都大写。例如：FirstName、LastName、CamelCase。也被称为 Pascal 命名法（Pascal Case）

2. kebab-case（短横线命名）。
:::

## 名称

:::tip
<p class="fg_t">组件名应该始终是多个单词的，根组件 App 除外。</p>

目的：避免跟现有的以及未来的HTML元素相冲突，因为所有的 HTML元素名称都是单个单词的。
:::

### 组件名

组件名应该采用 PascalCase，使用 Vue.component 进行全局组件注册时，可以使用 kebab-case 字符串。

```js
Vue.component('MyComponent', {
  // ...
})
Vue.component('my-component', {
  // ...
})
import MyComponent from './MyComponent.vue'
export default {
  name: 'MyComponent',
  // ...
}
```
在DOM中使用时只有 kebab-case 是有效的

```vue
<!--局部组件-->
<template>
  <my-component></my-component>
  <MyComponent></MyComponent> <!--可行,不会报错-->
  <myComponent></myComponent> <!--可行,不会报错-->
  <myComponent></mycomponent> <!--可行,不会报错-->
  <MyComponent></mycomponent> <!--可行,不会报错-->
  <My-Component></My-Component> <!--可行,不会报错-->
  <My-component></My-component> <!--可行,不会报错-->
  <my-component></MyComponent> <!--报错,解析失败-->
  <Mycomponent></Mycomponent> <!--无效-->
  <mycomponent></mycomponent> <!--无效-->
</template>
<script>
import MyComponent from '@/components/MyComponent'
export default {
  components: {
    MyComponent
  }
}
</script>

<!--全局组件-->
<template>
  <div>
    <my-component></my-component> <!--可行,不会报错-->
    <MyComponent></MyComponent> <!--可行,不会报错-->
    <!--同上-->
  </div>
</template>
<script>
Vue.component('MyComponent', {
  template: '<div>111</div>'
})
</script>
```
::: tip 解析机制
标签名全部转化为小写，非首字母大写的转化为短横线( - )。
:::
### 组件文件名

```js
components/
|- MyComponent.vue

// 或

components/
|- my-component.vue
```
### 自定义事件名

采用kebab-case，短横线分隔。

```js
<button v-on:click="$emit('enlarge-text')">
  Enlarge text
</button>

<blog-post
  ...
  v-on:enlarge-text="postFontSize += 0.1"
></blog-post>
```

### 单例组件名

以 The 为前缀命名。

每个页面只使用一次，不接受任何 prop。

```js
components/
|- TheHeading.vue
|- TheSidebar.vue
```
### props的命名

在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case。

```js
props: {
  greetingText: String
}

<WelcomeMessage greeting-text="hi"/>
```
### 自闭合组件命名

```js
<!-- 在单文件组件、字符串模板和 JSX 中 -->
<MyComponent/>

<!-- 在 DOM 模板中 -->
<my-component></my-component>
```
在单文件组件和字符串模板中组件名应该总是 PascalCase 的——但是在 DOM 模板中总是 kebab-case 的或在所有的地方都使用 kebab-case。

## eslint

@vue/cli@3.0.5

```js
// package.json
"rules": {
  "prettier/prettier": [
    "error",
    {
      "tabWidth": 2,
      "semi": false, // 行尾不需要分号
      "singleQuote": true, // 使用单引号
      "trailingComma": "es5", // 行尾需要逗号
      "htmlWhitespaceSensitivity": "ignore"
    }
  ]
},
```
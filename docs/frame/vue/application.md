---
title: Vue开发技巧
lang: zh-CN
sidebarDepth: 2
---

## input

### 输入框禁止输入非数字

```html
<body>
  <div id="app">
    <input v-model="value"/>
  </div>
</body>
<script>
new Vue({
  el: '#app',
  data: {
    value: ''
  },
  watch: {
    value (val) {
      if (/\D/.test(val)) {
        this.value = val.replace(/\D/g, '')
      }
    }
  },
})
</script>
```
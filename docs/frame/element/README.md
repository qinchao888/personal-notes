---
title: Element
lang: zh-CN
sidebarDepth: 2
---
## 基础总结

### DatePicker 日期选择器

需求：选择的结束日期必须 >= 当前的开始日期

```vue
<template>
  <div>
    <el-date-picker v-model="startTime" type="datetime" placeholder="开始时间">
    </el-date-picker>
    <el-date-picker v-model="endTime" type="datetime" placeholder="结束时间" :picker-options="endPickerOptions">
    </el-date-picker>
  </div>
</template>
<script>
let prevTime = ''
export default {
  data() {
    return {
      endPickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date(prevTime);
        }
      },
      startTime: '',
      endTime: ''
    };
  },
  watch: {
    startTime: function () {
      prevTime = this.startTime
    }
  }
};
</script>
```
### Select 选择器

需求：默认显示列表的第一条数据，而不是显示请选择。

只需将 v-model 绑定的值和列表第一条数据的 value值设置一致即可。 

```html
<el-select v-model="value" placeholder="请选择">
  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
  </el-option>
</el-select>
```
```js
export default {
  data() {
    return {
      options: [{
          value: '',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
    };
  }
};
```
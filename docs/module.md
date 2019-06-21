---
title: HTML
lang: zh-CN
---
# 目录
[[toc]]

## 目录一
### 子目录一
#### 子目录一
##### 子目录一
###### this is html1

| Tables        | Are           | Cool
|:-------------:|---------------|------:
| col 3 is      | right-aligned | $1600
| col 2 is      | centered      | $12
| zebra stripes | are neat      | $1    

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: danger DANGER
This is dangerous
:::

``` js
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## 目录二
### 子目录一
###### this is html2

<<< @\docs\base\html\iscroll\scroll.html

<span v-for="i in 3">{{ i }} </span>

{{ $page }}

{{ $page.frontmatter }}

:::v-pre
`{{ This will be displayed as-is }}`
:::

<Test/>

# test <Test/>
# test `<Test/>`

### Badge <Badge text="beta" type="warn"/> <Badge text="0.10.1+"/>
### Error <Badge text="error" type="error"/>
### Middle <Badge text="tips" vertical="middle"/>

### [baidu](https://www.baidu.com/)

### <a href="https://www.baidu.com/" target="_blank">baidu</a><OutboundLink/>
---
title: loader
lang: zh-CN
sidebarDepth: 2
---

## css-loader

npm install css-loader style-loader --save-dev

### 处理css文件

```js
...
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }
  ]
}
```

## file-loader

npm install file-loader --save-dev

### 处理图片

```js
module: {
  rules: [
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    }
  ]
}
```

### 加载字体

```js
module: {
  rules: [
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    }
  ]
}
```

## csv-loader

npm install csv-loader --save-dev

### 处理 CSV、TSV

```js
module: {
  rules: [
    {
      test: /\.(csv|tsv)$/,
      use: [
        'csv-loader'
      ]
    }
  ]
}
```

## xml-loader

npm install xml-loader --save-dev

### 处理 XML 文件

```js
module: {
  rules: [
    {
      test: /\.xml$/,
      use: [
        'xml-loader'
      ]
    }
  ]
}
```
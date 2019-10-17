---
title: angular基础
lang: zh-CN
sidebarDepth: 2
---

## angular语法

### angular中的controller和directive的区别

前一个是你用 ng-controller指令划分了视图中的一部分为controller的作用域（scope），后一种则是以指令作用域为界线的controller,两者作用基本一致，只是作用域不同

### Angular中依赖注入方式的几种写法

1.第一种写法

```js
angular.module(‘App’).controller(‘TestCtrl’,[‘$scope’, function($scope) {}]);
```
2.第二种写法

```js
angular.module(‘App’).controller(‘TestCtrl’,TestCtrl);
TestCtrl.$inject= [‘$scope’];
function TestCtrl($scope) {}
```
3.第三种写法

```js
angular.module(‘App’).controller(‘TestCtrl’,TestCtrl);
function TestCtrl($scope) {};
```

### directive中的参数使用数组的方式

```js
angular.module('App').directive('navSidebar', ['$state', 'NAVLIST', ($state, NAVLIST) => {
return {
    restrict: 'A',
    transclude: true,
    controller: sidebarCtrl,
    controllerAs: 'vm',
    templateUrl: 'app/directives/nav-sidebar/template.html'
};
```
1. 第一个和第二个参数表示需要引用的变量，函数中的参数为形参，和前面的参数一一对应，参数名可以随意命名。
2. 函数中的参数名称必须提供，否则无法接受引用的变量。
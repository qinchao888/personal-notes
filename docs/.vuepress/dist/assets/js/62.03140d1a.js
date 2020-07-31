(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{282:function(a,t,r){"use strict";r.r(t);var v=r(28),s=Object(v.a)({},(function(){var a=this,t=a.$createElement,r=a._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[r("h2",{attrs:{id:"模块化"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#模块化"}},[a._v("#")]),a._v(" 模块化")]),a._v(" "),r("h3",{attrs:{id:"commonjs"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#commonjs"}},[a._v("#")]),a._v(" CommonJS")]),a._v(" "),r("p",[a._v("核心思想：通过 require 同步加载依赖。通过 module.exports 暴露接口。")]),a._v(" "),r("h4",{attrs:{id:"优点"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#优点"}},[a._v("#")]),a._v(" 优点")]),a._v(" "),r("ol",[r("li",[a._v("代码可复用于 Node.js 环境下井运行，例如做同构应用。")]),a._v(" "),r("li",[a._v("通过Npm发布的很多第三方模块都采用了 CommonJS规范。")])]),a._v(" "),r("h4",{attrs:{id:"缺点"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#缺点"}},[a._v("#")]),a._v(" 缺点")]),a._v(" "),r("p",[a._v("代码无法直接在浏览器环境中运行，需要通过工具转换成标准的 ES5。")]),a._v(" "),r("h3",{attrs:{id:"amd"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#amd"}},[a._v("#")]),a._v(" AMD")]),a._v(" "),r("p",[a._v("采用异步的方式加载依赖的模块，代表的实现：requirejs。")]),a._v(" "),r("h4",{attrs:{id:"优点-2"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#优点-2"}},[a._v("#")]),a._v(" 优点")]),a._v(" "),r("ol",[r("li",[a._v("可异步加载依赖。")]),a._v(" "),r("li",[a._v("可并行加载多个依赖。")]),a._v(" "),r("li",[a._v("代码可运行在浏览器环境和Node.js环境。")])]),a._v(" "),r("h4",{attrs:{id:"缺点-2"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#缺点-2"}},[a._v("#")]),a._v(" 缺点")]),a._v(" "),r("p",[a._v("JavaScript运行环境没有支持原生的AMD环境，需要导入AMD库才能正常使用。")]),a._v(" "),r("h2",{attrs:{id:"前端构建"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#前端构建"}},[a._v("#")]),a._v(" 前端构建")]),a._v(" "),r("ol",[r("li",[a._v("代码转换：将TypeScript编译成JavaScript，SCSS编译成CSS等。")]),a._v(" "),r("li",[a._v("文件优化：压缩JavaScript、CSS、HTML代码，压缩合并图片等。")]),a._v(" "),r("li",[a._v("代码分割：提取多个页面的公共代码，提取首屏不需要执行的代码，让其异步加载。")]),a._v(" "),r("li",[a._v("模块合并：将多个模块文件合并成一个文件。")]),a._v(" "),r("li",[a._v("自动刷新：监听本地源码的变化，自动重新构建，刷新浏览器。")]),a._v(" "),r("li",[a._v("代码校验：校验代码是否符合规范。")]),a._v(" "),r("li",[a._v("自动发布：更新代码后，自动构建出线上发布代码并传输给发布系统。")])]),a._v(" "),r("h2",{attrs:{id:"webpack配置"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#webpack配置"}},[a._v("#")]),a._v(" webpack配置")]),a._v(" "),r("h3",{attrs:{id:"总结"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[a._v("#")]),a._v(" 总结")]),a._v(" "),r("ol",[r("li",[a._v("若想让源文件加入构建流程中被webpack控制，则配置 entry。")]),a._v(" "),r("li",[a._v("若想自定义输出文件的位置和名称，则配置 output。")]),a._v(" "),r("li",[a._v("若想自定义寻找依赖模块时的策略，则配置 resolve。")]),a._v(" "),r("li",[a._v("若想自定义解析和转化文件的策略，则配置 module.rules 中的 Loader")])])])}),[],!1,null,null,null);t.default=s.exports}}]);
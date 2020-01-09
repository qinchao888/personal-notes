(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{186:function(s,t,a){"use strict";a.r(t);var n=a(0),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"常见用法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常见用法"}},[s._v("#")]),s._v(" 常见用法")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://segmentfault.com/a/1190000021158037",target:"_blank",rel:"noopener noreferrer"}},[s._v("参考1"),a("OutboundLink")],1),s._v(" "),a("a",{attrs:{href:"https://segmentfault.com/a/1190000016841971",target:"_blank",rel:"noopener noreferrer"}},[s._v("参考2"),a("OutboundLink")],1)]),s._v(" "),a("h3",{attrs:{id:"查看hover后出现的元素样式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查看hover后出现的元素样式"}},[s._v("#")]),s._v(" 查看hover后出现的元素样式")]),s._v(" "),a("p",[s._v("先打开调试 -> hover当前元素 -> 右键弹出弹框，不点击鼠标 -> 鼠标移动至调试面板（elements）-> 按下N键会自动定位到当前hover的元素")]),s._v(" "),a("h3",{attrs:{id:"console-table"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#console-table"}},[s._v("#")]),s._v(" console.table")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" arr "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'aa'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" age"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("table")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("arr"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 浏览器的console中将以table的形式显示arr")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("h3",{attrs:{id:"document-body-contenteditable"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#document-body-contenteditable"}},[s._v("#")]),s._v(" document.body.contentEditable")]),s._v(" "),a("p",[s._v("在浏览器的console中设置 document.body.contentEditable = true，整个浏览器中的内容将可以被编辑。")]),s._v(" "),a("p",[s._v('或设置 document.designMode=\'on\';（控制整个文档是否可编辑。有效值为 "on" 和 "off" 。根据规范，该属性默认为 "off" 。）')]),s._v(" "),a("h3",{attrs:{id:"选择dom元素"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#选择dom元素"}},[s._v("#")]),s._v(" 选择DOM元素")]),s._v(" "),a("p",[s._v("Chrome控制台输入：")]),s._v(" "),a("ol",[a("li",[s._v("$(selector)：返回匹配指定CSS选择器的DOM元素的第一个引用，相当于document.querySelector()函数。")]),s._v(" "),a("li",[s._v("$$(selector)：返回匹配指定CSS选择器的DOM元素数组，相当于document.querySelectorAll()函数。")]),s._v(" "),a("li",[s._v("$x(path)：返回一个与给定XPath表达式匹配的DOM元素数组。")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("例：$x('//p[a]')表示返回包含<a>元素的所有<p>元素。\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"获取console中前一个输出的值"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#获取console中前一个输出的值"}},[s._v("#")]),s._v(" 获取console中前一个输出的值")]),s._v(" "),a("p",[s._v("使用 _$获取。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// -> 10")]),s._v("\n\n$_ "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// -> 10")]),s._v("\n\n$_ "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" $_ "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// -> 100")]),s._v("\n\nMath"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sqrt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("$_"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// -> 10")]),s._v("\n\n$_ "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// -> 10")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br")])]),a("h3",{attrs:{id:"获取dom元素上注册的监听器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#获取dom元素上注册的监听器"}},[s._v("#")]),s._v(" 获取DOM元素上注册的监听器")]),s._v(" "),a("p",[s._v("使用 getEventListeners($('selector'))")]),s._v(" "),a("h3",{attrs:{id:"监听dom元素上注册的监听器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#监听dom元素上注册的监听器"}},[s._v("#")]),s._v(" 监听DOM元素上注册的监听器")]),s._v(" "),a("p",[s._v("使用  monitorEvents($('selector'))")]),s._v(" "),a("ol",[a("li",[s._v("monitorEvents($('selector')): 监听所有事件。")]),s._v(" "),a("li",[s._v("monitorEvents($('selector'), 'eventName'): 监听特定的事件。")]),s._v(" "),a("li",[s._v("monitorEvents($('selector'), [eventName1, eventName2, ...]): 监听多个事件。")]),s._v(" "),a("li",[s._v("unmonitorEvents($('selector')): 停止监视选择器匹配的元素关联的所有事件。")])]),s._v(" "),a("h3",{attrs:{id:"检查dom元素"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#检查dom元素"}},[s._v("#")]),s._v(" 检查DOM元素")]),s._v(" "),a("p",[s._v("使用inspect()方法让我们可以直接从控制台中检查一个DOM元素。")]),s._v(" "),a("p",[s._v("inspect($('selector'))：将检查与选择器匹配的元素，并且会自动跳转到Chrome Developer Tools的Elements选项卡中。即跳转到指定位置的元素中。")]),s._v(" "),a("h3",{attrs:{id:"标记dom元素"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#标记dom元素"}},[s._v("#")]),s._v(" 标记DOM元素")]),s._v(" "),a("p",[s._v("在 Elements 中点击想要选择的DOM元素，控制上输入 $0 即可获取刚才点击的DOM元素。")]),s._v(" "),a("ol",[a("li",[s._v("Chrome 检测器会保留其历史记录中的最后 5 个元素，即只有最后点击的 5个元素能够被获取到。")]),s._v(" "),a("li",[s._v("第一个点击的使用 $4 获取，最后一次点击的使用 $0 获取。")]),s._v(" "),a("li",[s._v("只有 $0、$1、$2、$3、$4 是有效的。")])]),s._v(" "),a("h3",{attrs:{id:"获取函数的堆栈跟踪信息"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#获取函数的堆栈跟踪信息"}},[s._v("#")]),s._v(" 获取函数的堆栈跟踪信息")]),s._v(" "),a("p",[s._v("使用 console.trace() 追踪。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("f1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("f2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("f2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("f3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("f3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("trace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'哈哈哈'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("f1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/**\nconsole.trace\nf3 @ (index):84\nf2 @ (index):81\nf1 @ (index):78\n(anonymous) @ (index):87\n*/")]),s._v("\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br")])]),a("h3",{attrs:{id:"console-log的格式化打印"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#console-log的格式化打印"}},[s._v("#")]),s._v(" console.log的格式化打印")]),s._v(" "),a("ol",[a("li",[s._v("%s：字符串占位符")]),s._v(" "),a("li",[s._v("%d：整数占位符")]),s._v(" "),a("li",[s._v("%f：浮点数占位符")]),s._v(" "),a("li",[s._v("%o：对象占位符(注意是字母o，不是数字0)")]),s._v(" "),a("li",[s._v("%c：CSS样式占位符")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'%c%s%s%s'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'color: yellow;'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'–'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1234")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'–'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'%c%s%s%s'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'color: skyblue;background-color:pink'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'–'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1234")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'–'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("h3",{attrs:{id:"监听函数的调用和函数参数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#监听函数的调用和函数参数"}},[s._v("#")]),s._v(" 监听函数的调用和函数参数")]),s._v(" "),a("p",[s._v("在 Chrome 控制台中，可以使用 monitor() 监听指定函数，每次调用该函数时，都会对传入的参数值进行记录。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("f")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" b")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("monitor")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("f"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("f")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// function f called with arguments: 1, 2")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 3")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("h3",{attrs:{id:"使用调试工具截屏"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用调试工具截屏"}},[s._v("#")]),s._v(" 使用调试工具截屏")]),s._v(" "),a("p",[s._v("mac： alt + command + i 打开调试")]),s._v(" "),a("p",[s._v("使用快捷键：command + shift + p 输入 screenshot")]),s._v(" "),a("p",[s._v("当前区域截图：选择 Capture area screenshot")]),s._v(" "),a("p",[s._v("长截图：选择 Capture full size screenshot")])])}),[],!1,null,null,null);t.default=e.exports}}]);
module.exports = {
  title: '前端知识总结',
  description: '我的个人网站',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置
  markdown: {
    anchor: {
      permalinkSymbol: '#'
    },
    lineNumbers: true, // 代码块显示行号
    toc: {
      includeLevel: [2, 3]
    }
  },
  themeConfig: {
    nav:[ // 导航栏配置
      {
        text: '基础', 
        items: [
          {text: 'HTML', link: '/base/html/'},
          {text: 'Css', link: '/base/css/'},
          {text: 'JS', link: '/base/js/'},
          {text: '汇总', link: '/base/interview/'},
      ]},
      {
        text: '框架',
        items: [
          {text: 'Vue', link: '/frame/vue/'},
          {text: 'Vue Router', link: '/frame/vue-router/'},
          {text: 'VueX', link: '/frame/vuex/'},
          {text: 'React', link: '/frame/react/'},
          {text: 'Element', link: '/frame/element/'},
          {text: 'Node', link: '/frame/node/'},
          {text: '小程序', link: '/frame/miniprogram/'},
          {text: 'Angular1.6', link: '/frame/angular/'},
          {text: 'mysql', link: '/frame/mysql/'},
          {text: 'typescript', link: '/frame/typescript/'},
          {text: 'axios', link: '/frame/axios/'},
          {text: 'redis', link: '/frame/redis/'},
          {text: 'shell', link: '/frame/shell/'}
        ]
      },
      {
        text: '工具',
        items: [
          { text: 'Chrome', link: '/tools/chrome/' },
          { text: 'NPM', link: '/tools/npm/' },
          { text: 'Git', link: '/tools/git/' },
          { text: 'Webpack', link: '/tools/webpack/' },
          { text: 'Mac', link: '/tools/mac/' },
          {text: 'nginx', link: '/tools/nginx/'},
          {text: 'js-sdk', link: '/tools/js-sdk/'},
          {text: 'vscode', link: '/tools/vscode/'}
        ]
      },
      {
        text: '其它',
        items: [
          { text: '配置', link: '/other/setting/' },
          { text: '阅读', link: '/other/read/' },
          { text: '安全', link: '/other/safety/' },
          { text: '学习', link: '/other/study/' },
          { text: '计算机网络', link: '/other/internet/'},
          { text: '博客', link: 'https://blog.csdn.net/greybearchao' },
        ]
      },
      // {text: 'HTML', link: '/html/' },
      // {text: 'Css', link: '/css/' },
      // {text: 'JS', link: '/js/' },
      // {text: 'Vue', link: '/vue/'},
    ],
    // sidebar: 'auto', // 侧边栏配置
    // sidebarDepth: 2, // 侧边栏显示2级
    // sidebar: [
    //   ['../html/', 'Explicit link text']
    // ]
    // sidebar: [
    //   '../html/',
    //   '../css/',
    //   '../js/'
    // ],
    // displayAllHeaders: true
    sidebar: { // 多md文件配置
      // '/': [
      //   ['/base/html/', 'HTML'],
      //   ['/base/css/', 'Css'],
      //   ['/base/js/', 'JS'],
      //   ['/frame/vue/', 'Vue'],
      //   ['/frame/react/', 'React'],
      //   ['/tools/git/', 'Git'],
      //   ['/tools/webpack/', 'Webpack'],
      // ],
      '/base/html/' : [
        ['', '基础汇总'],
        ['tag', '标签用法'],
        ['canvas', 'canvas'],
        ['test1', '我是标题2']
      ],
      '/base/js/': [
        ['', 'JS'],
        ['study', '基础学习'],
        ['base', '知识汇总'],
        ['reg', '正则'],
        ['es6', 'ES6'],
        ['websocket', 'websocket'],
        ['practise', '练习'],
        ['leetcode', '算法']
      ],
      '/base/interview/': [
        ['', '汇总'],
        ['necessary', '总结'],
        ['example', '算法'],
        ['company', '公司面试题'],
        ['other', '其他']
      ],
      '/tools/chrome/': [
        ['', '调试工具']
      ],
      '/tools/npm/': [
        ['', '总结'],
      ],
      '/tools/git/': [''],
      '/tools/mac/': [''],
      '/tools/webpack/': [
        ['', 'vue环境构建'],
        ['loader', 'loader'],
        ['plugin', 'plugin'],
        ['webpack', '基础知识']
      ],
      '/tools/nginx/': [''],
      '/tools/js-sdk/': [''],
      '/tools/vscode/': [''],
      '/frame/vue/': [
        ['', '基础总结'],
        ['senior', '高级用法'],
        ['code-rule', '编码规范'],
        ['application', '开发技巧']
      ],
      '/frame/vue-router/': [
        ['', '基础总结'],
      ],
      '/frame/react/': [
        ['', '基础'],
        ['react', 'react']
      ],
      '/frame/node/': [
        ['', '服务构建'],
        ['express', 'express框架'],
        ['sequelize', 'sequelize框架']
      ],
      '/frame/miniprogram/': [
        ['', '基础知识'],
        ['summary', '开发总结'],
        ['utils', '常用工具函数'],
        ['mpvue', 'mpvue']
      ],
      '/frame/angular/': [
        ['', '基础知识']
      ],
      '/frame/mysql/': [
        ['', '基础知识'],
        ['other', '其他用法']
      ],
      '/frame/typescript/': [
        ['', '基础知识'],
        // ['other', '其他用法']
      ],
      '/frame/element/': [''],
      '/frame/axios/': [''],
      '/frame/redis/': [''],
      '/frame/shell/': [''],
      '/base/css/': [
        ['', 'CSS基础'],
        ['summary', 'CSS开发技巧'],
        ['option', 'CSS属性'],
        ['example', 'CSS动画'],
      ],
      '/other/setting/': [
        ['', 'hosts']
      ],
      '/other/read/': [
        ['', '图解HTTP'],
        ['howcomputerrun', '计算机是如何跑起来的'],
        ['howprocedurerun', '程序是怎样运行的'],
        ['html5andcss3', 'HTML5和CSS3实战'],
        ['webpack', '深入浅出webpack'],
        ['jsup', '你不知道的JS上卷'],
        ['js188', '编写高质量代码的188个建议'],
        ['term', '术语'],
      ],
      '/other/safety/': [
        ['', '安全'],
      ],
      '/other/internet/': [
        ['', '计算机网络']
      ],
      '/other/study/': [
        ['', '总结'],
        ['html', 'html'],
        ['css', 'css'],
        ['js', 'js']
      ],
      '/': [
        ['', '前端笔记'],
        ['knowledge', '知识总结'],
        ['optimize', '性能优化'],
        ['experience', '开发总结'],
        ['design', '开发模式'],
        ['summary', '读后感'],
        ['unique', '罕见特性'],
        ['video', '视频学习'],
      ],
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
      }
    }
  }
}
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
          {text: 'Element', link: '/frame/element/'},
          {text: 'Node', link: '/frame/node/'},
          {text: '小程序', link: '/frame/miniprogram/'}
        ]
      },
      {
        text: '工具',
        items: [
          { text: 'Chrome', link: '/tools/chrome/' },
          { text: 'NPM', link: '/tools/npm/' },
          { text: 'Git', link: '/tools/git/' },
          { text: 'Webpack', link: '/tools/webpack/' },
        ]
      },
      {text: '博客', link: 'https://blog.csdn.net/greybearchao'}      
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
        ['test1', '我是标题2']
      ],
      '/base/js/': [
        ['', 'JS'],
        ['base', '知识汇总'],
        ['reg', '正则'],
        ['es6', 'ES6'],
      ],
      '/base/interview/': [
        ['', '汇总'],
        ['example', '算法'],
      ],
      '/tools/chrome/': [
        ['', '调试工具']
      ],
      '/tools/npm/': '',
      '/tools/git/': [''],
      '/tools/webpack/': [
        ['', 'vue环境构建'],
        ['loader', 'loader'],
        ['plugin', 'plugin']
      ],
      '/frame/vue/': [
        ['', '基础总结'],
        ['senior', '高级用法'],
        ['code-rule', '编码规范']
      ],
      '/frame/node/': [
        ['', '服务构建'],
        ['express', 'express框架']
      ],
      '/frame/miniprogram/': [
        ['', '基础知识'],
      ],
      '/frame/element/': [''],
      '/base/css/': [
        ['', 'CSS基础'],
        ['option', 'CSS属性'],
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
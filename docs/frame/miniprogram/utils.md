---
title: 小程序
lang: zh-CN
sidebarDepth: 2
---

## 工具函数

### 强制更新

```js
// util/util.js
function checkVersion () {
  const updateManager = wx.getUpdateManager()
  updateManager.onCheckForUpdate(function (res) {
    console.log('res', res)
    console.log(res.hasUpdate)
    if (res.hasUpdate) { // 存在新版本
      wx.showLoading({
        title: '版本更新中',
        mask: true
      })
    }
  })
  updateManager.onUpdateReady(function () {
    wx.hideLoading()
    wx.showModal({
      title: '更新提示',
      content: '更新完成，点击确定重启！',
      showCancel: false,
      success (res) {
        if (res.confirm) {
          updateManager.applyUpdate()
        }
      }
    })
  })
  updateManager.onUpdateFailed(function () {
    wx.hideLoading()
    wx.showModal({
      title: '更新提示',
      content: '新版本下载失败，请检查网络！',
      showCancel: false
    })
  })
}

// app.js
import { checkVersion } from '/utils/util.js'
App({
  onShow: function () { // 热启动和冷启动均可检测版本更新
    checkVersion()
  }
})
```

### 动态设置tabBar

wx.setTabBarItem(Object)：动态设置 tabBar 某一项的内容，2.7.0 起图片支持临时文件和网络文件。

```js
// utils/util.js
function setTabBar (list) {
  list.forEach(item => {
    wx.setTabBarItem(item)
  })
}

module.exports = {
  setTabBar: setTabBar
}

// app.js
import { setTabBar } from '/utils/util.js'
App({
  onLaunch: function () {
    setTabBar([
      {
        index: 0,
        text: '首页',
        iconPath: 'images/home.png',
        selectedIconPath: 'images/home-active.png'
      },
      {
        index: 1,
        text: '日志',
        iconPath: 'images/log.png',
        selectedIconPath: 'images/log-active.png'
      }
    ]);
  },
  globalData: {
    userInfo: null
  }
})
```
附：tabBar 可以自定义 ，但再切换时会有一个图片闪烁的效果。

### 指定权限的授权

```js
function checkSetting (name, callback, modal) { // 指定权限的授权
  console.log('this', this)
  const { confirmColor='#ff4500', cancelColor='#666', title ='提示', content } = modal
  wx.getSetting({
    success: res => {
      const authSetting = res.authSetting[name]
      if (authSetting === undefined) { // 首次进入未授权
        wx.authorize({
          scope: name,
          success: result => {
            this[callback]()
          },
          fail: err => {
            console.log('err', err)
          }
        })
      } else if (authSetting === false) { // 首次授权拒绝
        wx.showModal({
          title,
          content,
          confirmColor,
          cancelColor,
          success: result => {
            if (result.confirm) {
              wx.openSetting({
                success: () => {
                  this[callback]()
                }
              })
            }
          }
        })
      } else { // 已授权
        this[callback]()
      }
    }
  })
}
```
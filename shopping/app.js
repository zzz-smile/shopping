//app.js
App({

  globalData: {
    clientUrl: "https://zzzwine.com/wx/clientRequest",
    userInfo: null,//用户全局基本信息
    appId:"zzzwine",
    userType:0,//用户类型
    loginInfo:null  //用户登录信息，openid
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: 'https://zzzwine.com/wx/clientRequest',
            dataType: "json",
            method: "POST",
            data: {
              actionId: 1001,
              data: "{code:" + res.code + "}"
            },
            success: function (res) {
              // console.log(res)
              var app = getApp()
              app.globalData.loginInfo = JSON.parse(res.data.data)
              //console.log(app.globalData.loginInfo.openid)
              //var info = JSON.parse(app.globalData.loginInfo)
              // console.log(info.openid)
            },
            fail: function () {
              console.log("初始化登录失败");
              wx.showToast({
                title: "登录失败，搬砖程序员正在解决...",
                icon: "none",
                duration: 2000
              });
            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
  
})
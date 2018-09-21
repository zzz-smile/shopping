// pages/homepage/pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    userListInfo: [{
      icon: '/pages/homepage/pages/me/resources/list.png',
      text: '我的订单',
      url: '/pages/submy/pages/my/my_order',
      isunread: true,
      unreadNum: 2
    }, {
        icon: '/pages/homepage/pages/me/resources/money.png',
      text: '我的代金券',
      url: '/pages/submy/pages/my/my_order',
      isunread: false,
      unreadNum: 2
    }, {
      icon: '/pages/homepage/pages/me/resources/placeholder.png',
        url: '/pages/submy/pages/my/my_order',
      text: '收货地址管理'
    }, {
      icon: '/pages/homepage/pages/me/resources/phone-call.png',
      text: '联系客服',
      url: '/pages/submy/pages/my/my_order'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // // 查看是否授权
    // wx.getSetting({
    //   success: function (res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res.userInfo)
    //         }
    //       })
    //     }
    //   }
    // })

    // console.log("开始");
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
   
  },


  getUserInfo: function (e) {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

        var param={
          unionid: app.globalData.loginInfo.unionid,
          openid: app.globalData.loginInfo.openid,
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
          gender: res.userInfo.gender,
          city: res.userInfo.city,
          province: res.userInfo.province,
          country: res.userInfo.country,
          language: res.userInfo.language,
          userType: app.globalData.userType
        }
        //console.log(param);
        wx.request({
          url: app.globalData.clientUrl,
          dataType: "json",
          method: "POST",
          data: {
            actionId: 1002,
            data: JSON.stringify(param)
          },
          success: function (res) {
            console.log(res);
          },
          fail: function () {
            console.log("请求登录失败");
            wx.showToast({
              title: "登录失败，搬砖程序员正在解决...",
              icon: "none",
              duration: 2000
            });
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
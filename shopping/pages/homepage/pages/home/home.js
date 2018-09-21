// pages/homepage/pages/home/home.js
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // tabs:{
    //   curHdIndex: 1,  //tab的样式
    //   curBdIndex: 1 //tab切换页面
    // },
    tabIndex:1,
    //菜单
    menus:[{
      id:1,
      img_url:"/pages/homepage/pages/home/resources/liquor.png",
      text:"白酒",
      style:1,
      substyle:1
    },{
        id: 2,
        img_url: "/pages/homepage/pages/home/resources/wine.png",
        text: "红酒",
        style: 1,
        substyle: 2
      }, {
        id: 3,
        img_url: "/pages/homepage/pages/home/resources/fish.png",
        text: "海鲜",
        style: 2,
        substyle: 1
      }, {
        id: 4,
        img_url: "/pages/homepage/pages/home/resources/dried_food.png",
        text: "干货",
        style: 2,
        substyle: 2
      }],
    
    imageWidth: wx.getSystemInfoSync().windowWidth,//图片宽度
    imgs:[],//滚动图片列表
    //hotProducts:[] //热卖产品
    liquors:[],
    wines:[],
    fishs:[],
    dried_foods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //请求滚动照片
    wx.request({
      url: app.globalData.clientUrl,
      dataType: "json",
      method: "POST",
      data: {
        actionId: 3001,
        data: "{appId:" + app.globalData.appId + "}"
      },
      success: function (res) {
        // console.log(res);
        var list = JSON.parse(res.data.data)
        that.setData({
          imgs:list
        })
      },
      fail: function () {
        console.log("请求失败");
        wx.showToast({
          title: "服务错误，搬砖程序员正在解决...",
          icon:"none",
          duration:2000
        });
      }
    })

    //初始化请求分类酒
    // var productRequest={};
    // productRequest.appId = app.globalData.appId;
    // productRequest.style="1";
    // productRequest.subStyle = "1";

    // wx.request({
    //   url: app.globalData.clientUrl,
    //   dataType: "json",
    //   method: "POST",
    //   data: {
    //     actionId: 2002,
    //     data: JSON.stringify(productRequest)// "{appId:" + app.globalData.appId +"}"
    //   },
    //   success: function (res) {
    //     // console.log(res);
    //     //遍历数组，转为json对象
    //     var datalist = res.data.data;
    //     var list=new Array();
    //     for (var i in datalist){
    //       // console.log(datalist[i])
    //       list[i] = JSON.parse(datalist[i]);
    //     }
    //     that.setData({
    //       liquors: list
    //     })
    //     // console.log(that.data.hotProducts);
    //   },
    //   fail: function () {
    //     console.log("请求失败");
    //     wx.showToast({
    //       title: "服务错误，搬砖程序员正在解决...",
    //       icon: "none",
    //       duration: 2000
    //     });
    //   }
    // })

  },

  //绑定切换tab事件
  tabSelectd: function(e) {
    // console.log(e);
    //获取触发事件组件的dataset属性  
    var _datasetId = e.currentTarget.dataset.id;  
    var _style = e.currentTarget.dataset.style;
    var _substyle = e.currentTarget.dataset.substyle;
    this.setData({
      tabIndex:_datasetId
    })
    
    // console.log(_substyle);
    // var _obj={};
    // _obj.curHdIndex= _datasetId;//tab的样式
    // _obj.curBdIndex= _datasetId;
    // //设置tab
    // this.setData({
    //   tabs: _obj
    // })
    
    
   
    //绑定数据
    // switch (_datasetId){
    //   case 1:
    //     if (this.data.liquors.length <=0){
    //       this.requestStyle(this,_datasetId,_style, _substyle, 1, 6);
    //     }
    //      console.log(this.data.liquors);
    //     break;
    //   case 2:
    //     if (this.data.wines.length <= 0) {
    //       this.requestStyle(this, _datasetId, _style, _substyle, 1, 6);
    //     }
    //      console.log(this.data.wines);
    //     break;
    //   case 3:
    //     if (this.data.fishs.length <= 0) {
    //       this.requestStyle(this, _datasetId, _style, _substyle, 1, 6);
    //     }
    //      console.log(that.data.fishs);
    //     break;
    //   case 4:
    //     if (this.data.dried_foods.length <= 0) {
    //       this.requestStyle(this, _datasetId, _style, _substyle, 1, 6);
    //     }
    //      console.log(that.data.dried_foods);
    //     break;
    // }

    //console.log(this.data.tabs.curBdIndex);
  },


  //请求分类请求 (namevalue代表set哪个vauleName里面，style代表类型，subStyle代表子类型)  that, vauleName,
  requestStyle: function (style,subStyle,pageNum,pageSize){
    console.log("执行分类请求产品函数")
    var pram = {};
    pram.appId = app.globalData.appId;
    pram.style = style;
    pram.subStyle = subStyle;
    pram.pageNum = pageNum;
    pram.pageSize = pageSize;
    var list = new Array();
    wx.request({
      url: app.globalData.clientUrl,
      dataType: "json",
      method: "POST",
      data: {
        actionId: 2002,
        data: JSON.stringify(pram)// "{appId:" + app.globalData.appId +"}"
      },
      success: function (res) {
        // console.log(res);
        //遍历数组，转为json对象
        
        var datalist = res.data.data;
        for (var i in datalist) {
          list[i]=(JSON.parse(datalist[i]));
        }
        // that.setData({
        //   liquors: that.data.liquors.concat(list)
        // })
        //绑定数据
        // switch (vauleName) {
        //   case 1:
        //     that.setData({
        //       liquors: that.data.liquors.concat(list)
        //     })
        //     break;
        //   case 2:
        //     that.setData({
        //       wines: that.data.liquors.concat(list)
        //     })
        //     break;
        //   case 3:
        //     that.setData({
        //       fishs: that.data.liquors.concat(list)
        //     })
           
        //     break;
        //   case 4:
        //     that.setData({
        //       dried_foods: that.data.liquors.concat(list)
        //     })
        //     break;
        // }


        // console.log(list);
      },
      fail: function () {
        console.log("分类型请求产品失败");
      }
    })
   
    return list; 
    
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
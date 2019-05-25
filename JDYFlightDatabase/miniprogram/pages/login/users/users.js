Page({
  data:{
    userName:'，您还没有登录！请点击头像进行登录',
    userLogin:false

  },

  onLoad: function(options){
    
  },

  onShow: function (options) {
    if (this.userLogin == true) {
      this.setData({
        userName: options.inputName
      })
    }
  },
  
  Login:function(){
    var that = this;
    wx:wx.navigateTo({
      url: '../../welcome/welcome',
      success: function(res) {},
      fail: function(res) {},
      complete: function (res) {
        that.setData({
          userLogin:true,
          userName: options.inputName

        })},
    })
  }
})
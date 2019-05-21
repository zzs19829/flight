// pages/select/select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,  //控制单程（0）和往返（1）的变量
    depCity:"上海",
    arvCity:"北京",


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  changeBtn: function (ev) {//单程，往返切换
    this.setData({
      currentIndex: ev.target.dataset.index
    })
  },
  seatchProduct: function () {
    wx.navigateTo({
      url: '../result/result'
    })
  },
})
// pages/welcome/welcome.js
//全局变量
var inputName = "";
var inputPassword = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '筋斗云',
    checkbox:false
  },

//以下是自定义函数
  inputName:function(e){
    inputName = e.detail.value;
  },

  inputPassword: function (e) {
    inputPassword = e.detail.value;
  },

  checkInput:function(){
    if (inputName == "" || inputName == null ||
      inputName == undefined){
      this.showErrorToastUtils('请输入正确的用户名');
    } else if (inputPassword == "" || inputPassword == null || inputPassword == undefined){
      this.showErrorToastUtils('请输入密码');
    } else if (inputPassword.length < 6){
      this.showErrorToastUtils('密码至少要6位');
    }else{
      return true;
    }
  },

  login:function(){
    var that = this;
    var isrightful = that.checkInput();
    if(isrightful){
      that.loginin()
      .then(that.loginreturn,function(information){
        wx.showToast({ //这里提示失败原因
          title: information,
          icon: 'none',
          duration: 1500
        })
      })
    }
    //以下注释中是关于解决异步问题的不科学方法
    /*const db = wx.cloud.database();
   if(isrightful){
      db.collection('user').where({
        username:inputName,
        password:inputPassword
      }).get({
        success(res){
          if(res.data.length==1){
          that.setData({
            checkbox:true
          });
        }
        }
      })
      wx.showToast({
        title: '正在处理请稍后',
        icon: 'loading',
        duration: 1500
      })
      var timer;
     timer=setTimeout(function(){
        var tempcheckbox = that.data.checkbox;
        if (tempcheckbox == true) {
          wx.navigateTo({
            url: '../../pages/index/index'
          })
        } else {
          wx.showToast({ //这里提示失败原因
            title: '信息错误',
            icon: 'loading',
            duration: 1500
          })
        }
      },2000)

    }*/
  },

  loginin: function (information) {
    var that = this;
    const db = wx.cloud.database();
    wx.showToast({
      title: '正在处理请稍后',
      icon: 'loading',
      duration: 1500
    })
    var p = new Promise(function (resolve, reject) { 
      db.collection('user').where({
        username: inputName,
        password: inputPassword
      }).get({
        success(res){
          if(res.data.length==1){
            that.setData({
              checkbox: true
            });
            resolve(that.checkbox);
          }
          else{
            reject('账号或密码错误')
          }
        }
      })
    });
    return p;
  },

  loginreturn:function(information){
    var that=this;
    var p = new Promise(function (resolve, reject) {  
      wx.navigateTo({
        url: '../../pages/login/users/users?inputName='+inputName,
      });
    });
    return p;
  },

  showErrorToastUtils: function (e) {
    wx.showModal({
      title: '提示！',
      confirmText: '确定',
      showCancel: false,
      content: e,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },

  register:function(){
    var that = this;
    var isrightful = that.checkInput();
    const db = wx.cloud.database()
    const getuser=db.collection('user')
    
    if (isrightful){
      that.registerjudge()
      .then(function(information){
        getuser.add(
          {
            data: {
              //这里id是自己分配的
              username: inputName,
              password: inputPassword
            }
          }
        )
        wx.showToast({ 
          title: information,
          icon: 'none',
          duration: 1500
        })
      },
      function(information){
        wx.showToast({ //这里提示失败原因
          title: information,
          icon: 'none',
          duration: 1500
        })
      }
      )
    }
  },

registerjudge:function(information){
  var that = this;
  const db = wx.cloud.database();
  wx.showToast({
    title: '正在提交',
    icon: 'loading',
    duration: 1500
  })
  var p = new Promise(function (resolve, reject) {
    db.collection('user').where({
      username: inputName
    }).get({
      success(res) {
        if (res.data.length == 1) {
          reject('用户名已存在！');
        }
        else {
          resolve('注册成功！请登录')
        }
      }
    })
  });
  return p;
},

//以上是自定义函数



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

  }
})
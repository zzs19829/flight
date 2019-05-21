Page({
  data:{
    userName:''
  },

  onLoad: function(options){
    this.setData({
      userName:options.inputName
    })
  }
})
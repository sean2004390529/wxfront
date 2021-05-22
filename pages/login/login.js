
var CusBase64 = require('../../utils/base64.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    error: '',
    canSubmit: true,
    formData: {
      username: '',
      password: ''
    },
    rules: [
      { name: 'username', rules: {required: true, message: '请输入用户名'}, },
      { name: 'password', rules: {required: true, message: '请输入密码'}, }
    ]
  },
  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
  },
  handleSubmit: function(){
    this.selectComponent('#form').validate( (valid, errors) =>{
      this.canSubmit = true
      if(!valid){
        const firstError = Object.keys(errors)
        if(firstError.length){
          this.canSubmit = false
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      }
    })
  },
  submitLogin: function(e) {
    this.handleSubmit()
    if(this.canSubmit){
      var tokenBase64 = "Basic " + CusBase64.CusBASE64.encoder('nginx:nginx');
      wx.showToast({
        title: '登 录 请 求 中',
        icon: 'loading',
        duration: 10000
      })
      wx.request({
        url: 'https://seancloud.tech:8000/api/auth/oauth/token?grant_type=password&scope=all&username=' + this.data.formData.username + '&password=' + this.data.formData.password,
        method: 'POST',
        header: {
          Authorization: tokenBase64
        },
        success: function(res) {
          wx.hideToast();
          console.log(res);
          if(res.statusCode==200){
            // 存储token
            var accessToken = res.data.access_token;
            var refreshToken = res.data.refresh_token;
            wx.switchTab({
              url: '/pages/index/index'
            })
          }else {
            wx.showModal({
              title: '登录失败',
              content: '请确认用户名或密码',
              showCancel: false
            })
          }
        }
      })
    }
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

  }
})
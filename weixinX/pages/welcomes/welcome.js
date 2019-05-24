Page({
  onTap:function(){
    console.log("welcome....");
    wx.switchTab({
      url: '../posts/post',
    })
    // wx.navigateTo({
    //   url: '../posts/post',
    // })
    // wx.redirectTo({
    //   url: '../posts/post',
    // })
    
  },

  onTextTap:function(){
    console.log('onTextTap..');
  },

  onHide: function () {
    console.log('onHide..');
  },

  onUnload: function () {
    console.log('onUnload ..页面关闭');
  },
})
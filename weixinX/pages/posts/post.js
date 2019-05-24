var postsData = require('../../data/posts-data.js')//绝对路径不可以
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  imgPath:'',
  process:function(){

  },
  onLoad: function (options) {
    
    this.setData({ "posts_key": postsData.postList });
  },

  onPostTap: function(event){
    var postId = event.currentTarget.dataset.postId;

    console.log("...onPostTap..."+postId);

    wx.navigateTo({
      url: '/pages/posts/post-detail/post-detail?id='+postId,
      
    })
  },
  onSwiperTap: function(event){
    var postId =event.target.dataset.postId;
    console.log('...onSwiperTap..');
    wx.navigateTo({
      url: '/pages/posts/post-detail/post-detail?id=' + postId,
    })
  },

///////////////////
  onReady: function () {
    console.log('onReady..');
  },

  onShow: function () {
    console.log('onshow..');
  },

  onPullDownRefresh: function () {
    
  },

  onReachBottom: function () {
    
  },

  onShareAppMessage: function () {
    
  }
})
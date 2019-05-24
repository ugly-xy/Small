var postsData = require("../../../data/posts-data.js");
var app =getApp();
Page({
  data: {
    isPlay:false,
  },

  onLoad: function(options) {
    var globalData =app.globalData;
    var postId = options.id;
    this.setData({
      currentPostId: postId
    })
    var postData = postsData.postList[postId - 1]
    this.setData({
      'postData': postData
    });

    var postsCollected = wx.getStorageSync("posts_collected");
    if (postCollected) {
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      });
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected);
    }

    if (globalData.g_isPlay && globalData.g_currentMusicPostId == postId){
      this.setData({
        isPlay:true
      });
    }

    var that =this;
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.onPlay(function(){
      that.setData({
        isPlay: true
      })
      globalData.g_isPlay=true;
      globalData.g_currentMusicPostId = that.data.currentPostId;
    })
    backgroundAudioManager.onPause(function(){
      that.setData({
        isPlay:false
      })
      globalData.g_isPlay = false;
      globalData.g_currentMusicPostId = null;
    })
    backgroundAudioManager.onStop(function () {
      that.setData({
        isPlay: false
      })
      globalData.g_isPlay = false;
      globalData.g_currentMusicPostId = null;
    })
  },
  onCollectionTap: function(event) {
    this.getPostsCollectedSync();

  },

  getPostsCollected: function() {
    var that = this;
    wx.getStorage({
      key: 'posts_collected',
      success: function(res) {
        var postsCollected = res.data;
        console.log("curretnPostId------" + that.data.currentPostId);
        var postCollected = postsCollected[that.data.currentPostId];
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postsCollected, postCollected);
      },
    })

  },

  getPostsCollectedSync: function() {
    var postsCollected = wx.getStorageSync("posts_collected");
    console.log("curretnPostId------" + this.data.currentPostId);
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postsCollected, postCollected);
  },

  showModal: function(postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? ' 收藏该文' : '取消收藏',
      showCancel: true,
      cancelText: '扔掉',
      success: function(res) {
        if (res.confirm) {
          wx.setStorageSync("posts_collected", postsCollected);
          that.setData({
            collected: postCollected
          })
        }

      }

    })
  },
  showToast: function(postsCollected, postCollected) {
    var that = this;
    wx.setStorageSync("posts_collected", postsCollected);
    that.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消收藏",
    })

  },




  onShareTap: function(event) {
    var itemList = [
      "分享微信好友",
      "分享朋友圈",
      "分享微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function(res) {
        console.log("actionSheet---" + itemList[res.tapIndex]);

      }
    })
  },
  onMusicTap: function(event) {
    console.log('music....');
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    var isPlay = this.data.isPlay;
     if(isPlay){
        //wx.pauseBackgroundAudio();
        this.setData({
          isPlay:false
        })
       backgroundAudioManager.pause();
     }else{
       this.setData({
         isPlay: true
       })
      //  wx.playBackgroundAudio({
      //    dataUrl: '' + this.data.postData.src,
      //    title: '小叶',
      //  })
       
       backgroundAudioManager.title = '小叶叶';
       backgroundAudioManager.coverImgUrl = '';
       backgroundAudioManager.src
         = this.data.postData.src;
       backgroundAudioManager.play();
     }
    

    
         

  }

})
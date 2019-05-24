var util = require('../../utils/util.js');
var app =getApp();
Page({

  data:{
    in:{},
    com:{movies:[]},
    top250:{},
    containerShow:true,
    searchPannelShow:false,
    searchResult:{}
  },
  onLoad:function(event){
    var inUrl = app.globalData.doubanBase+"/v2/movie/in_theaters?start=0&count=3";
    var comingUrl = app.globalData.doubanBase +"/v2/movie/coming_soon?start=0&count=3";
    var top250Url = app.globalData.doubanBase +"/v2/movie/top250?start=0&count=3";

   
    this.getMovieListData(inUrl,"in","正在热映");
    this.getMovieListData(comingUrl, "com","即将上映");
    this.getMovieListData(top250Url, "top250","豆豆TOP250");

    // this.getMovieListData(top250Url);
     
  },

  onMoreTap:function(event){
    var category =event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category='+category,
      
    })
  },

  onMovieTap:function(event){
    var movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id='+movieId,
    })
  },

  getMovieListData: function (url, setedkey, cTitle){
    var that=this;
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        "content-type": "json"
      },
      success: function (res) {
        console.log(res);
        that.processDoubanData(res.data, setedkey, cTitle);
      },
      fail: function (error) {
        console.log(error);
      },
      complete: function () {

      }
    })
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow:false,
      searchPannelShow:true
    })
  },
  onBindChange: function (event) {
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase +"/v2/movie/search?q="+text;
    this.getMovieListData(searchUrl,"searchResult","");
  },
  onBindBlur: function(event){
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchResult", "");
  },
  onCancelImgTap:function(){
    this.setData({
      containerShow: true,
      searchPannelShow: false,
      searchResult:{}
    })
  },

  processDoubanData: function (moviesDouban, setedkey,cTitle){
    var movies =[];
    for(var idx in moviesDouban.subjects){
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if(title.length>6){
        title = title.substring(0,6) +'...';
      }
      var temp = {
        stars:util.convertToStarsArray(subject.rating.stars),
        title:title,
        average: subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }
      movies.push(temp);
    }
    var readyData={};
    readyData[setedkey]={
      'cTitle':cTitle,
      'movies':movies
    }
    this.setData(readyData)
  }

  
})
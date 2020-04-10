// pages/area/casedetails/index.js
var t = getApp(), e = t.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: 0,
    datail:{},
    member:{},
    images:[],
    list:[],
    cateid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (event) {
    var t = this
    var id = event.cate;
    t.setData({
      cateid: event.cate,
    });
    // e.post("sns/post/main", {
    //   id: event.cate,
    // }, function (ei) {
    //   t.setData({
    //     datail: ei.post,
    //     member: ei.member,
    //     images: ei.images
    //   });
    //   e.get("sns/post/getlist", {
    //     pid: ei.post.id,
    //     bid: ei.post.bid,
    //   }, function (e) {
    //     console.log(ei.post.id, ei.post.bid,e)
    //     t.setData({
    //       list: e.list
    //     });

    //   });
    // });
    console.log(e)
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
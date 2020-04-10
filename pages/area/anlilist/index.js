// pages/area/anlilist/index.js
var t = getApp(), e = t.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    loading: !0,
    total: 1,
    loaded: !1,
    canload: !0,
    params: {},
    count: 0,
    page: 1,
    bid: 0,
    status: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('456',options)
    var t = this
    var id = options.id
    wx.setNavigationBarTitle({
      title: options.title,
    });
    t.setData({
      bid: id
    }),this.getList();
    e.get("sns/board/designer", {
      unionid: wx.getStorageSync('unionid')
    }, function (e) {
      console.log(wx.getStorageSync('unionid'))
      console.log('789456',e)
      t.setData({
        status: e.status
      });
    });
  },

  getList: function () {
    var t = this;
    t.setData({
      loading: !0
    }), this.data.canload = !1, t.data.params.page = t.data.page, t.data.params.bid = t.data.bid, e.get("sns/board/getlist", t.data.params, function (e) {
      wx.stopPullDownRefresh();
      var a = {
        loading: !1,
        count: e.total,
        show: !0,
        banner: e.banner
      };
      e.list || (e.list = []), e.list.length > 0 && (a.page = t.data.page + 1, a.list = t.data.list.concat(e.list),
        e.list.length < e.pagesize && (a.loaded = !0)), t.setData(a), t.data.canload = !0;
    });
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
    if (this.data.list.length>0) {
      this.setData({
        loading: !0,
        total: 1,
        loaded: !1,
        canload: !0,
        list: [],
        page: 1,
        params: {},
      }), this.getList();
    } else { }
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
  onPullDownRefresh: function() {
    this.setData({
      loading: !0,
      total: 1,
      loaded: !1,
      canload: !0,
      list: [],
      page: 1,
      params: {},
    }), this.getList();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.loaded || this.data.list.length == this.data.total || 1 == this.data.canload && this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
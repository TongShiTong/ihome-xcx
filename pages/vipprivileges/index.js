var t = getApp(), e = t.requirejs("core"), a = t.requirejs("wxParse/wxParse"), i = t.requirejs("biz/diypage"), s = t.requirejs("jquery");

Page({
  data: {
    route: "member",
    icons: t.requirejs("icons"),
    member: {},
    diypages: {},
    audios: {},
    audiosObj: {},
    modelShow: !1,
    autoplay: !0,
    interval: 5e3,
    duration: 500,
    swiperheight: 0,
    iscycelbuy: !1,
    bargain: !1,
    result: {},
    list: [],
    loading: !0,
    total: 1,
    loaded: !1,
    canload: !0,
    params: {},
    count: 0,
    page: 1,
    groudid: 0,
  },
  onLoad: function (t) {
    this.setData({
      options: t,
      groudid: 1
    }), this.getList()
  },
  getList: function () {
    var t = this;
    t.setData({
      loading: !0
    }), this.data.canload = !1, t.data.params.page = t.data.page, t.data.params.groudid = t.data.groudid, e.get("goods/get_member_list", t.data.params, function (e) {
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
  getInfo: function () {
    var t = this;
    e.get("member", {}, function (e) {
      console.log(e), 1 == e.isblack && wx.showModal({
        title: "无法访问",
        content: "您在商城的黑名单中，无权访问！",
        success: function (e) {
          e.confirm && t.close(), e.cancel && t.close();
        }
      }), t.setData({
        member: e,
        show: !0,
        customer: e.customer,
        customercolor: e.customercolor || "",
        phone: e.phone,
        phonecolor: e.phonecolor || "",
        phonenumber: e.phonenumber || "",
        iscycelbuy: e.iscycelbuy,
        bargain: e.bargain
      }), e.error, a.wxParse("wxParseData", "html", e.copyright, t, "5");
    });
  },
  onShow: function () {
    var e = this;
    this.getInfo(), wx.getSystemInfo({
      success: function (t) {
        var a = t.windowWidth / 1.7;
        e.setData({
          windowWidth: t.windowWidth,
          windowHeight: t.windowHeight,
          swiperheight: a
        });
      }
    }), e.setData({
      imgUrl: t.globalData.approot
    }), i.get(this, "member", function (t) { });
  },
  onShareAppMessage: function () {
    return e.onShareAppMessage();
  },
  imagesHeight: function (t) {
    var e = t.detail.width, a = t.detail.height, i = t.target.dataset.type, s = this;
    wx.getSystemInfo({
      success: function (t) {
        s.data.result[i] = t.windowWidth / e * a, (!s.data[i] || s.data[i] && result[i] < s.data[i]) && s.setData({
          result: s.data.result
        });
      }
    });
  },
  cancelclick: function () {
    wx.switchTab({
      url: "/pages/index/index"
    });
  },
  confirmclick: function () {
    wx.openSetting({
      success: function (t) { }
    });
  },
  phone: function () {
    var t = this.data.phonenumber + "";
    wx.makePhoneCall({
      phoneNumber: t
    });
  },
  play: function (t) {
    var e = t.target.dataset.id, a = this.data.audiosObj[e] || !1;
    if (!a) {
      a = wx.createInnerAudioContext("audio_" + e);
      var i = this.data.audiosObj;
      i[e] = a, this.setData({
        audiosObj: i
      });
    }
    var s = this;
    a.onPlay(function () {
      var t = setInterval(function () {
        var i = a.currentTime / a.duration * 100 + "%", o = Math.floor(Math.ceil(a.currentTime) / 60), n = (Math.ceil(a.currentTime) % 60 / 100).toFixed(2).slice(-2), r = Math.ceil(a.currentTime);
        o < 10 && (o = "0" + o);
        var u = o + ":" + n, c = s.data.audios;
        c[e].audiowidth = i, c[e].Time = t, c[e].audiotime = u, c[e].seconds = r, s.setData({
          audios: c
        });
      }, 1e3);
    });
    var o = t.currentTarget.dataset.audio, n = t.currentTarget.dataset.time, r = t.currentTarget.dataset.pausestop, u = t.currentTarget.dataset.loopplay;
    0 == u && a.onEnded(function (t) {
      c[e].status = !1, s.setData({
        audios: c
      });
    });
    var c = s.data.audios;
    c[e] || (c[e] = {}), a.paused && 0 == n ? (a.src = o, a.play(), 1 == u && (a.loop = !0),
      c[e].status = !0, s.pauseOther(e)) : a.paused && n > 0 ? (a.play(), 0 == r ? a.seek(n) : a.seek(0),
        c[e].status = !0, s.pauseOther(e)) : (a.pause(), c[e].status = !1), s.setData({
          audios: c
        });
  },
  pauseOther: function (t) {
    var e = this;
    s.each(this.data.audiosObj, function (a, i) {
      if (a != t) {
        i.pause();
        var s = e.data.audios;
        s[a] && (s[a].status = !1, e.setData({
          audios: s
        }));
      }
    });
  },
  onHide: function () {
    this.pauseOther();
  },
  onUnload: function () {
    this.pauseOther();
  },
  navigate: function (t) {
    var e = t.currentTarget.dataset.url, a = t.currentTarget.dataset.phone, i = t.currentTarget.dataset.appid, s = t.currentTarget.dataset.appurl;
    e && wx.navigateTo({
      url: e,
      fail: function () {
        wx.switchTab({
          url: e
        });
      }
    }), a && wx.makePhoneCall({
      phoneNumber: a
    }), i && wx.navigateToMiniProgram({
      appId: i,
      path: s
    });
  },
  close: function () {
    t.globalDataClose.flag = !0, wx.reLaunch({
      url: "/pages/index/index"
    });
  },
  onPullDownRefresh: function () {
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
});
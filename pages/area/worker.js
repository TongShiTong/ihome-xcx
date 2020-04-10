
var t = getApp(), e = t.requirejs("core"), a = t.requirejs("jquery"), s = t.requirejs("biz/diyform"), i = t.requirejs("biz/goodspicker");
/*函数节流*/
function throttle(fn, interval) {
  var enterTime = 0;//触发的时间
  var gapTime = interval || 300;//间隔时间，如果interval不传，则默认300ms
  return function () {
    var context = this;
    var backTime = new Date();//第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context, arguments);
      enterTime = backTime;//赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/*函数防抖*/
function debounce(fn, interval) {
  var timer;
  var gapTime = interval || 200;//间隔时间，如果interval不传，则默认1000ms
  return function () {
    clearTimeout(timer);
    var context = this;
    var args = arguments;//保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function () {
      fn.call(context, args);
    }, gapTime);
  };
}
Page({
  data: {
    list:[],
    listbest:[],
    listhot:[],
    sort:[],
    currentTabsIndex:0,
    hideTop:false,
    loading: !0,
    total: 1,
    loaded: !1,
    canload: !0,
    params: {},
    count: 0,
    page: 1,
    curClass: '',
    headerHeight: 0,
    itemHeight: ''
  },
  onLoad: function (e) {
    t.checkAuth(), this.setData({
      options: e
    });
    // this.getList();
  },
  onShow: function () {
    this.getData();
    this.getList();
  },

  onReady: function () {
    var that = this;
    wx.createSelectorQuery().select('.tabs-box').boundingClientRect(function (rect) {
      rect.height; // 节点高度
    }).exec(function (res) {
      that.headerHeight = res[0].height;
    })
    wx.createSelectorQuery().select('.anli').boundingClientRect(function (rect) {
      rect.height; // 节点高度
    }).exec(function (res) {
      that.itemHeight = res[0].height;
    })
  },


  getList: function () {
    var t = this;
    console.log(t.data.page)
    t.setData({
      loading: !0
    }), this.data.canload = !1, t.data.params.page = t.data.page, t.data.params.type = t.data.currentTabsIndex+1, e.get("sns/board/getlist", t.data.params, function (e) {
      wx.stopPullDownRefresh();
      var a = {
        loading: !1,
        count: e.total,
        show: !0
      };
      e.list || (e.list = []), e.list.length > 0 && (a.page = t.data.page + 1, a.list = t.data.list.concat(e.list),
        e.list.length < e.pagesize && (a.loaded = !0)), t.setData(a), t.data.canload = !0;
    });
  },
  getData: function () {
    var t = this;
    e.get("sns/board/relate", {
      id:1
    }, function (e) {
      t.setData({
        sort: e.list
      });
    });
  },
  
  tabSort: function (s) {
    console.log(14,s)
    var t = this;
    var id = s.currentTarget.dataset.id
    var title = s.currentTarget.dataset.title
    // e.get("sns/board/getlist", {
    //   bid: id,
    //   page: 1
    // }, function (e) {
    //   console.log(123, e)
    //   t.setData({
    //     list: e.list
    //   });
    // });
    wx.navigateTo({
      url: '/pages/area/anlilist/index?id=' + id +'&title=' + title,
    })
  },
  // 点击选项卡事件
  onTabsItemTap:function(event) {
    var index = event.currentTarget.dataset.index;
    this.setData({
      currentTabsIndex:index,
      loading: !0,
      total: 1,
      loaded: !1,
      canload: !0,
      list: [],
      // listbest: [],
      // listhot: [],
      page: 1,
      params: {},
    }),this.getList()
  },

  onPageScroll(e) {
    if (e.scrollTop >= this.headerHeight && !this.data.curClass) {
      // 当页面顶端距离大于一定高度时
      this.setData({
        curClass: 'topnav',
      })
    } else if (e.scrollTop <= this.headerHeight && this.data.curClass) {
      this.setData({
        curClass: ''
      })
    }
  },


  // onPageScroll: debounce(function(e) {
  //   // console.log(e)
  //   this.setData({
  //     top: e[0].scrollTop
  //   });
  // }),
  onPullDownRefresh() {
    this.setData({
      loading: !0,
      total: 1,
      loaded: !1,
      canload: !0,
      list: [],
      // listbest: [],
      // listhot: [],
      page: 1,
      params: {},
    }),this.getList();
  },
  onReachBottom: function () {
    this.data.loaded || this.data.list.length == this.data.total || 1 == this.data.canload && this.getList();
  },
});


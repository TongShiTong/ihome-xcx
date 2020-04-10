var t = getApp(), a = t.requirejs("core");

t.requirejs("jquery");

Page({
    data: {
        myshop: {},
        page: 1,
        loading: !1,
        loaded: !1,
        list: []
    },
    onLoad: function(t) {
        var a = this;
        a.myShop(), a.getList();
    },
    myShop: function() {
        var t = this;
        a.loading(), this.setData({
            loading: !0
        }), a.get("zy/commission/myshop", {}, function(e) {
            if (a.hideLoading(), !e.myshop) return a.alert(e.error), !1;
            t.setData({
                myshop: e.myshop,
                share: e.share,
                loading: !1,
                show: !0
            }), wx.setNavigationBarTitle({
                title: e.share.title
            });
        });
    },
    getList: function() {
        var t = this;
        a.loading(), this.setData({
            loading: !0
        }), a.get("zy/commission/myshopgoods", {
            page: this.data.page
        }, function(e) {
            var i = {
                loading: !1,
                total: e.total,
                pagesize: e.pagesize
            };
            e.list.length > 0 && (i.page = t.data.page + 1, i.list = t.data.list.concat(e.list), 
            e.list.length < e.pagesize && (i.loaded = !0), t.setSpeed(e.list)), t.setData(i), 
            a.hideLoading();
        });
    },
    setSpeed: function(t) {
        if (t && !(t.length < 1)) for (var a in t) {
            var e = t[a];
            if (!isNaN(e.lastratio)) {
                var i = e.lastratio / 100 * 2.5, s = wx.createContext();
                s.beginPath(), s.arc(34, 35, 30, .5 * Math.PI, 2.5 * Math.PI), s.setFillStyle("rgba(0,0,0,0)"), 
                s.setStrokeStyle("rgba(0,0,0,0.2)"), s.setLineWidth(4), s.stroke(), s.beginPath(), 
                s.arc(34, 35, 30, .5 * Math.PI, i * Math.PI), s.setFillStyle("rgba(0,0,0,0)"), s.setStrokeStyle("#ffffff"), 
                s.setLineWidth(4), s.setLineCap("round"), s.stroke();
                var o = "coupon-" + e.id;
                wx.drawCanvas({
                    canvasId: o,
                    actions: s.getActions()
                });
            }
        }
    },
    toQrcode: function() {
        this.data.myshop.postercount > 0 ? wx.navigateTo({
            url: "/commission/page/poster/index"
        }) : wx.navigateTo({
            url: "/commission/page/qrcode/index"
        });
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    }
});
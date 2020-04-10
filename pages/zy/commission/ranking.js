var t = getApp(), a = t.requirejs("core");

t.requirejs("jquery");

Page({
    data: {
        user: {},
        page: 1,
        maxnum: 0,
        loading: !1,
        loaded: !1,
        list: []
    },
    onLoad: function(t) {
        var a = this;
        a.getMain(), a.getList();
    },
    getMain: function() {
        var t = this;
        a.loading(), this.setData({
            loading: !0
        }), a.get("zy/commission/rank", {}, function(e) {
            if (a.hideLoading(), !e.user) return a.alert(e.error), !1;
            t.setData({
                user: e.user,
                commission_title: e.commission_title,
                maxnum: e.maxnum,
                loading: !1,
                show: !0
            });
        });
    },
    getList: function() {
        var t = this;
        a.loading(), this.setData({
            loading: !0
        }), a.get("zy/commission/rank_list", {
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
                var n = "coupon-" + e.id;
                wx.drawCanvas({
                    canvasId: n,
                    actions: s.getActions()
                });
            }
        }
    },
    more: function() {
        this.data.list.length >= this.data.maxnum ? a.alert("排名仅展示前" + this.data.maxnum + "名！") : this.data.list.length == this.data.total ? a.alert("已加载完全部数据") : this.data.loaded || this.getList();
    }
});
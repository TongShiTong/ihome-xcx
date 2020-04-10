var t = getApp(), a = t.requirejs("core");

Page({
    data: {
        awardsList: {},
        userInfo: {},
        searchLoading: !1,
        searchLoadingComplete: !1,
        ddd: [],
        page: 1
    },
    gotoLottery: function() {
        wx.redirectTo({
            url: "../Wheel/index"
        });
    },
    onShow: function(e) {
        var r = this;
        a.get("zy/lottery/myrewardpage", {}, function(t) {
            r.setData({
                ddd: t.list,
                page: 2
            });
        });
        var d = wx.getStorageSync("winAwards") || {
            data: []
        };
        d = d && d.data && d.data.length > 0 ? d.data : [], t.getUserInfo(function(t) {
            r.setData({
                userInfo: t,
                awardsList: d || []
            });
        });
    },
    onReachBottom: function(t) {
        var e = this, r = e.data.page, d = e.data.ddd;
        a.get("zy/lottery/myrewardpage", {
            page: r
        }, function(t) {
            if (0 == t.list.length) e.setData({
                searchLoading: !1,
                searchLoadingComplete: !0
            }); else {
                t.list.length > 0 && r++;
                for (var a = 0; a < t.list.length; a++) d.push(t.list[a]);
                e.setData({
                    ddd: d,
                    page: r
                }), t.list.length, e.setData({
                    searchLoading: !0,
                    searchLoadingComplete: !1
                });
            }
        });
    }
});
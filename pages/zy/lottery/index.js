function t(t, e, r) {
    return e in t ? Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = r, t;
}

var e, r = getApp().requirejs("core");

Page((e = {
    data: {
        banner: "",
        list: []
    },
    onShow: function(t) {}
}, t(e, "onShow", function(t) {
    var e = this;
    r.get("zy/lottery/get_list", {}, function(t) {
        e.setData({
            banner: t.banner,
            list: t.list
        });
    });
}), t(e, "togame", function(t) {
    var e = t.currentTarget.dataset.id;
    0 == t.currentTarget.dataset.total ? r.alert(t.currentTarget.dataset.tips) : wx.navigateTo({
        url: "/pages/zy/lottery/lottery?id=" + e
    });
}), e));
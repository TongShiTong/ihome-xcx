var a = getApp().requirejs("core");

Page({
    data: {
        images: [],
        imgs: []
    },
    onLoad: function(a) {
        this.getinfo();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    shopName: function(a) {
        this.setData({
            shopName: a.detail.value
        });
    },
    shoptips: function(a) {
        this.setData({
            shoptips: a.detail.value
        });
    },
    save: function() {
        var e = this;
        "" == e.data.shopName ? a.alert("请输入您的小店名称！") : a.post("zy/commission/shopset", {
            save: 1,
            shopname: e.data.shopName,
            shopdesc: e.data.shoptips,
            imgs: e.data.imgs
        }, function(e) {
            return a.alert("保存成功！"), setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 2e3);
        });
    },
    getinfo: function() {
        var e = this;
        a.loading(), this.setData({
            loading: !0
        }), a.get("zy/commission/shopset", {}, function(s) {
            if (a.hideLoading(), !s.shop) return a.alert(s.error), !1;
            e.setData({
                shopName: s.shop.name ? s.shop.name : "",
                shoptips: s.shop.desc ? s.shop.desc : "",
                imgs: s.shop.imgs,
                loading: !1,
                show: !0
            });
        });
    },
    upload: function(e) {
        var s = this, t = a.data(e), i = t.type, o = s.data.images, n = s.data.imgs, p = t.index;
        "image" == i ? a.upload(function(a) {
            o.push(a.filename), n.push(a.url), s.setData({
                images: o,
                imgs: n
            });
        }) : "image-remove" == i ? (o.splice(p, 1), n.splice(p, 1), s.setData({
            images: o,
            imgs: n
        })) : "image-preview" == i && wx.previewImage({
            current: n[p],
            urls: n
        });
    }
});
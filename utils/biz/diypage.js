var e = getApp(), a = e.requirejs("jquery"), t = e.requirejs("core");

e.requirejs("foxui"), module.exports = {
    get: function(e, o, i) {
        t.get("diypage", {
            type: o
        }, function(o) {
            for (var r in o.diypage = o.diypage || {}, o.diypage.items) "topmenu" == o.diypage.items[r].id && e.setData({
                topmenu: o.diypage.items[r]
            });
            var p = {};
            o.customer && (p.customer = o.customer), o.phone && (p.phone = o.phone), o.phonecolor && (p.phonecolor = o.phonecolor), 
            o.phonenumber && (p.phonenumber = o.phonenumber), o.customercolor && (p.customercolor = o.customercolor), 
            p && e.setData(p);
            var s = {
                loading: !1,
                pages: o.diypage.page,
                usediypage: !0,
                startadv: o.startadv
            };
            if (o.diypage.page && e.setData({
                diytitle: o.diypage.page.title
            }), 0 == o.error) {
                if (null != o.diypage.items) {
                    var d = [];
                    if (a.each(o.diypage.items, function(a, i) {
                        if (d.push(i.id), "topmenu" == i.id) {
                            if (2 == i.style.showtype) {
                                var r = 78 * Math.ceil(i.data.length / 4);
                                e.setData({
                                    topmenuheight: r
                                });
                            } else r = 78, e.setData({
                                topmenuheight: r
                            });
                            if (e.setData({
                                topmenu: i,
                                istopmenu: !0
                            }), null == i.data[0]) var p = ""; else p = i.data[0].linkurl, t.get("diypage/getInfo", {
                                dataurl: p
                            }, function(a) {
                                i.data[0].data = a.goods.list, s.diypages = o.diypage, s.topmenuDataType = a.type, 
                                e.setData(s);
                            });
                        } else "tabbar" == i.id && (null == i.data[0] ? p = "" : (p = i.data[0].linkurl, 
                        t.get("diypage/getInfo", {
                            dataurl: p
                        }, function(a) {
                            i.data[0].data = a.goods.list, i.type = a.type, void 0 !== i.data[0].data ? i.data[0].data.length == a.goods.count && (i.data[0].showmore = !0) : i.data[0].showmore = !1, 
                            s.diypages = o.diypage, s.tabbarDataType = a.type, s.tabbarData = a.goods, e.setData(s);
                        })));
                    }), wx.setNavigationBarTitle({
                        title: s.pages.title
                    }), wx.setNavigationBarColor({
                        frontColor: s.pages.titlebarcolor,
                        backgroundColor: s.pages.titlebarbg
                    }), i && i(o), -1 != d.indexOf("topmenu") || -1 != d.indexOf("tabbar")) return;
                    s.diypages = o.diypage, e.setData(s);
                }
                wx.setNavigationBarTitle({
                    title: s.pages.title
                }), wx.setNavigationBarColor({
                    frontColor: s.pages.titlebarcolor,
                    backgroundColor: s.pages.titlebarbg
                }), i && i(o);
            } else e.setData({
                diypages: !1,
                loading: !1
            });
        });
    }
};
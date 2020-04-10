var t = getApp().requirejs("core");

Page({
    data: {
        yearShow: "",
        monthShow: "",
        json_arr: {},
        advaward: {},
        calendar: [],
        months: [],
        member: {},
        set: {},
        signinfo: {},
        dateHidden: 1,
        orderday: "",
        sum: "",
        credit: "",
        loading: !1,
        loaded: !1
    },
    toSignrecord: function(t) {
        wx.navigateTo({
            url: "records"
        });
    },
    toDate: function(t) {
        this.setData({
            dateHidden: !this.data.dateHidden
        });
    },
    onLoad: function(t) {
        t = t || {}, this.getList();
    },
    getList: function() {
        var e = this;
        t.loading(), this.setData({
            loading: !0
        }), t.get("zy/sign/get_list", {
            year: e.data.yearShow,
            month: e.data.monthShow
        }, function(a) {
            if (t.hideLoading(), !a.member) return t.alert(a.error), !1;
            e.setData({
                member: a.member,
                calendar: a.calendar,
                signinfo: a.signinfo,
                advaward: a.advaward,
                yearShow: e.data.yearShow ? e.data.yearShow : a.year,
                monthShow: e.data.monthShow ? e.data.monthShow : a.month,
                today: a.today,
                signed: a.signed,
                signoldtype: a.signoldtype,
                months: a.months,
                set: a.set,
                loading: !1,
                show: !0
            });
        });
    },
    reDatelist: function(t) {
        var e = this, a = t.currentTarget.dataset.year, r = t.currentTarget.dataset.month;
        e.setData({
            yearShow: a,
            monthShow: r,
            dateHidden: 1
        }), e.getList();
    },
    toSign: function(t) {
        this.dosign("");
    },
    oldSign: function(t) {
        var e = this, a = t.currentTarget.dataset.date;
        (e.data.yearShow != t.currentTarget.dataset.year || e.data.monthShow != t.currentTarget.dataset.month || e.data.today != t.currentTarget.dataset.day) && e.data.set.signold_price > 0 ? wx.showModal({
            title: "提示",
            content: e.data.set.textsignold + "需扣除" + e.data.set.signold_price + e.data.signoldtype + "，确定" + e.data.set.textsignold + "吗？",
            success: function(t) {
                t.confirm && e.dosign(a);
            }
        }) : e.data.yearShow == t.currentTarget.dataset.year && e.data.monthShow == t.currentTarget.dataset.month && e.data.today == t.currentTarget.dataset.day ? e.dosign("") : e.dosign(a);
    },
    dosign: function(e) {
        var a = this;
        t.post("zy/sign/dosign", {
            date: e
        }, function(e) {
            if (!e.success) return t.alert(e.error), !1;
            t.alert(e.message), a.getList(), e.lottery && e.lottery.is_changes > 0 && (t.alert("您获得抽奖机会"), 
            setTimeout(function() {
                wx.redirectTo({
                    url: "/pages/zy/lottery/lottery?id=" + e.lottery.lottery.lottery_id
                });
            }, 3e3));
        });
    },
    getCredit: function(e) {
        var a = this, r = e.currentTarget.dataset.day;
        t.post("zy/sign/doreward", {
            type: 1,
            day: r
        }, function(e) {
            if (!e.success) return t.alert(e.error), !1;
            t.alert(e.message), a.getList();
        });
    },
    phone: function(e) {
        t.phone(e);
    },
    tohome: function(t) {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    }
});
var t = getApp().requirejs("core"), a = wx.createCanvasContext("myCanvas"), e = getApp().requirejs("wxParse/wxParse");

Page({
    data: {
        awardsList: {},
        animationData: {},
        btnDisabled: "",
        aas: [],
        bgul: {},
        ddd: [],
        bgul2: "",
        id: "",
        awardList: [],
        colorCircleFirst: "#FFDF2F",
        colorCircleSecond: "#FE4D32",
        colorAwardDefault: "#F5F0FC",
        colorAwardSelect: "#ffe400",
        indexSelect: 0,
        isRunning: !1,
        imageAward: [],
        lastDegs: 0,
        lastId: 0,
        showrules: 0
    },
    startX: 0,
    startY: 0,
    showrule: function(t) {
        this.setData({
            showrules: 1
        });
    },
    hiderule: function(t) {
        this.setData({
            showrules: 0
        });
    },
    gotoList: function() {
        wx.redirectTo({
            url: "../choujiang/index"
        });
    },
    onLoad: function(a) {
        var i = this, s = a.id;
        i.setData({
            id: s
        }), t.get("zy/lottery/lottery_reward", {
            id: s
        }, function(t) {
            for (var a = [], e = [], s = 0; s < t.data.length; s++) {
                var n = t.data[s].icon, r = t.data[s].title;
                a.push(n), e.push(r);
            }
            i.setData({
                aas: t.data,
                imageAward: a
            });
            var o = i.data.aas, l = o.length, d = 360 / l / 2 + 90, c = [], u = 1 / l;
            i.setData({
                btnDisabled: ""
            });
            for (var g = wx.createContext(), s = 0; s < l; s++) g.save(), g.beginPath(), g.translate(150, 150), 
            g.moveTo(0, 0), g.rotate((360 / l * s - d) * Math.PI / 180), g.arc(0, 0, 150, 0, 2 * Math.PI / l, !1), 
            s % 2 == 0 ? g.setFillStyle("rgba(255,184,32,.1)") : g.setFillStyle("rgba(255,203,63,.1)"), 
            g.fill(), g.setLineWidth(.5), g.setStrokeStyle("rgba(228,55,14,.1)"), g.stroke(), 
            g.restore(), c.push({
                turn: s * u + "turn",
                lineTurn: s * u + u / 2 + "turn",
                award: o[s].title,
                url: o[s].icon
            });
            i.setData({
                awardsList: c
            });
            for (var h = 7.5, f = 7.5, w = [], s = 0; s < 24; s++) {
                if (0 == s) f = 15, h = 15; else if (s < 6) f = 7.5, h += 102.5; else if (6 == s) f = 15, 
                h = 620; else if (s < 12) f += 94, h = 620; else if (12 == s) f = 565, h = 620; else if (s < 18) f = 570, 
                h -= 102.5; else if (18 == s) f = 565, h = 15; else {
                    if (!(s < 24)) return;
                    f -= 94, h = 7.5;
                }
                w.push({
                    topCircle: f,
                    leftCircle: h
                });
            }
            i.setData({
                circleList: w
            }), setInterval(function() {
                "#FFDF2F" == i.data.colorCircleFirst ? i.setData({
                    colorCircleFirst: "#FE4D32",
                    colorCircleSecond: "#FFDF2F"
                }) : i.setData({
                    colorCircleFirst: "#FFDF2F",
                    colorCircleSecond: "#FE4D32"
                });
            }, 500);
            for (var y = [], D = 25, v = 25, F = 0; F < 8; F++) {
                0 == F ? (D = 25, v = 25) : F < 3 ? (D = D, v = v + 166.6666 + 15) : F < 5 ? (v = v, 
                D = D + 150 + 15) : F < 7 ? (v = v - 166.6666 - 15, D = D) : F < 8 && (v = v, D = D - 150 - 15);
                var b = i.data.imageAward[F], x = e[F];
                y.push({
                    topAward: D,
                    leftAward: v,
                    imageAward: b,
                    titlesa: x
                });
            }
            i.setData({
                awardList: y
            });
        }), t.get("zy/lottery/lottery_info", {
            id: s
        }, function(t) {
            i.setData({
                bgul: t.data
            }), wx.setNavigationBarTitle({
                title: t.data.lottery_title
            }), e.wxParse("wxParseData", "html", t.intro, i, "10");
        });
    },
    onReady: function() {
        a.setFillStyle("#EFEFEF"), a.fillRect(0, 0, 440, 250.75), a.draw();
    },
    getLottery: function() {
        var a = this, e = a.data.id, i = 6 * Math.random() >>> 0, s = a.data.bgul.has_changes - 1, n = a.data.lastDegs, r = a.data.lastId;
        a.setData({
            bgul2: s
        });
        var o = a.data.aas, l = o.length;
        i < 2 && (o.chance = !1), t.get("zy/lottery/getreward", {
            lottery: e
        }, function(i) {
            if (a.setData({
                ddd: i
            }), "number" != typeof a.data.ddd.id) setTimeout(function() {
                wx.showModal({
                    title: "提示",
                    content: i.info + "",
                    showCancel: !1
                }), a.data.bgul.has_changes >= 1 && a.setData({
                    btnDisabled: ""
                });
            }, 500); else {
                var s = i.id;
                t.get("zy/lottery/reward", {
                    lottery: e,
                    reward: s
                }, function(t) {});
                var o = n - 360 / l * (a.data.ddd.id - r) + 2880, d = wx.createAnimation({
                    duration: 8e3,
                    timingFunction: "ease"
                });
                a.animationRun = d, d.rotate(o).step(), a.setData({
                    lastDegs: o,
                    lastId: a.data.ddd.id,
                    animationData: d.export(),
                    btnDisabled: "disabled"
                }), setTimeout(function() {
                    wx.showModal({
                        title: "提示",
                        content: i.info + "",
                        showCancel: !1
                    }), a.data.bgul.has_changes >= 1 && a.setData({
                        btnDisabled: ""
                    });
                }, 8500);
            }
        }), t.get("zy/lottery/lottery_info", {
            id: e
        }, function(t) {
            a.setData({
                bgul: t.data
            });
        });
    },
    touchStart: function(e) {
        var i = this, s = i.data.id, n = e.changedTouches[0].x, r = e.changedTouches[0].y;
        t.get("zy/lottery/getreward", {
            lottery: s
        }, function(t) {
            a.save(), a.beginPath(), a.clearRect(n, r, 50, 50), a.restore(), i.setData({
                guagua: t
            });
        }), t.get("zy/lottery/lottery_info", {
            id: s
        }, function(t) {
            i.setData({
                bgul: t.data
            });
        });
    },
    touchMove: function(t) {
        var e = t.changedTouches[0].x, i = t.changedTouches[0].y;
        a.save(), a.moveTo(this.startX, this.startY), a.clearRect(e, i, 50, 50), a.restore(), 
        this.startX = e, this.startY = i, wx.drawCanvas({
            canvasId: "myCanvas",
            reserve: !0,
            actions: a.getActions()
        });
    },
    touchEnd: function() {
        var e = this.data.guagua.id;
        if ("number" != typeof e) wx.showModal({
            title: "提示",
            content: this.data.guagua.info + "",
            showCancel: !1
        }); else {
            var i = this.data.id;
            t.get("zy/lottery/reward", {
                lottery: i,
                reward: e
            }, function(t) {});
            var s = this.data.guagua.info;
            wx.showModal({
                title: "提示",
                content: s + "",
                showCancel: !1
            });
        }
        a.setFillStyle("#EFEFEF"), a.fillRect(0, 0, 400, 200.75), a.draw();
    },
    startGame: function() {
        if (!this.data.isRunning) {
            this.setData({
                isRunning: !0
            });
            var a = this, e = a.data.id;
            t.get("zy/lottery/getreward", {
                lottery: e
            }, function(i) {
                var s = i.id;
                if ("number" != typeof s) wx.showModal({
                    title: "",
                    content: i.info + "",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm;
                    }
                }), a.data.bgul.has_changes < 1 ? a.setData({
                    isRunning: !0
                }) : a.setData({
                    isRunning: !1
                }); else {
                    t.get("zy/lottery/reward&=", {
                        lottery: e,
                        reward: s
                    }, function(t) {}), 0 == s && (s = 8);
                    var n = a.data.indexSelect, r = 200, o = setInterval(function() {
                        n++, (r += 50) > 1e3 && n == s && (clearInterval(o), wx.showModal({
                            title: "提示",
                            content: i.info + "",
                            showCancel: !1,
                            success: function(t) {
                                t.confirm;
                            }
                        }), a.data.bgul.has_changes < 1 ? a.setData({
                            isRunning: !0
                        }) : a.setData({
                            isRunning: !1
                        })), n %= 8, a.setData({
                            indexSelect: n
                        });
                    }, r);
                }
            }), t.get("zy/lottery/lottery_info", {
                id: e
            }, function(t) {
                a.setData({
                    bgul: t.data
                });
            });
        }
    }
});
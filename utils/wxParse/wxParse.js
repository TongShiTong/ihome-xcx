function e(e) {
    var t = e.target.dataset.src, a = e.target.dataset.from;
    void 0 !== a && a.length > 0 && wx.previewImage({
        current: t,
        urls: this.data[a].imageUrls
    });
}

function t(e) {
    var t = e.target.dataset.from, a = e.target.dataset.idx;
    void 0 !== t && t.length > 0 && function(e, t, a, r) {
        var n, s = a.data[r];
        if (s && 0 != s.images.length) {
            var l = s.images, h = function(e, t, a, i) {
                var r = 0, n = 0, s = 0, l = {}, h = a.data[i].view.imagePadding;
                return e > (r = d - 2 * h) ? (s = (n = r) * t / e, l.imageWidth = n, l.imageheight = s) : (l.imageWidth = e, 
                l.imageheight = t), (d <= 0 || o <= 0) && wx.getSystemInfo({
                    success: function(t) {
                        d = t.windowWidth, o = t.windowHeight, l.imageWidth = e > d ? d - 2 * h : e;
                    }
                }), l;
            }(e.detail.width, e.detail.height, a, r), g = l[t].index, m = "".concat(r), v = !0, u = !1, f = void 0;
            try {
                for (var w, c = g.split(".")[Symbol.iterator](); !(v = (w = c.next()).done); v = !0) {
                    var x = w.value;
                    m += ".nodes[".concat(x, "]");
                }
            } catch (e) {
                u = !0, f = e;
            } finally {
                try {
                    v || null == c.return || c.return();
                } finally {
                    if (u) throw f;
                }
            }
            var P = m + ".width", p = m + ".height";
            a.setData((n = {}, (0, i.default)(n, P, h.imageWidth), (0, i.default)(n, p, h.imageheight), 
            n));
        }
    }(e, a, this, t);
}

var a = require("../../@nihaowl/runtime/helpers/interopRequireDefault"), i = a(require("../../@nihaowl/runtime/helpers/defineProperty")), r = a(require("./showdown.js")), n = a(require("./html2json.js")), d = 0, o = 0;

wx.getSystemInfo({
    success: function(e) {
        d = e.windowWidth, o = e.windowHeight;
    }
}), module.exports = {
    wxParse: function() {
        var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wxParseData", i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "html", d = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', o = arguments.length > 3 ? arguments[3] : void 0, s = arguments.length > 4 ? arguments[4] : void 0;
        if (d && "" != d) {
            var l = o, h = {};
            if ("html" == i) h = n.default.html2json(d, a); else if ("md" == i || "markdown" == i) {
                var g = new r.default.Converter().makeHtml(d);
                h = n.default.html2json(g, a);
            }
            h.view = {}, h.view.imagePadding = 0, void 0 !== s && (h.view.imagePadding = s);
            var m = {};
            m[a] = h, l.setData(m), l.wxParseImgLoad = t, l.wxParseImgTap = e;
        }
    },
    wxParseTemArray: function(e, t, a, i) {
        for (var r = [], n = i.data, d = null, o = 0; o < a; o++) {
            var s = n[t + o].nodes;
            r.push(s);
        }
        e = e || "wxParseTemArray", (d = JSON.parse('{"' + e + '":""}'))[e] = r, i.setData(d);
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", a = arguments.length > 2 ? arguments[2] : void 0;
        n.default.emojisInit(e, t, a);
    }
};
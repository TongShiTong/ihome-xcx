function r(n, e, i, o) {
    var u;
    if (p.isArray(e)) p.each(e, function(e, u) {
        i || s.test(n) ? o(n, u) : r(n + "[" + ("object" === (0, t.default)(u) ? e : "") + "]", u, i, o);
    }); else if (i || "object" !== p.type(e)) o(n, e); else for (u in e) r(n + "[" + u + "]", e[u], i, o);
}

function n(r) {
    var n = r.length, t = p.type(r);
    return !p.isWindow(r) && (!(1 !== r.nodeType || !n) || "array" === t || "function" !== t && (0 === n || "number" == typeof n && n > 0 && n - 1 in r));
}

var t = require("../@nihaowl/runtime/helpers/interopRequireDefault")(require("../@nihaowl/runtime/helpers/typeof")), e = {}, i = [], o = i.push, u = i.indexOf, a = e.toString, f = e.hasOwnProperty, l = "1.10.2".trim, c = /%20/g, s = /\[\]$/, p = {
    isFunction: function(r) {
        return "function" === p.type(r);
    },
    isArray: Array.isArray || function(r) {
        return "array" === p.type(r);
    },
    isWindow: function(r) {
        return null != r && r == r.window;
    },
    isNumeric: function(r) {
        return !isNaN(parseFloat(r)) && isFinite(r);
    },
    type: function(r) {
        return null == r ? String(r) : "object" === (0, t.default)(r) || "function" == typeof r ? e[a.call(r)] || "object" : (0, 
        t.default)(r);
    },
    isPlainObject: function(r) {
        var n;
        if (!r || "object" !== p.type(r) || r.nodeType || p.isWindow(r)) return !1;
        try {
            if (r.constructor && !f.call(r, "constructor") && !f.call(r.constructor.prototype, "isPrototypeOf")) return !1;
        } catch (r) {
            return !1;
        }
        if (p.support.ownLast) for (n in r) return f.call(r, n);
        for (n in r) ;
        return void 0 === n || f.call(r, n);
    },
    isEmptyObject: function(r) {
        var n;
        for (n in r) return !1;
        return !0;
    },
    each: function(r, t, e) {
        var i = 0, o = r.length, u = n(r);
        if (e) {
            if (u) for (;i < o && !1 !== t.apply(r[i], e); i++) ; else for (i in r) if (!1 === t.apply(r[i], e)) break;
        } else if (u) for (;i < o && !1 !== t.call(r[i], i, r[i]); i++) ; else for (i in r) if (!1 === t.call(r[i], i, r[i])) break;
        return r;
    },
    trim: l && !l.call("\ufeff ") ? function(r) {
        return null == r ? "" : l.call(r);
    } : function(r) {
        return null == r ? "" : (r + "").replace(rtrim, "");
    },
    makeArray: function(r, t) {
        var e = t || [];
        return null != r && (n(Object(r)) ? p.merge(e, "string" == typeof r ? [ r ] : r) : o.call(e, r)), 
        e;
    },
    inArray: function(r, n, t) {
        var e;
        if (n) {
            if (u) return u.call(n, r, t);
            for (e = n.length, t = t ? t < 0 ? Math.max(0, e + t) : t : 0; t < e; t++) if (t in n && n[t] === r) return t;
        }
        return -1;
    },
    merge: function(r, n) {
        var t = n.length, e = r.length, i = 0;
        if ("number" == typeof t) for (;i < t; i++) r[e++] = n[i]; else for (;void 0 !== n[i]; ) r[e++] = n[i++];
        return r.length = e, r;
    },
    isMobile: function(r) {
        return "" !== p.trim(r) && /^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(p.trim(r));
    },
    toFixed: function(r, n) {
        var t = parseInt(n) || 0;
        if (t < -20 || t > 100) throw new RangeError("Precision of " + t + " fractional digits is out of range");
        var e = Number(r);
        if (isNaN(e)) return "NaN";
        var i, o = "";
        if (e <= 0 && (o = "-", e = -e), e >= Math.pow(10, 21)) return o + e.toString();
        if (i = 0 == (n = Math.round(e * Math.pow(10, t))) ? "0" : n.toString(), 0 == t) return o + i;
        var u = i.length;
        return u <= t && (i = Math.pow(10, t + 1 - u).toString().substring(1) + i, u = t + 1), 
        t > 0 && (i = i.substring(0, u - t) + "." + i.substring(u - t)), o + i;
    }
};

p.extend = function() {
    var r, n, e, i, o, u, a = arguments[0] || {}, f = 1, l = arguments.length, c = !1;
    for ("boolean" == typeof a && (c = a, a = arguments[1] || {}, f = 2), "object" === (0, 
    t.default)(a) || p.isFunction(a) || (a = {}), l === f && (a = this, --f); f < l; f++) if (null != (r = arguments[f])) for (n in r) e = a[n], 
    a !== (i = r[n]) && (c && i && (p.isPlainObject(i) || (o = p.isArray(i))) ? (o ? (o = !1, 
    u = e && p.isArray(e) ? e : []) : u = e && p.isPlainObject(e) ? e : {}, a[n] = p.extend(c, u, i)) : void 0 !== i && (a[n] = i));
    return a;
}, p.param = function(n, t) {
    var e, i = [], o = function(r, n) {
        n = p.isFunction(n) ? n() : null == n ? "" : n, i[i.length] = encodeURIComponent(r) + "=" + encodeURIComponent(n);
    };
    if (void 0 === t && (t = !1), p.isArray(n) || n.jquery && !p.isPlainObject(n)) p.each(n, function() {
        o(this.name, this.value);
    }); else for (e in n) r(e, n[e], t, o);
    return i.join("&").replace(c, "+");
}, module.exports = p;
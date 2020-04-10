function e(e) {
    for (var t = {}, r = e.split(","), a = 0; a < r.length; a++) t[r[a]] = !0;
    return t;
}

function t(e) {
    var t = [];
    if (0 == r.length || !s) return (d = {
        node: "text"
    }).text = e, o = [ d ];
    e = e.replace(/\[([^\[\]]+)\]/g, ":$1:");
    for (var n = new RegExp("[:]"), o = e.split(n), i = 0; i < o.length; i++) {
        var l = o[i], d = {};
        s[l] ? (d.node = "element", d.tag = "emoji", d.text = s[l], d.baseSrc = a) : (d.node = "text", 
        d.text = l), t.push(d);
    }
    return t;
}

var r = "", a = "", s = {}, n = require("./wxDiscode.js"), o = require("./htmlparser.js"), i = (e("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), 
e("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video")), l = e("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), d = e("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

e("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), 
e("wxxxcode-style,script,style,view,scroll-view,block"), module.exports = {
    html2json: function(e, r) {
        e = function(e) {
            return e.replace(/\r?\n+/g, "").replace(/<!--.*?-->/gi, "").replace(/\/\*.*?\*\//gi, "").replace(/[ ]+</gi, "<");
        }(e = e.replace(/<\?xml.*\?>\n/, "").replace(/<.*!doctype.*\>\n/, "").replace(/<.*!DOCTYPE.*\>\n/, "")), 
        e = n.strDiscode(e);
        var a = [], s = {
            node: r,
            nodes: [],
            images: [],
            imageUrls: []
        }, c = 0;
        return o(e, {
            start: function(e, t, o) {
                var p, u = {
                    node: "element",
                    tag: e
                };
                if (0 === a.length ? (u.index = c.toString(), c += 1) : (void 0 === (p = a[0]).nodes && (p.nodes = []), 
                u.index = p.index + "." + p.nodes.length), i[e] ? u.tagType = "block" : l[e] ? u.tagType = "inline" : d[e] && (u.tagType = "closeSelf"), 
                0 !== t.length && (u.attr = t.reduce(function(e, t) {
                    var r = t.name, a = t.value;
                    return "class" == r && (u.classStr = a), "style" == r && (u.styleStr = a), a.match(/ /) && (a = a.split(" ")), 
                    e[r] ? Array.isArray(e[r]) ? e[r].push(a) : e[r] = [ e[r], a ] : e[r] = a, e;
                }, {})), "img" === u.tag) {
                    u.imgIndex = s.images.length, u.attr = u.attr || {};
                    var g = u.attr.src || [];
                    "" == g[0] && g.splice(0, 1), g = n.urlToHttpUrl(g, "https"), u.attr.src = g, u.from = r, 
                    s.images.push(u), s.imageUrls.push(g);
                }
                if ("font" === u.tag) {
                    var m = [ "x-small", "small", "medium", "large", "x-large", "xx-large", "-webkit-xxx-large" ], h = {
                        color: "color",
                        face: "font-family",
                        size: "font-size"
                    };
                    for (var f in u.attr.style || (u.attr.style = []), u.styleStr || (u.styleStr = ""), 
                    h) if (u.attr[f]) {
                        var v = "size" === f ? m[u.attr[f] - 1] : u.attr[f];
                        u.attr.style.push(h[f]), u.attr.style.push(v), u.styleStr += h[f] + ": " + v + ";";
                    }
                }
                "source" === u.tag && (s.source = u.attr.src), o ? (void 0 === (p = a[0] || s).nodes && (p.nodes = []), 
                p.nodes.push(u)) : a.unshift(u);
            },
            end: function(e) {
                var t = a.shift();
                if (t.tag !== e && console.error("invalid state: mismatch end tag"), "video" === t.tag && s.source && (t.attr.src = s.source, 
                delete s.source), 0 === a.length) s.nodes.push(t); else {
                    var r = a[0];
                    void 0 === r.nodes && (r.nodes = []), r.nodes.push(t);
                }
            },
            chars: function(e) {
                var r = {
                    node: "text",
                    text: e,
                    textArray: t(e)
                };
                if (0 === a.length) r.index = c.toString(), c += 1, s.nodes.push(r); else {
                    var n = a[0];
                    void 0 === n.nodes && (n.nodes = []), r.index = n.index + "." + n.nodes.length, 
                    n.nodes.push(r);
                }
            },
            comment: function(e) {}
        }), s;
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", n = arguments.length > 2 ? arguments[2] : void 0;
        r = e, a = t, s = n;
    }
};
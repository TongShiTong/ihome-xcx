function e(e) {
    var r = {
        omitExtraWLInCodeBlocks: {
            defaultValue: !1,
            describe: "Omit the default extra whiteline added to code blocks",
            type: "boolean"
        },
        noHeaderId: {
            defaultValue: !1,
            describe: "Turn on/off generated header id",
            type: "boolean"
        },
        prefixHeaderId: {
            defaultValue: !1,
            describe: "Specify a prefix to generated header ids",
            type: "string"
        },
        headerLevelStart: {
            defaultValue: !1,
            describe: "The header blocks level start",
            type: "integer"
        },
        parseImgDimensions: {
            defaultValue: !1,
            describe: "Turn on/off image dimension parsing",
            type: "boolean"
        },
        simplifiedAutoLink: {
            defaultValue: !1,
            describe: "Turn on/off GFM autolink style",
            type: "boolean"
        },
        literalMidWordUnderscores: {
            defaultValue: !1,
            describe: "Parse midword underscores as literal underscores",
            type: "boolean"
        },
        strikethrough: {
            defaultValue: !1,
            describe: "Turn on/off strikethrough support",
            type: "boolean"
        },
        tables: {
            defaultValue: !1,
            describe: "Turn on/off tables support",
            type: "boolean"
        },
        tablesHeaderId: {
            defaultValue: !1,
            describe: "Add an id to table headers",
            type: "boolean"
        },
        ghCodeBlocks: {
            defaultValue: !0,
            describe: "Turn on/off GFM fenced code blocks support",
            type: "boolean"
        },
        tasklists: {
            defaultValue: !1,
            describe: "Turn on/off GFM tasklist support",
            type: "boolean"
        },
        smoothLivePreview: {
            defaultValue: !1,
            describe: "Prevents weird effects in live previews due to incomplete input",
            type: "boolean"
        },
        smartIndentationFix: {
            defaultValue: !1,
            description: "Tries to smartly fix identation in es6 strings",
            type: "boolean"
        }
    };
    if (!1 === e) return JSON.parse(JSON.stringify(r));
    var t = {};
    for (var n in r) r.hasOwnProperty(n) && (t[n] = r[n].defaultValue);
    return t;
}

function r(e, r) {
    var t = r ? "Error in " + r + " extension->" : "Error in unnamed extension", s = {
        valid: !0,
        error: ""
    };
    a.helper.isArray(e) || (e = [ e ]);
    for (var o = 0; o < e.length; ++o) {
        var i = t + " sub-extension " + o + ": ", l = e[o];
        if ("object" !== (0, n.default)(l)) return s.valid = !1, s.error = i + "must be an object, but " + (0, 
        n.default)(l) + " given", s;
        if (!a.helper.isString(l.type)) return s.valid = !1, s.error = i + 'property "type" must be a string, but ' + (0, 
        n.default)(l.type) + " given", s;
        var c = l.type = l.type.toLowerCase();
        if ("language" === c && (c = l.type = "lang"), "html" === c && (c = l.type = "output"), 
        "lang" !== c && "output" !== c && "listener" !== c) return s.valid = !1, s.error = i + "type " + c + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"', 
        s;
        if ("listener" === c) {
            if (a.helper.isUndefined(l.listeners)) return s.valid = !1, s.error = i + '. Extensions of type "listener" must have a property called "listeners"', 
            s;
        } else if (a.helper.isUndefined(l.filter) && a.helper.isUndefined(l.regex)) return s.valid = !1, 
        s.error = i + c + ' extensions must define either a "regex" property or a "filter" method', 
        s;
        if (l.listeners) {
            if ("object" !== (0, n.default)(l.listeners)) return s.valid = !1, s.error = i + '"listeners" property must be an object but ' + (0, 
            n.default)(l.listeners) + " given", s;
            for (var u in l.listeners) if (l.listeners.hasOwnProperty(u) && "function" != typeof l.listeners[u]) return s.valid = !1, 
            s.error = i + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + u + " must be a function but " + (0, 
            n.default)(l.listeners[u]) + " given", s;
        }
        if (l.filter) {
            if ("function" != typeof l.filter) return s.valid = !1, s.error = i + '"filter" must be a function, but ' + (0, 
            n.default)(l.filter) + " given", s;
        } else if (l.regex) {
            if (a.helper.isString(l.regex) && (l.regex = new RegExp(l.regex, "g")), !l.regex instanceof RegExp) return s.valid = !1, 
            s.error = i + '"regex" property must either be a string or a RegExp object, but ' + (0, 
            n.default)(l.regex) + " given", s;
            if (a.helper.isUndefined(l.replace)) return s.valid = !1, s.error = i + '"regex" extensions must implement a replace string or function', 
            s;
        }
    }
    return s;
}

function t(e, r) {
    return "~E" + r.charCodeAt(0) + "E";
}

var n = require("../../@nihaowl/runtime/helpers/interopRequireDefault")(require("../../@nihaowl/runtime/helpers/typeof")), a = {}, s = {}, o = {}, i = e(!0), l = {
    github: {
        omitExtraWLInCodeBlocks: !0,
        prefixHeaderId: "user-content-",
        simplifiedAutoLink: !0,
        literalMidWordUnderscores: !0,
        strikethrough: !0,
        tables: !0,
        tablesHeaderId: !0,
        ghCodeBlocks: !0,
        tasklists: !0
    },
    vanilla: e(!0)
};

a.helper = {}, a.extensions = {}, a.setOption = function(e, r) {
    return i[e] = r, this;
}, a.getOption = function(e) {
    return i[e];
}, a.getOptions = function() {
    return i;
}, a.resetOptions = function() {
    i = e(!0);
}, a.setFlavor = function(e) {
    if (l.hasOwnProperty(e)) {
        var r = l[e];
        for (var t in r) r.hasOwnProperty(t) && (i[t] = r[t]);
    }
}, a.getDefaultOptions = function(r) {
    return e(r);
}, a.subParser = function(e, r) {
    if (a.helper.isString(e)) {
        if (void 0 === r) {
            if (s.hasOwnProperty(e)) return s[e];
            throw Error("SubParser named " + e + " not registered!");
        }
        s[e] = r;
    }
}, a.extension = function(e, t) {
    if (!a.helper.isString(e)) throw Error("Extension 'name' must be a string");
    if (e = a.helper.stdExtName(e), a.helper.isUndefined(t)) {
        if (!o.hasOwnProperty(e)) throw Error("Extension named " + e + " is not registered!");
        return o[e];
    }
    "function" == typeof t && (t = t()), a.helper.isArray(t) || (t = [ t ]);
    var n = r(t, e);
    if (!n.valid) throw Error(n.error);
    o[e] = t;
}, a.getAllExtensions = function() {
    return o;
}, a.removeExtension = function(e) {
    delete o[e];
}, a.resetExtensions = function() {
    o = {};
}, a.validateExtension = function(e) {
    var t = r(e, null);
    return !!t.valid || (console.warn(t.error), !1);
}, a.hasOwnProperty("helper") || (a.helper = {}), a.helper.isString = function(e) {
    return "string" == typeof e || e instanceof String;
}, a.helper.isFunction = function(e) {
    return e && "[object Function]" === {}.toString.call(e);
}, a.helper.forEach = function(e, r) {
    if ("function" == typeof e.forEach) e.forEach(r); else for (var t = 0; t < e.length; t++) r(e[t], t, e);
}, a.helper.isArray = function(e) {
    return e.constructor === Array;
}, a.helper.isUndefined = function(e) {
    return void 0 === e;
}, a.helper.stdExtName = function(e) {
    return e.replace(/[_-]||\s/g, "").toLowerCase();
}, a.helper.escapeCharactersCallback = t, a.helper.escapeCharacters = function(e, r, n) {
    var a = "([" + r.replace(/([\[\]\\])/g, "\\$1") + "])";
    n && (a = "\\\\" + a);
    var s = new RegExp(a, "g");
    return e = e.replace(s, t);
};

var c = function(e, r, t, n) {
    var a, s, o, i, l, c = n || "", u = c.indexOf("g") > -1, p = new RegExp(r + "|" + t, "g" + c.replace(/g/g, "")), h = new RegExp(r, c.replace(/g/g, "")), d = [];
    do {
        for (a = 0; o = p.exec(e); ) if (h.test(o[0])) a++ || (i = (s = p.lastIndex) - o[0].length); else if (a && !--a) {
            l = o.index + o[0].length;
            var f = {
                left: {
                    start: i,
                    end: s
                },
                match: {
                    start: s,
                    end: o.index
                },
                right: {
                    start: o.index,
                    end: l
                },
                wholeMatch: {
                    start: i,
                    end: l
                }
            };
            if (d.push(f), !u) return d;
        }
    } while (a && (p.lastIndex = s));
    return d;
};

a.helper.matchRecursiveRegExp = function(e, r, t, n) {
    for (var a = c(e, r, t, n), s = [], o = 0; o < a.length; ++o) s.push([ e.slice(a[o].wholeMatch.start, a[o].wholeMatch.end), e.slice(a[o].match.start, a[o].match.end), e.slice(a[o].left.start, a[o].left.end), e.slice(a[o].right.start, a[o].right.end) ]);
    return s;
}, a.helper.replaceRecursiveRegExp = function(e, r, t, n, s) {
    if (!a.helper.isFunction(r)) {
        var o = r;
        r = function() {
            return o;
        };
    }
    var i = c(e, t, n, s), l = e, u = i.length;
    if (u > 0) {
        var p = [];
        0 !== i[0].wholeMatch.start && p.push(e.slice(0, i[0].wholeMatch.start));
        for (var h = 0; h < u; ++h) p.push(r(e.slice(i[h].wholeMatch.start, i[h].wholeMatch.end), e.slice(i[h].match.start, i[h].match.end), e.slice(i[h].left.start, i[h].left.end), e.slice(i[h].right.start, i[h].right.end))), 
        h < u - 1 && p.push(e.slice(i[h].wholeMatch.end, i[h + 1].wholeMatch.start));
        i[u - 1].wholeMatch.end < e.length && p.push(e.slice(i[u - 1].wholeMatch.end)), 
        l = p.join("");
    }
    return l;
}, a.helper.isUndefined(console) && (console = {
    warn: function(e) {
        alert(e);
    },
    log: function(e) {
        alert(e);
    },
    error: function(e) {
        throw e;
    }
}), a.Converter = function(e) {
    function t(e, t) {
        if (t = t || null, a.helper.isString(e)) {
            if (t = e = a.helper.stdExtName(e), a.extensions[e]) return console.warn("DEPRECATION WARNING: " + e + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"), 
            void function(e, t) {
                "function" == typeof e && (e = e(new a.Converter())), a.helper.isArray(e) || (e = [ e ]);
                var n = r(e, t);
                if (!n.valid) throw Error(n.error);
                for (var s = 0; s < e.length; ++s) switch (e[s].type) {
                  case "lang":
                    u.push(e[s]);
                    break;

                  case "output":
                    p.push(e[s]);
                    break;

                  default:
                    throw Error("Extension loader error: Type unrecognized!!!");
                }
            }(a.extensions[e], e);
            if (a.helper.isUndefined(o[e])) throw Error('Extension "' + e + '" could not be loaded. It was either not found or is not a valid extension.');
            e = o[e];
        }
        "function" == typeof e && (e = e()), a.helper.isArray(e) || (e = [ e ]);
        var n = r(e, t);
        if (!n.valid) throw Error(n.error);
        for (var i = 0; i < e.length; ++i) {
            switch (e[i].type) {
              case "lang":
                u.push(e[i]);
                break;

              case "output":
                p.push(e[i]);
            }
            if (e[i].hasOwnProperty(h)) for (var l in e[i].listeners) e[i].listeners.hasOwnProperty(l) && s(l, e[i].listeners[l]);
        }
    }
    function s(e, r) {
        if (!a.helper.isString(e)) throw Error("Invalid argument in converter.listen() method: name must be a string, but " + (0, 
        n.default)(e) + " given");
        if ("function" != typeof r) throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + (0, 
        n.default)(r) + " given");
        h.hasOwnProperty(e) || (h[e] = []), h[e].push(r);
    }
    var c = {}, u = [], p = [], h = {};
    !function() {
        for (var r in e = e || {}, i) i.hasOwnProperty(r) && (c[r] = i[r]);
        if ("object" !== (0, n.default)(e)) throw Error("Converter expects the passed parameter to be an object, but " + (0, 
        n.default)(e) + " was passed instead.");
        for (var s in e) e.hasOwnProperty(s) && (c[s] = e[s]);
        c.extensions && a.helper.forEach(c.extensions, t);
    }(), this._dispatch = function(e, r, t, n) {
        if (h.hasOwnProperty(e)) for (var a = 0; a < h[e].length; ++a) {
            var s = h[e][a](e, r, this, t, n);
            s && void 0 !== s && (r = s);
        }
        return r;
    }, this.listen = function(e, r) {
        return s(e, r), this;
    }, this.makeHtml = function(e) {
        if (!e) return e;
        var r = {
            gHtmlBlocks: [],
            gHtmlMdBlocks: [],
            gHtmlSpans: [],
            gUrls: {},
            gTitles: {},
            gDimensions: {},
            gListLevel: 0,
            hashLinkCounts: {},
            langExtensions: u,
            outputModifiers: p,
            converter: this,
            ghCodeBlocks: []
        };
        return e = (e = (e = (e = e.replace(/~/g, "~T")).replace(/\$/g, "~D")).replace(/\r\n/g, "\n")).replace(/\r/g, "\n"), 
        c.smartIndentationFix && (e = function(e) {
            var r = e.match(/^\s*/)[0].length, t = new RegExp("^\\s{0," + r + "}", "gm");
            return e.replace(t, "");
        }(e)), e = e, e = a.subParser("detab")(e, c, r), e = a.subParser("stripBlankLines")(e, c, r), 
        a.helper.forEach(u, function(t) {
            e = a.subParser("runExtension")(t, e, c, r);
        }), e = a.subParser("hashPreCodeTags")(e, c, r), e = a.subParser("githubCodeBlocks")(e, c, r), 
        e = a.subParser("hashHTMLBlocks")(e, c, r), e = a.subParser("hashHTMLSpans")(e, c, r), 
        e = a.subParser("stripLinkDefinitions")(e, c, r), e = a.subParser("blockGamut")(e, c, r), 
        e = a.subParser("unhashHTMLSpans")(e, c, r), e = (e = (e = a.subParser("unescapeSpecialChars")(e, c, r)).replace(/~D/g, "$$")).replace(/~T/g, "~"), 
        a.helper.forEach(p, function(t) {
            e = a.subParser("runExtension")(t, e, c, r);
        }), e;
    }, this.setOption = function(e, r) {
        c[e] = r;
    }, this.getOption = function(e) {
        return c[e];
    }, this.getOptions = function() {
        return c;
    }, this.addExtension = function(e, r) {
        t(e, r = r || null);
    }, this.useExtension = function(e) {
        t(e);
    }, this.setFlavor = function(e) {
        if (l.hasOwnProperty(e)) {
            var r = l[e];
            for (var t in r) r.hasOwnProperty(t) && (c[t] = r[t]);
        }
    }, this.removeExtension = function(e) {
        a.helper.isArray(e) || (e = [ e ]);
        for (var r = 0; r < e.length; ++r) {
            for (var t = e[r], n = 0; n < u.length; ++n) u[n] === t && u[n].splice(n, 1);
            for (;0 < p.length; ++n) p[0] === t && p[0].splice(n, 1);
        }
    }, this.getAllExtensions = function() {
        return {
            language: u,
            output: p
        };
    };
}, a.subParser("anchors", function(e, r, t) {
    var n = function(e, r, n, s, o, i, l, c) {
        a.helper.isUndefined(c) && (c = ""), e = r;
        var u = n, p = s.toLowerCase(), h = o, d = c;
        if (!h) if (p || (p = u.toLowerCase().replace(/ ?\n/g, " ")), h = "#" + p, a.helper.isUndefined(t.gUrls[p])) {
            if (!(e.search(/\(\s*\)$/m) > -1)) return e;
            h = "";
        } else h = t.gUrls[p], a.helper.isUndefined(t.gTitles[p]) || (d = t.gTitles[p]);
        var f = '<a href="' + (h = a.helper.escapeCharacters(h, "*_", !1)) + '"';
        return "" !== d && null !== d && (d = d.replace(/"/g, "&quot;"), f += ' title="' + (d = a.helper.escapeCharacters(d, "*_", !1)) + '"'), 
        f += ">" + u + "</a>";
    };
    return e = (e = (e = (e = t.converter._dispatch("anchors.before", e, r, t)).replace(/(\[((?:\[[^\]]*]|[^\[\]])*)][ ]?(?:\n[ ]*)?\[(.*?)])()()()()/g, n)).replace(/(\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, n)).replace(/(\[([^\[\]]+)])()()()()()/g, n), 
    e = t.converter._dispatch("anchors.after", e, r, t);
}), a.subParser("autoLinks", function(e, r, t) {
    function n(e, r) {
        var t = r;
        return /^www\./i.test(r) && (r = r.replace(/^www\./i, "http://www.")), '<a href="' + r + '">' + t + "</a>";
    }
    function s(e, r) {
        var t = a.subParser("unescapeSpecialChars")(r);
        return a.subParser("encodeEmailAddress")(t);
    }
    return e = (e = (e = t.converter._dispatch("autoLinks.before", e, r, t)).replace(/<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)>/gi, n)).replace(/<(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, s), 
    r.simplifiedAutoLink && (e = (e = e.replace(/\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+)(?=\s|$)(?!["<>])/gi, n)).replace(/(?:^|[ \n\t])([A-Za-z0-9!#$%&'*+-\/=?^_`\{|}~\.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?:$|[ \n\t])/gi, s)), 
    e = t.converter._dispatch("autoLinks.after", e, r, t);
}), a.subParser("blockGamut", function(e, r, t) {
    e = t.converter._dispatch("blockGamut.before", e, r, t), e = a.subParser("blockQuotes")(e, r, t), 
    e = a.subParser("headers")(e, r, t);
    var n = a.subParser("hashBlock")("<hr />", r, t);
    return e = (e = (e = e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, n)).replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm, n)).replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, n), 
    e = a.subParser("lists")(e, r, t), e = a.subParser("codeBlocks")(e, r, t), e = a.subParser("tables")(e, r, t), 
    e = a.subParser("hashHTMLBlocks")(e, r, t), e = a.subParser("paragraphs")(e, r, t), 
    e = t.converter._dispatch("blockGamut.after", e, r, t);
}), a.subParser("blockQuotes", function(e, r, t) {
    return e = (e = t.converter._dispatch("blockQuotes.before", e, r, t)).replace(/((^[ \t]{0,3}>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(e, n) {
        var s = n;
        return s = (s = (s = s.replace(/^[ \t]*>[ \t]?/gm, "~0")).replace(/~0/g, "")).replace(/^[ \t]+$/gm, ""), 
        s = a.subParser("githubCodeBlocks")(s, r, t), s = (s = (s = a.subParser("blockGamut")(s, r, t)).replace(/(^|\n)/g, "$1  ")).replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(e, r) {
            var t = r;
            return t = (t = t.replace(/^  /gm, "~0")).replace(/~0/g, "");
        }), a.subParser("hashBlock")("<blockquote>\n" + s + "\n</blockquote>", r, t);
    }), e = t.converter._dispatch("blockQuotes.after", e, r, t);
}), a.subParser("codeBlocks", function(e, r, t) {
    return e = t.converter._dispatch("codeBlocks.before", e, r, t), e = (e = (e += "~0").replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function(e, n, s) {
        var o = n, i = s, l = "\n";
        return o = a.subParser("outdent")(o), o = a.subParser("encodeCode")(o), o = (o = (o = a.subParser("detab")(o)).replace(/^\n+/g, "")).replace(/\n+$/g, ""), 
        r.omitExtraWLInCodeBlocks && (l = ""), o = "<pre><code>" + o + l + "</code></pre>", 
        a.subParser("hashBlock")(o, r, t) + i;
    })).replace(/~0/, ""), e = t.converter._dispatch("codeBlocks.after", e, r, t);
}), a.subParser("codeSpans", function(e, r, t) {
    return void 0 === (e = t.converter._dispatch("codeSpans.before", e, r, t)) && (e = ""), 
    e = e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(e, r, t, n) {
        var s = n;
        return s = (s = s.replace(/^([ \t]*)/g, "")).replace(/[ \t]*$/g, ""), r + "<code>" + (s = a.subParser("encodeCode")(s)) + "</code>";
    }), e = t.converter._dispatch("codeSpans.after", e, r, t);
}), a.subParser("detab", function(e) {
    return e = (e = (e = (e = (e = e.replace(/\t(?=\t)/g, "    ")).replace(/\t/g, "~A~B")).replace(/~B(.+?)~A/g, function(e, r) {
        for (var t = r, n = 4 - t.length % 4, a = 0; a < n; a++) t += " ";
        return t;
    })).replace(/~A/g, "    ")).replace(/~B/g, "");
}), a.subParser("encodeAmpsAndAngles", function(e) {
    return e = (e = e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;")).replace(/<(?![a-z\/?\$!])/gi, "&lt;");
}), a.subParser("encodeBackslashEscapes", function(e) {
    return e = (e = e.replace(/\\(\\)/g, a.helper.escapeCharactersCallback)).replace(/\\([`*_{}\[\]()>#+-.!])/g, a.helper.escapeCharactersCallback);
}), a.subParser("encodeCode", function(e) {
    return e = (e = (e = e.replace(/&/g, "&amp;")).replace(/</g, "&lt;")).replace(/>/g, "&gt;"), 
    e = a.helper.escapeCharacters(e, "*_{}[]\\", !1);
}), a.subParser("encodeEmailAddress", function(e) {
    var r = [ function(e) {
        return "&#" + e.charCodeAt(0) + ";";
    }, function(e) {
        return "&#x" + e.charCodeAt(0).toString(16) + ";";
    }, function(e) {
        return e;
    } ];
    return e = (e = '<a href="' + (e = (e = "mailto:" + e).replace(/./g, function(e) {
        if ("@" === e) e = r[Math.floor(2 * Math.random())](e); else if (":" !== e) {
            var t = Math.random();
            e = t > .9 ? r[2](e) : t > .45 ? r[1](e) : r[0](e);
        }
        return e;
    })) + '">' + e + "</a>").replace(/">.+:/g, '">');
}), a.subParser("escapeSpecialCharsWithinTagAttributes", function(e) {
    return e = e.replace(/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi, function(e) {
        var r = e.replace(/(.)<\/?code>(?=.)/g, "$1`");
        return r = a.helper.escapeCharacters(r, "\\`*_", !1);
    });
}), a.subParser("githubCodeBlocks", function(e, r, t) {
    return r.ghCodeBlocks ? (e = t.converter._dispatch("githubCodeBlocks.before", e, r, t), 
    e = (e = (e += "~0").replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function(e, n, s) {
        var o = r.omitExtraWLInCodeBlocks ? "" : "\n";
        return s = a.subParser("encodeCode")(s), s = "<pre><code" + (n ? ' class="' + n + " language-" + n + '"' : "") + ">" + (s = (s = (s = a.subParser("detab")(s)).replace(/^\n+/g, "")).replace(/\n+$/g, "")) + o + "</code></pre>", 
        s = a.subParser("hashBlock")(s, r, t), "\n\n~G" + (t.ghCodeBlocks.push({
            text: e,
            codeblock: s
        }) - 1) + "G\n\n";
    })).replace(/~0/, ""), t.converter._dispatch("githubCodeBlocks.after", e, r, t)) : e;
}), a.subParser("hashBlock", function(e, r, t) {
    return e = e.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (t.gHtmlBlocks.push(e) - 1) + "K\n\n";
}), a.subParser("hashElement", function(e, r, t) {
    return function(e, r) {
        var n = r;
        return n = (n = (n = n.replace(/\n\n/g, "\n")).replace(/^\n/, "")).replace(/\n+$/g, ""), 
        n = "\n\n~K" + (t.gHtmlBlocks.push(n) - 1) + "K\n\n";
    };
}), a.subParser("hashHTMLBlocks", function(e, r, t) {
    for (var n = [ "pre", "div", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table", "dl", "ol", "ul", "script", "noscript", "form", "fieldset", "iframe", "math", "style", "section", "header", "footer", "nav", "article", "aside", "address", "audio", "canvas", "figure", "hgroup", "output", "video", "p" ], s = 0; s < n.length; ++s) e = a.helper.replaceRecursiveRegExp(e, function(e, r, n, a) {
        var s = e;
        return -1 !== n.search(/\bmarkdown\b/) && (s = n + t.converter.makeHtml(r) + a), 
        "\n\n~K" + (t.gHtmlBlocks.push(s) - 1) + "K\n\n";
    }, "^(?: |\\t){0,3}<" + n[s] + "\\b[^>]*>", "</" + n[s] + ">", "gim");
    return e = (e = (e = e.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, a.subParser("hashElement")(e, r, t))).replace(/(<!--[\s\S]*?-->)/g, a.subParser("hashElement")(e, r, t))).replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, a.subParser("hashElement")(e, r, t));
}), a.subParser("hashHTMLSpans", function(e, r, t) {
    for (var n = a.helper.matchRecursiveRegExp(e, "<code\\b[^>]*>", "</code>", "gi"), s = 0; s < n.length; ++s) e = e.replace(n[s][0], "~L" + (t.gHtmlSpans.push(n[s][0]) - 1) + "L");
    return e;
}), a.subParser("unhashHTMLSpans", function(e, r, t) {
    for (var n = 0; n < t.gHtmlSpans.length; ++n) e = e.replace("~L" + n + "L", t.gHtmlSpans[n]);
    return e;
}), a.subParser("hashPreCodeTags", function(e, r, t) {
    return e = a.helper.replaceRecursiveRegExp(e, function(e, r, n, s) {
        var o = n + a.subParser("encodeCode")(r) + s;
        return "\n\n~G" + (t.ghCodeBlocks.push({
            text: e,
            codeblock: o
        }) - 1) + "G\n\n";
    }, "^(?: |\\t){0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^(?: |\\t){0,3}</code>\\s*</pre>", "gim");
}), a.subParser("headers", function(e, r, t) {
    function n(e) {
        var r, n = e.replace(/[^\w]/g, "").toLowerCase();
        return t.hashLinkCounts[n] ? r = n + "-" + t.hashLinkCounts[n]++ : (r = n, t.hashLinkCounts[n] = 1), 
        !0 === s && (s = "section"), a.helper.isString(s) ? s + r : r;
    }
    e = t.converter._dispatch("headers.before", e, r, t);
    var s = r.prefixHeaderId, o = isNaN(parseInt(r.headerLevelStart)) ? 1 : parseInt(r.headerLevelStart), i = r.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm, l = r.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
    return e = (e = (e = e.replace(i, function(e, s) {
        var i = a.subParser("spanGamut")(s, r, t), l = r.noHeaderId ? "" : ' id="' + n(s) + '"', c = "<h" + o + l + ">" + i + "</h" + o + ">";
        return a.subParser("hashBlock")(c, r, t);
    })).replace(l, function(e, s) {
        var i = a.subParser("spanGamut")(s, r, t), l = r.noHeaderId ? "" : ' id="' + n(s) + '"', c = o + 1, u = "<h" + c + l + ">" + i + "</h" + c + ">";
        return a.subParser("hashBlock")(u, r, t);
    })).replace(/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm, function(e, s, i) {
        var l = a.subParser("spanGamut")(i, r, t), c = r.noHeaderId ? "" : ' id="' + n(i) + '"', u = o - 1 + s.length, p = "<h" + u + c + ">" + l + "</h" + u + ">";
        return a.subParser("hashBlock")(p, r, t);
    }), e = t.converter._dispatch("headers.after", e, r, t);
}), a.subParser("images", function(e, r, t) {
    function n(e, r, n, s, o, i, l, c) {
        var u = t.gUrls, p = t.gTitles, h = t.gDimensions;
        if (n = n.toLowerCase(), c || (c = ""), "" === s || null === s) {
            if ("" !== n && null !== n || (n = r.toLowerCase().replace(/ ?\n/g, " ")), s = "#" + n, 
            a.helper.isUndefined(u[n])) return e;
            s = u[n], a.helper.isUndefined(p[n]) || (c = p[n]), a.helper.isUndefined(h[n]) || (o = h[n].width, 
            i = h[n].height);
        }
        r = r.replace(/"/g, "&quot;"), r = a.helper.escapeCharacters(r, "*_", !1);
        var d = '<img src="' + (s = a.helper.escapeCharacters(s, "*_", !1)) + '" alt="' + r + '"';
        return c && (c = c.replace(/"/g, "&quot;"), d += ' title="' + (c = a.helper.escapeCharacters(c, "*_", !1)) + '"'), 
        o && i && (d += ' width="' + (o = "*" === o ? "auto" : o) + '"', d += ' height="' + (i = "*" === i ? "auto" : i) + '"'), 
        d += " />";
    }
    return e = (e = (e = t.converter._dispatch("images.before", e, r, t)).replace(/!\[([^\]]*?)] ?(?:\n *)?\[(.*?)]()()()()()/g, n)).replace(/!\[(.*?)]\s?\([ \t]*()<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(['"])(.*?)\6[ \t]*)?\)/g, n), 
    e = t.converter._dispatch("images.after", e, r, t);
}), a.subParser("italicsAndBold", function(e, r, t) {
    return e = t.converter._dispatch("italicsAndBold.before", e, r, t), e = r.literalMidWordUnderscores ? (e = (e = (e = e.replace(/(^|\s|>|\b)__(?=\S)([\s\S]+?)__(?=\b|<|\s|$)/gm, "$1<strong>$2</strong>")).replace(/(^|\s|>|\b)_(?=\S)([\s\S]+?)_(?=\b|<|\s|$)/gm, "$1<em>$2</em>")).replace(/(\*\*)(?=\S)([^\r]*?\S[*]*)\1/g, "<strong>$2</strong>")).replace(/(\*)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>") : (e = e.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<strong>$2</strong>")).replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>"), 
    e = t.converter._dispatch("italicsAndBold.after", e, r, t);
}), a.subParser("lists", function(e, r, t) {
    function n(e, n) {
        t.gListLevel++, e = e.replace(/\n{2,}$/, "\n");
        var s = /\n[ \t]*\n(?!~0)/.test(e += "~0");
        return e = (e = e.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm, function(e, n, o, i, l, c, u) {
            u = u && "" !== u.trim();
            var p = a.subParser("outdent")(l, r, t), h = "";
            return c && r.tasklists && (h = ' class="task-list-item" style="list-style-type: none;"', 
            p = p.replace(/^[ \t]*\[(x|X| )?]/m, function() {
                var e = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
                return u && (e += " checked"), e += ">";
            })), n || p.search(/\n{2,}/) > -1 ? (p = a.subParser("githubCodeBlocks")(p, r, t), 
            p = a.subParser("blockGamut")(p, r, t)) : (p = (p = a.subParser("lists")(p, r, t)).replace(/\n$/, ""), 
            p = s ? a.subParser("paragraphs")(p, r, t) : a.subParser("spanGamut")(p, r, t)), 
            p = "\n<li" + h + ">" + p + "</li>\n";
        })).replace(/~0/g, ""), t.gListLevel--, n && (e = e.replace(/\s+$/, "")), e;
    }
    function s(e, r, t) {
        var a = "ul" === r ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm, s = [], o = "";
        if (-1 !== e.search(a)) {
            !function e(s) {
                var i = s.search(a);
                -1 !== i ? (o += "\n\n<" + r + ">" + n(s.slice(0, i), !!t) + "</" + r + ">\n\n", 
                a = "ul" == (r = "ul" === r ? "ol" : "ul") ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm, 
                e(s.slice(i))) : o += "\n\n<" + r + ">" + n(s, !!t) + "</" + r + ">\n\n";
            }(e);
            for (var i = 0; i < s.length; ++i) ;
        } else o = "\n\n<" + r + ">" + n(e, !!t) + "</" + r + ">\n\n";
        return o;
    }
    e = t.converter._dispatch("lists.before", e, r, t), e += "~0";
    var o = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
    return t.gListLevel ? e = e.replace(o, function(e, r, t) {
        return s(r, t.search(/[*+-]/g) > -1 ? "ul" : "ol", !0);
    }) : (o = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, 
    e = e.replace(o, function(e, r, t, n) {
        return s(t, n.search(/[*+-]/g) > -1 ? "ul" : "ol");
    })), e = e.replace(/~0/, ""), e = t.converter._dispatch("lists.after", e, r, t);
}), a.subParser("outdent", function(e) {
    return e = (e = e.replace(/^(\t|[ ]{1,4})/gm, "~0")).replace(/~0/g, "");
}), a.subParser("paragraphs", function(e, r, t) {
    for (var n = (e = (e = (e = t.converter._dispatch("paragraphs.before", e, r, t)).replace(/^\n+/g, "")).replace(/\n+$/g, "")).split(/\n{2,}/g), s = [], o = n.length, i = 0; i < o; i++) {
        var l = n[i];
        l.search(/~(K|G)(\d+)\1/g) >= 0 ? s.push(l) : (l = (l = a.subParser("spanGamut")(l, r, t)).replace(/^([ \t]*)/g, "<p>"), 
        l += "</p>", s.push(l));
    }
    for (o = s.length, i = 0; i < o; i++) {
        for (var c = "", u = s[i], p = !1; u.search(/~(K|G)(\d+)\1/) >= 0; ) {
            var h = RegExp.$1, d = RegExp.$2;
            c = (c = "K" === h ? t.gHtmlBlocks[d] : p ? a.subParser("encodeCode")(t.ghCodeBlocks[d].text) : t.ghCodeBlocks[d].codeblock).replace(/\$/g, "$$$$"), 
            u = u.replace(/(\n\n)?~(K|G)\d+\2(\n\n)?/, c), /^<pre\b[^>]*>\s*<code\b[^>]*>/.test(u) && (p = !0);
        }
        s[i] = u;
    }
    return e = (e = (e = s.join("\n\n")).replace(/^\n+/g, "")).replace(/\n+$/g, ""), 
    t.converter._dispatch("paragraphs.after", e, r, t);
}), a.subParser("runExtension", function(e, r, t, n) {
    if (e.filter) r = e.filter(r, n.converter, t); else if (e.regex) {
        var a = e.regex;
        !a instanceof RegExp && (a = new RegExp(a, "g")), r = r.replace(a, e.replace);
    }
    return r;
}), a.subParser("spanGamut", function(e, r, t) {
    return e = t.converter._dispatch("spanGamut.before", e, r, t), e = a.subParser("codeSpans")(e, r, t), 
    e = a.subParser("escapeSpecialCharsWithinTagAttributes")(e, r, t), e = a.subParser("encodeBackslashEscapes")(e, r, t), 
    e = a.subParser("images")(e, r, t), e = a.subParser("anchors")(e, r, t), e = a.subParser("autoLinks")(e, r, t), 
    e = a.subParser("encodeAmpsAndAngles")(e, r, t), e = a.subParser("italicsAndBold")(e, r, t), 
    e = (e = a.subParser("strikethrough")(e, r, t)).replace(/  +\n/g, " <br />\n"), 
    e = t.converter._dispatch("spanGamut.after", e, r, t);
}), a.subParser("strikethrough", function(e, r, t) {
    return r.strikethrough && (e = (e = t.converter._dispatch("strikethrough.before", e, r, t)).replace(/(?:~T){2}([\s\S]+?)(?:~T){2}/g, "<del>$1</del>"), 
    e = t.converter._dispatch("strikethrough.after", e, r, t)), e;
}), a.subParser("stripBlankLines", function(e) {
    return e.replace(/^[ \t]+$/gm, "");
}), a.subParser("stripLinkDefinitions", function(e, r, t) {
    return e = (e = (e += "~0").replace(/^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=~0))/gm, function(e, n, s, o, i, l, c) {
        return n = n.toLowerCase(), t.gUrls[n] = a.subParser("encodeAmpsAndAngles")(s), 
        l ? l + c : (c && (t.gTitles[n] = c.replace(/"|'/g, "&quot;")), r.parseImgDimensions && o && i && (t.gDimensions[n] = {
            width: o,
            height: i
        }), "");
    })).replace(/~0/, "");
}), a.subParser("tables", function(e, r, t) {
    function n(e, n) {
        return "<td" + n + ">" + a.subParser("spanGamut")(e, r, t) + "</td>\n";
    }
    return r.tables ? (e = (e = t.converter._dispatch("tables.before", e, r, t)).replace(/^[ \t]{0,3}\|?.+\|.+\n[ \t]{0,3}\|?[ \t]*:?[ \t]*(?:-|=){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:-|=){2,}[\s\S]+?(?:\n\n|~0)/gm, function(e) {
        var s, o = e.split("\n");
        for (s = 0; s < o.length; ++s) /^[ \t]{0,3}\|/.test(o[s]) && (o[s] = o[s].replace(/^[ \t]{0,3}\|/, "")), 
        /\|[ \t]*$/.test(o[s]) && (o[s] = o[s].replace(/\|[ \t]*$/, ""));
        var i, l, c, u, p = o[0].split("|").map(function(e) {
            return e.trim();
        }), h = o[1].split("|").map(function(e) {
            return e.trim();
        }), d = [], f = [], g = [], b = [];
        for (o.shift(), o.shift(), s = 0; s < o.length; ++s) "" !== o[s].trim() && d.push(o[s].split("|").map(function(e) {
            return e.trim();
        }));
        if (p.length < h.length) return e;
        for (s = 0; s < h.length; ++s) g.push((i = h[s], /^:[ \t]*--*$/.test(i) ? ' style="text-align:left;"' : /^--*[ \t]*:[ \t]*$/.test(i) ? ' style="text-align:right;"' : /^:[ \t]*--*[ \t]*:$/.test(i) ? ' style="text-align:center;"' : ""));
        for (s = 0; s < p.length; ++s) a.helper.isUndefined(g[s]) && (g[s] = ""), f.push((l = p[s], 
        c = g[s], u = void 0, u = "", l = l.trim(), r.tableHeaderId && (u = ' id="' + l.replace(/ /g, "_").toLowerCase() + '"'), 
        "<th" + u + c + ">" + (l = a.subParser("spanGamut")(l, r, t)) + "</th>\n"));
        for (s = 0; s < d.length; ++s) {
            for (var v = [], m = 0; m < f.length; ++m) a.helper.isUndefined(d[s][m]), v.push(n(d[s][m], g[m]));
            b.push(v);
        }
        return function(e, r) {
            for (var t = "<table>\n<thead>\n<tr>\n", n = e.length, a = 0; a < n; ++a) t += e[a];
            for (t += "</tr>\n</thead>\n<tbody>\n", a = 0; a < r.length; ++a) {
                t += "<tr>\n";
                for (var s = 0; s < n; ++s) t += r[a][s];
                t += "</tr>\n";
            }
            return t += "</tbody>\n</table>\n";
        }(f, b);
    }), e = t.converter._dispatch("tables.after", e, r, t)) : e;
}), a.subParser("unescapeSpecialChars", function(e) {
    return e = e.replace(/~E(\d+)E/g, function(e, r) {
        var t = parseInt(r);
        return String.fromCharCode(t);
    });
}), module.exports = a;
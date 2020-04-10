var t = getApp(), e = t.requirejs("core"), a = t.requirejs("jquery"), s = t.requirejs("biz/diyform"), i = t.requirejs("biz/goodspicker");

t.requirejs("foxui"), Page({
    data: {
        specs: [],
        options: [],
        diyform: {},
        specsTitle: "",
        total: 1,
        active: "",
        slider: "",
        tempname: "",
        buyType: "",
        icons: t.requirejs("icons"),
        isFilterShow: !1,
        isSaixShow1: !1,
        isSaixShow2: !1,
        isSaixShow3: !1,
        isSaixShow4: !1,
        brand: [],//品牌
        hard: [],//品类（软硬装）
        space: [],//空间
        style: [],//风格
        typesOf: [],//类型
        typesid: [],
        listmode: "block",
        listsort: "",
        page: 1,
        loaded: !1,
        loading: !0,
        allcategory: [],
        catlevel: -1,
        opencategory: !1,
        category: {},
        category_child: [],
        category_third: [],
        filterBtns: {},
        isfilter: 0,
        list: [],
        params: {},
        count: 0,
        cate: ['0','0','0','0'],
        cate1:'',
        defaults: {
            keywords: "",
            isrecommand: "",
            ishot: "",
            isnew: "",
            isdiscount: "",
            issendfree: "",
            istime: "",
            cate: '',
            order: "",
            by: "desc",
            merchid: 0
        },
        lastcat: "",
        fromsearch: !1,
        searchRecords: [],
        areas: [],
        limits: !0,
        modelShow: !1,
        canload: !0
    },
    onLoad: function(e) {
        var s = this;
        s.setData({
          cate1: e.cate
        })
        if(e.name1) {
          s.setData({
            name1: e.name1
          })
        };
        if (e.name2) {
          s.setData({
            name2: e.name2
          })
        };
      if (e.name3) {
        s.setData({
          name3: e.name3
        })
      };

        if (s.setData({
            imgUrl: t.globalData.approot
        }), setTimeout(function() {
            s.setData({
                areas: t.getCache("cacheset").areas
            });
        }, 3e3), !a.isEmptyObject(e)) {
            var i = e.isrecommand || e.isnew || e.ishot || e.isdiscount || e.issendfree || e.istime ? 1 : 0;
            this.setData({
                params: e,
                isfilter: i,
                filterBtns: e,
                fromsearch: e.fromsearch || !1
            });
        }
        this.initCategory(), e.fromsearch || this.getList(), this.getRecord();
    },
    onShow: function() {
        this.data.fromsearch && this.setFocus();
        var t = this;
        wx.getSetting({
            success: function(e) {
                var a = e.authSetting["scope.userInfo"];
                t.setData({
                    limits: a
                });
            }
        });
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || 1 == this.data.canload && this.getList();
    },
    initCategory: function() {
        var t = this;
        e.get("goods/get_category", {}, function(e) {
            t.setData({
                allcategory: e.allcategory,
                category_parent: e.allcategory.parent,
                brand: e.brand,//品牌
                hard: e.hard,//品类（软硬装）
                space: e.space,//空间
                style: e.style,//风格
                category_child: [],
                category_third: [],
                catlevel: e.catlevel,
                opencategory: e.opencategory,
                show: !0
            });
          for (let key in e.space) {
            if (key == t.data.cate1) {
              t.setData({
                name1: e.space[key].name
              })
            } else { }
          }
          
          for (let key in e.style) {
            if (key == t.data.cate1) {
              t.setData({
                name2: e.style[key].name
              })
            } else { }
          }
          console.log(t.data.cate1,e.hard)
          for (let key in e.hard) {
            if (key == t.data.cate1) {
              t.setData({
                name3: e.hard[key].name
              })
            } else { }
          }
        });
    },
    getList: function() {
        var t = this;
        t.setData({
            loading: !0
        }), this.data.canload = !1, t.data.params.page = t.data.page, e.get("goods/get_list", t.data.params, function(e) {
            var a = {
                loading: !1,
                count: e.total,
                show: !0
            };
            e.list || (e.list = []), e.list.length > 0 && (a.page = t.data.page + 1, a.list = t.data.list.concat(e.list), 
            e.list.length < e.pagesize && (a.loaded = !0)), t.setData(a), t.data.canload = !0;
        });
    },
    changeMode: function() {
        "block" == this.data.listmode ? this.setData({
            listmode: ""
        }) : this.setData({
            listmode: "block"
        });
    },
    bindSort: function(t) {
        var e = t.currentTarget.dataset.order, a = this.data.params;
        if ("" == e) {
            if (a.order == e) return;
            a.order = "", this.setData({
                listorder: ""
            });
        } else if ("minprice" == e) this.setData({
            listorder: ""
        }), a.order == e ? "desc" == a.by ? a.by = "asc" : a.by = "desc" : a.by = "asc", 
        a.order = e, this.setData({
            listorder: a.by
        }); else if ("sales" == e) {
            if (a.order == e) return;
            this.setData({
                listorder: ""
            }), a.order = "sales", a.by = "desc";
        }
        this.setData({
            params: a,
            page: 1,
            list: [],
            loading: !0,
            loaded: !1,
            isSaixShow: !1,
            isSaixShow1: !1,
            isSaixShow2: !1,
            isSaixShow3: !1,
            isSaixShow4: !1,
            sort_selected: e
        }), this.getList();
    },
    bindSort1: function(e) {
      var types = e.currentTarget.dataset.types
      if (types==1) {
        this.setData({
          isSaixShow1: !this.data.isSaixShow1,
          isSaixShow2: !1,
          isSaixShow3: !1,
          isSaixShow4: !1,
          typesOf: this.data.space
        });
      } else if(types == 2) {
        this.setData({
          isSaixShow1: !1,
          isSaixShow2: !this.data.isSaixShow2,
          isSaixShow3: !1,
          isSaixShow4: !1,
          typesOf: this.data.style
        });
      } else if (types == 3) {
        this.setData({
          isSaixShow1: !1,
          isSaixShow2: !1,
          isSaixShow3: !this.data.isSaixShow3,
          isSaixShow4: !1,
          typesOf: this.data.hard
        });
      } else if (types == 4) {
        this.setData({
          isSaixShow1: !1,
          isSaixShow2: !1,
          isSaixShow3: !1,
          isSaixShow4: !this.data.isSaixShow4,
          typesOf: this.data.brand
        });
      }else {} 
    },
    showFilter: function() {
        this.setData({
            // isFilterShow: !this.data.isFilterShow,
            isSaixShow1: !1,
            isSaixShow2: !1,
            isSaixShow3: !1,
            isSaixShow4: !1,
        });
    },
    btnFilterBtns: function(t) {
        var e = t.target.dataset.type;
        if (e) {
            var s = this.data.filterBtns;
            s.hasOwnProperty(e) || (s[e] = ""), s[e] ? delete s[e] : s[e] = 1;
            var i = a.isEmptyObject(s) ? 0 : 1;
            this.setData({
                filterBtns: s,
                isfilter: i
            });
        }
    },
    bindFilterCancel: function() {
        this.data.defaults.cate = "";
        var t = this.data.defaults;
        this.setData({
            page: 1,
            params: t,
            isFilterShow: !1,
            lastcat: "",
            cateogry_parent_selected: "",
            category_child_selected: "",
            category_third_selected: "",
            category_child: [],
            category_third: [],
            filterBtns: {},
            loading: !0,
            loaded: !1,
            listorder: "",
            list: []
        }), this.getList();
    },
    bindFilterSubmit: function() {
        var t = this.data.params, e = this.data.filterBtns;
        for (var s in e) t[s] = e[s];
        a.isEmptyObject(e) && (t = this.data.defaults), t.cate = this.data.lastcat,                 this.setData({
            page: 1,
            params: t,
            isFilterShow: !1,
            filterBtns: e,
            list: [],
            loading: !0,
            loaded: !1
        }), this.getList();
    },
    bindCategoryEvents: function(t) {
        var e = t.target.dataset.id;
        this.setData({
            lastcat: e
        });
        var a = t.target.dataset.level;
        1 == a ? (this.setData({
            category_child: [],
            category_third: []
        }), this.setData({
            category_parent_selected: e,
            category_child: this.data.allcategory.children[e]
        })) : 2 == a ? (this.setData({
            category_third: []
        }), this.setData({
            category_child_selected: e,
            category_third: this.data.allcategory.children[e]
        })) : this.setData({
            category_third_selected: e
        });
    },
    bindCategoryEvents1:function(v) {
      var id = v.target.dataset.id;
      this.data.cate[0] = id;
      var cateid = this.data.cate.join(',');
      console.log(cateid);
      var name1 = v.target.dataset.name;
      var t = this.data.params, e = this.data.filterBtns;
      for (var s in e) t[s] = e[s];
      this.data.typesid[0] = id;
      a.isEmptyObject(e) && (t = this.data.defaults), t.cate = cateid, 
      this.setData({
        isSaixShow1: !1,
        isSaixShow2: !1,
        isSaixShow3: !1,
        isSaixShow4: !1,
        name1: name1,
        params: t,
        page: 1,
        list: [],
        loading: !0,
        loaded: !1,
        isFilterShow: !1,
        filterBtns: e,
      }), this.getList();
    },
  bindCategoryEvents2: function (v) {
    var id = v.target.dataset.id;
    var name2 = v.target.dataset.name;
    this.data.typesid[1] = id;
    this.data.cate[1] = id;
    var cateid = this.data.cate.join(',');
    console.log(cateid);
    var t = this.data.params, e = this.data.filterBtns;
    for (var s in e) t[s] = e[s];
    a.isEmptyObject(e) && (t = this.data.defaults), t.cate = cateid, 
    this.setData({
      isSaixShow1: !1,
      isSaixShow2: !1,
      isSaixShow3: !1,
      isSaixShow4: !1,
      name2: name2,
      params: t,
      page: 1,
      list: [],
      loading: !0,
      loaded: !1,
      isFilterShow: !1,
      filterBtns: e,
    }), this.getList();
  },
  bindCategoryEvents3: function (v) {
    var id = v.target.dataset.id;
    var name3 = v.target.dataset.name;
    this.data.typesid[2] = id;
    this.data.cate[2] = id;
    var cateid = this.data.cate.join(',');
    console.log(cateid);
    var t = this.data.params, e = this.data.filterBtns;
    for (var s in e) t[s] = e[s];
    a.isEmptyObject(e) && (t = this.data.defaults), t.cate = cateid, 
    this.setData({
      isSaixShow1: !1,
      isSaixShow2: !1,
      isSaixShow3: !1,
      isSaixShow4: !1,
      name3: name3,
      params: t,
      page: 1,
      list: [],
      loading: !0,
      loaded: !1,
      isFilterShow: !1,
      filterBtns: e,
    }), this.getList();
  },
  bindCategoryEvents4: function (v) {
    var id = v.target.dataset.id;
    var name4 = v.target.dataset.name;
    this.data.typesid[3] = id;
    this.data.cate[3] = id;
    var cateid = this.data.cate.join(',');
    console.log(cateid);
    var t = this.data.params, e = this.data.filterBtns;
    for (var s in e) t[s] = e[s];
    a.isEmptyObject(e) && (t = this.data.defaults), t.cate = cateid, 
    this.setData({
      isSaixShow1: !1,
      isSaixShow2: !1,
      isSaixShow3: !1,
      isSaixShow4: !1,
      name4: name4,
      params: t,
      page: 1,
      list: [],
      loading: !0,
      loaded: !1,
      isFilterShow: !1,
      filterBtns: e,
    }), this.getList();
  },
    bindSearch: function(t) {
        t.target, this.setData({
            list: [],
            loading: !0,
            loaded: !1
        });
        var e = a.trim(t.detail.value), s = this.data.defaults;
        "" != e ? (s.keywords = e, this.setData({
            page: 1,
            params: s,
            fromsearch: !1
        }), this.getList(), this.setRecord(e)) : (s.keywords = "", this.setData({
            page: 1,
            params: s,
            listorder: "",
            fromsearch: !1
        }), this.getList());
    },
    bindInput: function(t) {
        var e = a.trim(t.detail.value), s = this.data.defaults;
        s.keywords = "", 
        s.order = this.data.params.order, 
        s.by = this.data.params.by, 
        
        "" == e && (this.setData({
            page: 1,
            list: [],
            loading: !0,
            loaded: !1,
            params: s,
            listorder: s.by,
            fromsearch: !0
        }), this.getRecord());
    },
    bindFocus: function(t) {
        "" == a.trim(t.detail.value) && this.setData({
            fromsearch: !0
        });
    },
    bindback: function() {
        wx.navigateBack();
    },
    bindnav: function(t) {
        var e = a.trim(t.currentTarget.dataset.text), s = this.data.defaults;
        s.keywords = e, this.setData({
            params: s,
            page: 1,
            fromsearch: !1
        }), this.getList(), this.setRecord(e);
    },
    getRecord: function() {
        var e = t.getCache("searchRecords");
        this.setData({
            searchRecords: e
        });
    },
    setRecord: function(e) {
        if ("" != e) {
            var s = t.getCache("searchRecords");
            if (a.isArray(s)) {
                var i = [];
                for (var r in i.push(e), s) {
                    if (i.length > 20) break;
                    s[r] != e && null != s && "null" != s && i.push(s[r]);
                }
                s = i;
            } else (s = []).push(e);
            t.setCache("searchRecords", s);
        } else t.setCache("searchRecords", []);
        this.getRecord();
    },
    delRecord: function() {
        this.setRecord(""), this.setData({
            fromsearch: !0
        });
    },
    setFocus: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                focusin: !0
            });
        }, 1e3);
    },
    selectPicker: function(e) {
        t.checkAuth();
        var a = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] && i.selectpicker(e, a, "goodslist");
            }
        });
    },
    specsTap: function(t) {
        i.specsTap(t, this);
    },
    chooseGift: function(t) {
        i.chooseGift(t, this);
    },
    emptyActive: function() {
        this.setData({
            active: "",
            slider: "out",
            tempname: "",
            specsTitle: ""
        });
    },
    buyNow: function(t) {
        i.buyNow(t, this);
    },
    getCart: function(t) {
        i.getCart(t, this);
    },
    select: function() {
        i.select(this);
    },
    inputNumber: function(t) {
        i.inputNumber(t, this);
    },
    number: function(t) {
        i.number(t, this);
    },
    onChange: function(t) {
        return s.onChange(this, t);
    },
    DiyFormHandler: function(t) {
        return s.DiyFormHandler(this, t);
    },
    selectArea: function(t) {
        return s.selectArea(this, t);
    },
    bindChange: function(t) {
        return s.bindChange(this, t);
    },
    onCancel: function(t) {
        return s.onCancel(this, t);
    },
    onConfirm: function(t) {
        return s.onConfirm(this, t);
    },
    getIndex: function(t, e) {
        return s.getIndex(t, e);
    },
    cancelclick: function() {
        this.setData({
            modelShow: !1
        });
    },
    confirmclick: function() {
        this.setData({
            modelShow: !1
        }), wx.openSetting({
            success: function(t) {}
        });
    }
});
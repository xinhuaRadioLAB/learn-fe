/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
            /******/
}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
            /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
        /******/
}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
                /******/
});
            /******/
}
        /******/
};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
        /******/
};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
    /******/
})
/************************************************************************/
/******/([
/* 0 */
/***/ (function (module, exports, __webpack_require__) {

            "use strict";


            var _isDev = __webpack_require__(1);

            var _isDev2 = _interopRequireDefault(_isDev);

            var _footer = __webpack_require__(2);

            var _footer2 = _interopRequireDefault(_footer);

            var _resetDataAction = __webpack_require__(3);

            var _resetDataAction2 = _interopRequireDefault(_resetDataAction);

            function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

            var isDev = (0, _isDev2.default)(); /**
                                         * @Author: SuperMoo <SuperWoods>
                                         * @Date:   2017-03-02-19:55:39
                                         * @Email:  st_sister@me.com
                                         * @Filename: xinhuaRadio.js
                                        * @Last modified by:   SuperWoods
                                        * @Last modified time: 2017-03-03-00:21:32
                                         * @License: MIT
                                         * @Copyright: Copyright (c) Xinhuanet Inc. All rights reserved.
                                         */

            /**
             * Copyright (c) 2015 Xinhuanet Inc. All rights reserved.
             *
             * @file   js/xinhuaRadio.js
             * @author St. <st_sister@icloud.com>
             * @time   2015-11-09-20.04
             *         2015-12-14-14.59
             *         2016-01-04-14.52
             *         2016-01-08-10.04
             *         2016-01-12-09.41 ［frok] testWeChatShare
             *         2016-01-14-09.19
             *         2016-04-25-15.16 添加融媒体标题图
             *         2016-05-17-16.52 修改banner标题文字、更新分享地址修正若干小bug
             *         2016-06-14-09.13 - 修正`.playOnImg img`出现行内高宽为0的bug
             *                          - 修改分享功能，由参数传递变为私有模块变量负值
             */

            // -------------------------------------------------------------------------------------- config
            var $html = $('html');
            var $body = $('body');
            var $tabClassify = $('#tabClassify');
            var $blur = $('#windowHight');
            var player = null; // jplayer global player
            var isVideoCanPlay = true;
            // jQuery browser hacks
            var userAgent = navigator.userAgent.toLowerCase();
            jQuery.browser = {
                version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
                safari: /webkit/.test(userAgent),
                opera: /opera/.test(userAgent),
                msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
                mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
            };
            var browser = $.browser;
            var ie = browser.msie;
            var ieVersion = browser.version;
            var ie8 = ie && ieVersion < 9.0;

            if (ie) {
                $html.addClass('ie');
            } else {
                $html.removeClass('ie');
            }
            //////console.log(browser);
            //////console.log(ie);
            //////console.log(ieVersion);
            //////console.log(ie8);
            if (ie8) {
                $html.addClass('oldie');
                // ie8 增加 reduce
                if (typeof Array.prototype.reduce !== "function") {
                    Array.prototype.reduce = function (callback, initialValue) {
                        var previous = initialValue,
                            k = 0,
                            length = this.length;
                        if (typeof initialValue === "undefined") {
                            previous = this[0];
                            k = 1;
                        }
                        if (typeof callback === "function") {
                            for (k; k < length; k++) {
                                this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this));
                            }
                        }
                        return previous;
                    };
                }
                // ie8 增加 forEach
                if (typeof Array.prototype.forEach !== "function") {
                    Array.prototype.forEach = function (fn, scope) {
                        var i, len;
                        for (i = 0, len = this.length; i < len; ++i) {
                            if (i in this) {
                                fn.call(scope, this[i], i, this);
                            }
                        }
                    };
                }
            } else {
                $html.removeClass('oldie');
            }

            //global config
            //var homepage        = 'http://superwoods.github.io/test1/';
            var homepage = 'http://www.xinhuanet.com/video/xinhuaradio/';
            // var homepage        = 'http://172.18.19.60:8846/src/index.htm';
            // var homepageMobile  = 'http://172.18.19.60:8846/src/index.htm';
            var homepageMobile = homepage;

            //var hashKeywords    = '/playlist';
            //var hashPt0         = '#' + hashKeywords + '~type=';
            //var hashPt1         = '&pagenum=';
            //var hashPt2         = '&item=';
            //var hashPtAblum     = '&album=';

            var hash = {
                key: '/play',
                type: '#/play~type=',
                pagenum: '&pagenum=',
                item: '&item=',
                album: '&album='
            };
            //var hashPtAblumId   = '&albumid='
            //var hashPtAblumPage = '&albumpagenum=';
            var defaultList = '11117352'; // 默认播放列表id
            //var defaultAblumId  = '11120891'; // 默认专辑列表id
            var defaultPage = '1'; //默认起始加载一页
            var defaultItem = '1'; //默认起始播放第一条
            var defaultCnt = 24; // cnt
            var defaultAlbumCnt = 100; // Albumpagenum's cnt
            var defaultPageName = 'video'; //cnt
            var defaultTag = '#list';
            var maxPage = 10; // 播放列表最大加载页数
            //var maxPageAlbum    = 10; // 专辑列表最大加载页数
            //var defaultHash     = hash.type + defaultList + hash.pagenum + defaultPage + hash.item + defaultItem + hash.album + 5 + hash.albumId + defaultAblumId + hash.albumPage + 1;
            var defaultHash = hash.type + defaultList + hash.pagenum + defaultPage + hash.item + defaultItem + hash.album + 5; // + hash.albumId + defaultAblumId + hash.albumPage + 1;
            //var defaultMaxNum   = 5;
            var noMoreBtn = '<li class="add disable"><div>暂无更多</div></li>';
            var noMoreBtnAlbum = '<div class="add addAlbum disable"><div>暂无更多</div></div>';

            var timeoutOnloadData;
            var timeout;
            var timeout2;
            var timeout3;
            var timeout4;

            var href = {
                convert: function convert(toggle) {

                    var array = [];
                    var url;
                    var href;
                    var key = '?';
                    var hrefKey;

                    //console.log(toggle);

                    if (!toggle || toggle === 'go' || toggle === 'off') {
                        array = location.hash.match(/\d+/g);
                        url = homepageMobile + key + array;

                        //console.log('off: ' + url);

                        return url;
                    }

                    if (toggle === 'back' || toggle === 'on') {
                        href = location.href;
                        hrefKey = href.indexOf(key);
                        if (hrefKey !== -1) {
                            array = href.slice(hrefKey + 1).split(',');

                            //console.log(array);

                            url = homepage + hash.type + array[0] + hash.pagenum + array[1] + hash.item + array[2] + hash.album + array[3];

                            //console.log('back: ' + url);

                        }
                    } else {
                        url = homepage + defaultHash;
                    }
                    return url;
                }
            };

            // 初始化判断hash和href (需要重新 逻辑关系可能会有问题 @2015-12-01-17.23)
            (function () {
                var loc = location.href;
                var cons = loc.indexOf('?');
                var cons2 = loc.slice(cons + 1);
                var cons3 = cons2.indexOf(hash.key);
                if (cons > 0 && cons2 !== '') {
                    //console.log(cons3 === -1);
                    //alert(href.convert('back'));
                    if (cons3 === -1) {
                        self.location.href = href.convert('back');
                    }
                }
            })();

            var cookie = {
                expdays: 365,
                set: function set(cookieName, cookieValue) {
                    var d = new Date();
                    d.setTime(d.getTime() + cookie.expdays * 24 * 60 * 60 * 1000);
                    var expires = "expires=" + d.toUTCString();
                    document.cookie = cookieName + "=" + cookieValue + "; " + expires;
                },
                get: function get(cookieName) {
                    var name = cookieName + "=";
                    var ca = document.cookie.split(';');
                    for (var i = 0; i < ca.length; i++) {
                        var c = ca[i];
                        while (c.charAt(0) === ' ') {
                            c = c.substring(1);
                        }
                        if (c.indexOf(name) === 0) {
                            return c.substring(name.length, c.length);
                        }
                    }
                    return "";
                },
                checkVolume: function checkVolume() {
                    var username = cookie.get('volume');
                    if (username === '' || username === 'undefined' || username === null) {
                        $("#jquery_jplayer_1").jPlayer("volume", 0.5);
                        cookie.set('volume', 0.5);
                    }
                }
            };

            // 获取上次的播放进度
            $body.attr('data-currenttime', cookie.get('currentTime'));

            function backHomePage() {
                currenttimeClear();
                var $tabClassifyLi = $tabClassify.find('li'),
                    $album = $(".album");
                $tabClassifyLi.eq(0).addClass("on").siblings().removeClass("on");
                $album.eq(0).show().siblings().hide();
                location.hash = defaultHash;
            }

            // -------------------------------------------------------------------------------------- 容错写入
            var $list = $(defaultTag);
            var $addPos = $('#addPos');
            var pos = $('#album1, #album2, #album3, #album4');
            var pos2 = $('#jp-details').find('.jp-title');
            var tipsTxt = '正在加载数据<span class="l0">.</span><span class="l1">.</span><span class="l2">.</span>';
            var tipsTxt2 = '还没有开始播放<span class="l0">.</span><span class="l1">.</span><span class="l2">.</span>';
            //var tips = '<div class="tipBox"><div class="tips">' + tipsTxt + '</div><div class="back"><a href="' + homepage + '" target="_self">刷 新</a></div></div>';
            var tips = '<div class="tipBox"><div class="tips">' + tipsTxt + '</div><div class="back"><a href="javascript:location.reload()" target="_self">刷 新</a></div></div>';
            var backAHtml = '<a href="javascript:void(0);" class="close">返回默认列表</a>';
            /*var backAHtml2 = '<a href="' + homepage + '" target="_self">返 回</a>';
            var backAHtml3 = '<a href="' + homepage + '" target="_self" class="close">刷 新</a>';*/
            var backAHtml2 = '<a href="history.go(-1)" target="_self">返 回</a>';
            var backAHtml3 = '<a href="javascript:location.reload()" target="_self" class="close">刷 新</a>';
            //var backAHtml3 = '<a href="'+ homepage +'" onClick="resetPlayer();" class="close">刷 新</a>';
            //var backAHtml4 = '<a href="javascript:void(0);" onClick="resetPlayer();">刷 新</a>';
            var listTip = '<li class="tipBox2"><div>' + tipsTxt + '</div><div>' + backAHtml3 + '</div></li>';
            pos.html(tips);
            pos2.html(tipsTxt2);
            $list.html(listTip);
            // -------------------------------------------------------------------------------------- 正式开始
            //hash监听
            var locator = {
                start: function start(handler) {
                    handler();
                },
                stop: function stop() {
                    window.onhashchange = null;
                }
            };
            //路由规则
            var rules = {};
            var router = {
                route: function route(request) {
                    var path = request.path;
                    if (rules[path]) {
                        return rules[path];
                    }
                    backHomePage();
                },
                addRule: function addRule(path, Controller) {
                    rules[path] = Controller;
                }
            };
            var url = {
                parse: function parse(hash) {
                    var newHash = '';
                    if (hash.indexOf('amp;')) {
                        newHash = hash.replace('amp;', '');
                    } else {
                        newHash = hash;
                    }
                    var queryIndex = newHash.indexOf('~');
                    var query = {};
                    if (queryIndex !== -1) {
                        query = newHash.slice(queryIndex + 1).split('&').reduce(function (result, item) {
                            item = item.split('=');
                            if (item[0]) {
                                result[item[0]] = item[1];
                            }
                            return result;
                        }, query);
                        newHash = newHash.slice(0, queryIndex);
                    }
                    return {
                        path: newHash.slice(1),
                        query: query
                    };
                }
            };
            var rules = [{
                hash: hash.key,
                handler: MVCController
            }];

            rules.forEach(function (rule) {
                router.addRule(rule.hash, rule.handler);
            });

            /**********************************************************
             *    MVCController
             *********************************************************/
            function MVCController() { }

            function currenttimeClear() {
                $('body').attr('data-currenttime', '');
            }

            var playContinue = function playContinue() {
                var obj = $body.attr('data-currenttime');
                if (obj) {
                    var currentTimeArray = obj.split(',');
                    var currentTime = currentTimeArray[0] - 0;
                    var nextType = currentTimeArray[1];
                    var request = url.parse(location.hash);
                    var type = request.query.type;
                    if (nextType === type) {
                        var isVideoUrl = checkVideoUrl();
                        console.log(isVideoUrl);
                        if (isVideoUrl && isVideoCanPlay) {
                            showVideoDialog();
                        } else {
                            $("#jquery_jplayer_1").jPlayer("play", currentTime);
                            currenttimeClear();
                        }
                    }
                }
            };

            // life cycle
            // 1. init
            // 2. model load data
            // 3. view render data
            // 4. view fire event to Controller
            // 5. ->2 ->3
            // 6. controller / model / view -> dispose
            //渲染层回调
            //callback(tag, data, pageName);

            var tinyTip = function tinyTip(msg, btnTxt) {
                if (!msg) {
                    msg = '糟糕，专辑是空的！';
                }
                if (!btnTxt) {
                    btnTxt = '朕知道了';
                }
                //var btnTxt = '朕知道了';
                var h = '<span class="tinyTip hide" id="tinyTip"><span class="tinyTipIn"><span class="t">' + msg + '</span><span class="close">' + btnTxt + '</span</span></span>';

                $body.append(h);
                $blur.addClass('blur');
                $('#tinyTip').fadeIn().on('click', function () {
                    $blur.removeClass('blur');
                    $(this).fadeOut('fast', function () {
                        $(this).remove();
                    });
                });
            };

            // album.add
            var album = {
                action: function action(tag) {
                    $(tag).find('[data-action]').on('click', function (e) {
                        var type = $(e.currentTarget).data('action');
                        var noData = '暂无数据';
                        //var request = url.parse(location.hash);
                        if (type === noData) {
                            tinyTip();
                        } else {
                            $(this).addClass('on').siblings().removeClass('on');
                            clearTimeout(timeout2);
                            loadData(type, defaultCnt, defaultPageName, 1, 1, 1, setList, defaultTag);
                            var album = $(this).data('albumnum');
                            var pagenum = defaultPage;
                            var item = defaultItem;
                            locationCtl(type, pagenum, item, album);
                            addBackMainList();
                        }
                    });
                }
            };

            // list.add(data, pagenum);
            var list = {
                add: function add(data, pagenum) {
                    var addBtn = '<li class="add"><div id="add" data-pagenum="' + pagenum + '" onClick="listMore($(this))">加载更多</div></li>';
                    var totalnum = $('#jquery_jplayer_1').attr('data-totalnum');
                    //最大加载页数为5页
                    if ((maxPage === false ? true : pagenum < maxPage) && totalnum > defaultCnt && Math.ceil(totalnum / defaultCnt) > pagenum) {
                        //$addPos.html();
                        $addPos.html(addBtn);
                        //addFn
                        $('.add').show();
                    } else {
                        $addPos.html(noMoreBtn);
                    }
                }, // ‘加载更多’按钮 初始化
                more: function more(tag) {
                    var query = url.parse(location.hash).query;
                    var type = query.type;
                    var pagenum = query.pagenum;
                    var item = query.item;
                    var album = query.album;
                    var p = tag.data('pagenum');
                    var newPagenum = p + 1 - 0;
                    var totalnum = $('#jquery_jplayer_1').attr('data-totalnum');

                    if ((maxPage === false ? true : p < maxPage) && totalnum > defaultCnt && Math.ceil(totalnum / defaultCnt) > pagenum) {
                        //////console.log(newPagenum);
                        loadData(type, defaultCnt, defaultPageName, newPagenum, 1, 1, addList, defaultTag);

                        locationCtl(type, newPagenum, item, album);
                        //location.hash = hash.type + type + hash.pagenum + np + hash.item + item + hash.album + album;
                        //alert(item);
                        tag.data('pagenum', newPagenum);
                        $list.data('pagenum', newPagenum);
                    } else {
                        $addPos.html(noMoreBtn);
                    }
                }
            };

            function listMore(tag) {
                list.more(tag);
            }

            function addList(tag, data) {
                if (data.status === 0) {
                    var addListObj = data.data.list;
                    addListObj.forEach(function (addListObj) {
                        player.add(addListObj);
                    });
                } else {
                    tinyTip('没有更多了！');
                }
            }

            var formatData = function formatData(_ref) {
                var data = _ref.data,
                    pageName = _ref.pageName;

                var playlist = [];
                data.data.list.map(function (currentValue, index, array) {

                    currentValue.mp3 = currentValue.m4v;
                    currentValue.PicLinks = formatImgSrc(currentValue.PicLinks, pageName);
                    currentValue.PubTime = formatTime(currentValue.PubTime);

                    playlist.push(currentValue);
                });
                if (playlist.length) {
                    data.data.list = playlist;
                }
                return data;
                // const str = JSON.stringify(data).replace(/m4v/g, 'mp3');
                // return (eval('(' + str + ')'));
            };

            function initPlayer(tag, data) {
                if (data.status === 0) {
                    var playlist = [];
                    data.data.list.map(function (currentValue, index, array) {
                        if (currentValue.mp3) {
                            currentValue.PubTime = formatTime(currentValue.PubTime);
                            playlist.push(currentValue);
                        }
                    });
                    if (playlist.length) {
                        data.data.list = playlist;
                    }
                    player = new jPlayerPlaylist({
                        jPlayer: "#jquery_jplayer_1",
                        cssSelectorAncestor: "#jp_container_1"
                    }, data.data.list, {
                            swfPath: "http://www.xinhuanet.com/xinhuaradio/bundle",
                            supplied: "mp3, m4v",
                            wmode: "window",
                            //		cssSelector: {
                            //			play: ".jp-play",
                            //			pause: ".jp-pause",
                            //			repeat: ".jp-repeat",
                            //			repeatOff: ".jp-repeat-off",
                            //		}
                            useStateClassSkin: true,
                            autoBlur: false,
                            smoothPlayBar: true,
                            keyEnabled: false,
                            //remainingDuration: true,
                            //enableRemoveControls: false,
                            volume: cookie.get('volume'),
                            size: {
                                width: 117,
                                height: 117
                            },
                            //autoPlay: true,
                            timeupdate: function timeupdate(event) {
                                var query = url.parse(location.hash).query;
                                var type = query.type;
                                cookie.set('currentTime', [event.jPlayer.status.currentTime, type]);
                            },
                            ready: function ready() {
                                var query = url.parse(location.hash).query;
                                var pagenum = query.pagenum;
                                var item = query.item;
                                $(this).jPlayer("repeat");
                                $('#jp-details').show();
                                //$(this).jPlayer("play").jPlayer("repeat");
                                itemCtl();
                                cookie.checkVolume();
                                if (pagenum === 1) {
                                    playlistPlay(item);
                                } else {
                                    initSetPagenum(item);
                                }
                                if (data.totalnum) {
                                    $(this).attr('data-totalnum', data.totalnum);
                                    //////console.log(this);
                                }
                                list.add(data, pagenum);
                                share.set();
                            },
                            play: function play() {
                                var query = url.parse(location.hash).query;
                                var pagenum = query.pagenum;
                                itemCtl();

                                $("#jquery_jplayer_2").jPlayer("play");
                                //addShare();

                                playContinue();

                                share.set();

                                if (data.totalnum) {
                                    $(this).attr('data-totalnum', data.totalnum);
                                    //////console.log(this);
                                }

                                list.add(data, pagenum);

                                addBackMainList();
                            } //,
                        });
                } else {
                    backHomePage();
                }
            }

            function playlistPlay(item) {
                // var isVideoUrl = checkVideoUrl();
                // if (isVideoUrl && isVideoCanPlay) {
                //     showVideoDialog();
                // } else {
                if (item === '0' || item === '' || item === null || item === undefined) {
                    item = defaultItem;
                } else {
                    player.play(item - 1);
                }
                // }
            }

            function setList(tag, data) {
                if (data.status === 0) {
                    player.setPlaylist(data.data.list);
                    setTimeout(function () {
                        $("#jquery_jplayer_1").jPlayer("play");
                    }, 300);
                } else {
                    tinyTip();
                }
            }

            function initSetPagenum(item) {
                var request = url.parse(location.hash);
                var type = request.query.type;
                var pagenum = request.query.pagenum;
                for (var i = 2, j = pagenum; i <= j; i++) {
                    loadData(type, defaultCnt, defaultPageName, i, 1, 1, addList, defaultTag);
                }
                setTimeout(function () {
                    playlistPlay(item);
                }, 1000);
            }

            //*********************************************************************************************************
            //* xinhuaRadioModel
            //*********************************************************************************************************
            //loadData
            function loadData(nid, cnt, pageName, pgnum, tp, mulatt, callback, tag) {
                if (nid === '' || nid === null || nid === 'undefined') {
                    nid = defaultList;
                }
                // let ajaxUrl = 'http://qc.wa.news.cn/nodeart/list?';
                // ajaxUrl += [
                //     // `nid=${nid}`,
                //     `pgnum=${pgnum}`,
                //     `cnt=${cnt}`,
                //     `tp=${tp}`,
                //     // `orderby=1`,
                //     `mulatt=${mulatt}`
                // ].join('&');
                if (isDev) {
                    console.log('isDev: ', { nid: nid, cnt: cnt, pageName: pageName, pgnum: pgnum, tp: tp, mulatt: mulatt, callback: callback, tag: tag });
                }
                $.ajax({
                    url: 'http://qc.wa.news.cn/nodeart/list',
                    type: 'GET',
                    dataType: 'jsonp',
                    data: {
                        nid: nid,
                        pgnum: pgnum,
                        cnt: cnt,
                        tp: tp,
                        mulatt: mulatt,
                        orderby: 1
                    },
                    jsonp: 'callback',
                    error: function error(jqXHR, textStatus, errorThrown) {
                        console.log('====================================');
                        console.log('error', { jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown });
                        console.log('====================================');
                        backHomePage();
                    },
                    success: function success(data, textStatus, jqXHR) {
                        data = formatData({ data: data, pageName: pageName });
                        callback(tag, data, pageName, nid);
                        //share.set();
                        lazyImg(tag);
                    }
                });
            }

            //*********************************************************************************************************
            //* xinhuaRadioView
            //*********************************************************************************************************

            //图片地址格式化
            function formatImgSrc(src, pageName) {
                var imgSrc;
                if (src === null || src === 'undefined') {
                    imgSrc = 'http://www.xinhuanet.com/video/xinhuaradio/audio/images/logowechat.jpg';
                    return imgSrc;
                } else {
                    var arr = src.split('_')[0];
                    imgSrc = 'http://www.news.cn/' + pageName + '/titlepic/' + arr.substring(0, arr.length - 4) + '/' + src.replace('title', 'title0h');
                    return imgSrc;
                }
            }

            //时间格式化
            function formatTime(time) {
                var timeArray = time.split(' ');
                var t = timeArray[0]; //<span>' + timeArray[1] + '</span>';
                return t;
            }

            //回调
            //addToDom1: formatRenderData 循环部分的回调，给#album1 添加dom内容，装载至str[0]的位置
            function changeVar(tempObj, str, dataTit, dataUrl, dataTime, dataAbs, dataPic, playlist, dataNod, dataAut, tag, i) {
                var albumNum = $(tag).closest('.album').attr('data-album');
                tempObj += '<div class="albumItem" data-albumnum="' + albumNum + '" data-action="' + playlist + '">' + '<div class="p">' + '<img class="lazy" src="img/loading.gif" data-original="' + dataPic + '" width="122" height="122" alt="' + dataTit + '" />' + '</div>' + '<div class="t">' + dataTit + '</div>' + '</div>';
                str.push(tempObj);
                return str;
            }

            //数据格式化
            function formatRenderData(tag, data, pageName, formatRenderDataCallback, renderModel) {
                var noData = '暂无数据';
                if (data.status === 0) {
                    var tempObj = '',
                        str = [],
                        dataTit = '',
                        dataUrl = '',
                        dataTime = '',
                        dataAut = '',
                        dataAbs = '',
                        dataPic = '',
                        playlist = '',
                        dataNod = '',
                        curLen = data.data.list.length,
                        totalnum = data.totalnum;
                    for (var i = 0; i < curLen; i++) {
                        try {
                            var d = data.data.list[i];

                            dataTit = d.Title || noData;
                            dataUrl = d.LinkUrl || '#';
                            dataAbs = d.Abstract || noData;
                            dataTime = d.PubTime || noData;
                            dataAut = d.Author || noData;
                            dataPic = d.PicLinks;
                            // dataPic = formatImgSrc(d.allPics[0], pageName);
                            playlist = d.SubTitle || noData;
                            dataNod = d.NodeId || noData;

                            // formatRenderDataCallback
                            formatRenderDataCallback(tempObj, str, dataTit, dataUrl, dataTime, dataAbs, dataPic, playlist, dataNod, dataAut, tag, i, d);
                        } catch (e) {
                            var error = "message: " + e.message + "\n" + "description: " + e.description + "\n" + "number:" + e.number + "\n" + "name: " + e.name;
                            console.error(e);
                        }
                    }
                    str = str.join("");
                    //$(tag).html(str[0]);
                    $(tag).attr('data-totalnum', totalnum);

                    //////console.log(tag + ': ' + totalnum);
                    if (renderModel && renderModel === 'append') {
                        $(tag).append(str);
                    } else {
                        $(tag)[0].innerHTML = str;
                    }
                } else {
                    var n = '<div class="tipBox"><div class="tips">' + data.message + '</div><div class="back">' + backAHtml2 + '</div></div>';
                    $(tag)[0].innerHTML = n;
                }
            }

            var config = { // 专辑列表配置
                album: [{ //0
                    nid: '11120891',
                    cnt: defaultAlbumCnt,
                    pageName: defaultPageName,
                    pgnum: 1,
                    tp: 1,
                    mulatt: '',
                    callback: viewRenderAlbum,
                    tag: '#album1'
                }, { //1
                    nid: '11120893',
                    cnt: defaultAlbumCnt,
                    pageName: defaultPageName,
                    pgnum: 1,
                    tp: 1,
                    mulatt: 1,
                    callback: viewRenderAlbum,
                    tag: '#album2'
                }, { //2
                    nid: '11120892',
                    cnt: defaultAlbumCnt,
                    pageName: defaultPageName,
                    pgnum: 1,
                    tp: 1,
                    mulatt: 1,
                    callback: viewRenderAlbum,
                    tag: '#album3'
                }, { //3
                    nid: '11120894',
                    cnt: defaultAlbumCnt,
                    pageName: defaultPageName,
                    pgnum: 1,
                    tp: 1,
                    mulatt: 1,
                    callback: viewRenderAlbum,
                    tag: '#album4'
                }],
                top: [{ // 4右边顶部推荐
                    nid: '11118775',
                    cnt: 20,
                    pageName: defaultPageName,
                    pgnum: 1,
                    tp: 1,
                    mulatt: 1,
                    callback: viewRenderTop,
                    tag: '#adsData'
                }],
                main: [{ // 默认列表
                    nid: mainNid(location.hash),
                    cnt: defaultCnt,
                    pageName: defaultPageName,
                    pgnum: 1,
                    tp: 1,
                    mulatt: 1,
                    callback: initPlayer,
                    tag: defaultTag
                }]
            };

            //var cl = config.album.length;
            function loadDataCtl(i, array) {
                var me = config.album[i];
                if (array) {
                    me = array[i];
                }
                loadData(me.nid, me.cnt, me.pageName, me.pgnum, me.tp, me.mulatt, me.callback, me.tag);
            }

            function mainNid(hash) {
                var type = url.parse(hash).query.type;
                if (!type) {
                    type = defaultList;
                    backHomePage();
                }
                return type;
            }

            MVCController.prototype.execute = function (request) {
                var query = request.query;
                var type = query.type;
                var album = query.album;
                // tabClassify li mouseover on
                var $tabClassifyLi = $tabClassify.find('li'),
                    $album = $(".album");

                $tabClassifyLi.each(function (i) {
                    $(this).on("click", function () {
                        var $this = $(this);
                        if ($this.attr('data-loaded') === '0') {
                            loadDataCtl(i);
                            $this.attr('data-loaded', '1');
                        }
                        $this.addClass("on").siblings().removeClass("on");
                        $album.eq(i).show().siblings().hide();
                    });
                });

                if (album === '0' || album === '4' || album === '5') {
                    $tabClassifyLi.eq(0).click();
                }
                // showLastPlayAlbum
                function showLastPlayAlbum(album) {
                    var $teq = $tabClassifyLi.eq(album);
                    if (album > 0 && $teq.attr('data-loaded') === '0') {
                        // 专辑列表读取数据
                        loadDataCtl(album);
                        $tabClassifyLi.eq(album).attr('data-loaded', '1');
                    }

                    clearTimeout(timeout3);
                    timeout3 = setTimeout(function () {
                        $('[data-action=' + type + ']').addClass("on").siblings().removeClass("on");
                    }, 800);

                    $teq.addClass("on").siblings().removeClass("on");
                    $album.eq(album).show().siblings().hide();
                }

                if (type !== defaultList) {
                    clearTimeout(timeout4);
                    timeout4 = setTimeout(function () {
                        showLastPlayAlbum(album);
                    }, 1000);
                } else {
                    $album.eq(0).show().siblings().hide();
                }
                // 初始化返回主播放列表按钮
            };

            //*********************************************************************************************************
            //* 业务主入口index
            //*********************************************************************************************************
            var currentController;
            locator.start(function () {
                var request = url.parse(location.hash);
                var Controller = router.route(request);
                if (Controller) {
                    var controller = new Controller();
                    controller.execute(request);
                } else {
                    //alert(404);
                }
            });

            function lazyImg(tag) {
                $(tag).find('.lazy').each(function () {
                    var $this = $(this);
                    var thisAttr = $this.attr('src');
                    var thisDataOriginal = $this.attr('data-original');
                    if (thisAttr !== thisDataOriginal) {
                        $(this).attr('src', thisDataOriginal);
                    }
                });
            }

            // 左侧渲染回调
            function viewRenderAlbum(tag, data, pageName, nid) {
                formatRenderData(tag, data, pageName, changeVar);
                album.action(tag);
            }

            // 顶部推荐渲染回调
            function viewRenderTop(tag, data, pageName) {
                // 播放列表数据过滤
                formatRenderData(tag, data, pageName, topRightBannerCb);
                (0, _resetDataAction2.default)({
                    target: tag,
                    find: '[data-is="action"]',
                    attr: 'data-action'
                });
                topAction(tag);

                //推荐轮播
                var $slideTag = $('#trAdv');
                $slideTag.slide({
                    mainCell: ".theList",
                    effect: "leftLoop",
                    autoPlay: isDev ? false : true,
                    vis: 1,
                    interTime: 5000,
                    prevCell: ".prevBtn",
                    nextCell: ".nextBtn"
                });

                // 点击 box-banner 后停止当前页播放
                $('.adv-box-banner-a').on('click', function () {
                    $("#jquery_jplayer_1").jPlayer("pause");
                });
            }

            //topRightBannerCb
            function topRightBannerCb(tempObj, str, dataTit, dataUrl, dataTime, dataAbs, dataPic, playlist, dataNod, dataAut, tag, i, extendObj) {
                if (extendObj.mp3) {
                    tempObj += '\n            <li data-is="action">\n                <div class="imgs">\n                    <img class="lazy" \n                        src="img/loading.gif"\n                        data-original="' + dataPic + '" \n                        width="164" height="149"\n                        alt="' + dataTit + '" \n                    />\n                </div>\n                <div class="info">\n                    <h3>' + dataTit + '</h3>\n                    <span class="playBtn">\u7ACB\u5373\u64AD\u653E</span>\n                    <span class="time"><span>' + dataTime + '</span>\n                    <span>\u65F6\u957F:' + dataAut + '\u5206</span></span>\n                </div>\n            </li>\n        ';
                } else {
                    tempObj += '\n            <li data-banner="' + (i + 1) + ',' + extendObj.DocID + ',' + extendObj.Title + ',' + extendObj.PubTime + '">\n                <div class="imgs">\n                    <a href="' + dataUrl + '" class="adv-box-banner-a" target="_blank">\n                        <img class="lazy adv-box-banner-img" \n                            src="img/loading.gif"\n                            data-original="' + dataPic + '" \n                            width="100%" height="149"\n                            alt="' + dataTit + '" \n                        />\n                        <div class="adv-box-banner-title">\n                            <div class="adv-box-banner-title-text">' + dataTit + '</div>\n                            <div class="adv-box-banner-title-abs">\n                                ' + (dataAbs === '暂无数据' ? '' : dataAbs) + '\n                            </div>\n                            <div class="adv-box-banner-title-pubtime">' + dataTime + '</div>\n                        </div>\n                    </a>\n                </div>\n            </li>\n        ';
                }
                str.push(tempObj);
                return str;
            }

            // 顶部推荐获取点击事件
            function topAction(tag) {
                $(tag).on('click', '[data-action]', function () {
                    var topNid = config.top[0].nid;
                    var query = url.parse(location.hash).query;
                    var type = query.type;
                    var pagenum = query.pagenum;
                    var dataAaction = $(this).attr('data-action');
                    locationCtl(topNid, pagenum, dataAaction, 4);
                    if (type !== topNid) {
                        loadData(topNid, defaultCnt, defaultPageName, 1, 1, 1, setList, defaultTag);
                    }
                    playlistPlay(dataAaction);
                    $('.albumIn2').find('.on').removeClass('on');
                });
            }

            function itemCtl() {
                var request = url.parse(location.hash);
                var pagenum = request.query.pagenum;
                var type = request.query.type;
                var album = request.query.album;
                var item = $(defaultTag).find('.jp-playlist-current').find('[data-item]').attr('data-item');
                $list.attr('data-pagenum', pagenum);
                locationCtl(type, pagenum, item, album);
            }

            // 更改 location.hash
            function locationCtl(type, pagenum, item, album) {
                location.hash = hash.type + type + hash.pagenum + pagenum + hash.item + item + hash.album + album;
            }

            function addBackMainList() {
                if (window.location.href.indexOf(defaultList) !== -1) {
                    $('#backMainList').fadeOut();
                } else {
                    $('#backMainList').fadeIn();
                }
            }

            var share = {
                shareOpt: null,
                qrcode: function qrcode() {
                    var title = this.shareOpt.title;
                    var url = this.shareOpt.url;
                    var html = '<span class="weChatQRCodeBox hide" id="weChatQRCodeBox">' + '<span class="weChatQRCodeBoxIn">' + '<span class="close' + (ieVersion <= 9.0 ? '">x<' : ' iconClose"><') + '/span>' + '<div class="qrcodeBox" id="itemQRcode"></div>' +
                        // '<span class="t">扫一扫分享至手机' + url + '</span>' +
                        '<span class="t" data-url="' + url + '">' + title + '<br>' + '<strong style="font-size:14px;">扫一扫分享至手机</strong>' +
                        // '<a href="' + url + '">' + title + '</a>' +
                        '</span>' +
                        // '<span style="display: block"><a href="' + url + '">' + title + '</a></span>' +
                        '</span>' + '</span>';
                    $body.append(html);
                    $blur.addClass('blur');
                    var width = '240';
                    var height = width;
                    var $itemQRcode = $('#itemQRcode');
                    var qrcodeUrl = url;
                    if (ie8) {
                        $itemQRcode.qrcode({
                            width: width,
                            height: height,
                            render: "table",
                            text: qrcodeUrl
                        });
                    } else {
                        $itemQRcode.qrcode({
                            width: width,
                            height: height,
                            text: qrcodeUrl
                        });
                    }
                    var $weChatQRCodeBox = $('#weChatQRCodeBox');
                    $weChatQRCodeBox.fadeIn()
                        //.on('click', '.close', function () {
                        .on('click', function () {
                            $blur.removeClass('blur');
                            $weChatQRCodeBox.fadeOut('fast', function () {
                                $(this).remove();
                            });
                        });
                },
                set: function set() {
                    //PC share
                    var bTitle = $('#jp-details').find('.jp-title').text();
                    var bPicLinks = $('#jquery_jplayer_1').find('img').attr('src');
                    var bLinkUrl = href.convert();
                    this.shareOpt = {
                        title: bTitle,
                        url: bLinkUrl
                    };
                    var temp = '<span class="bds_more">分享到: </span>' + '<a href="http://t.home.news.cn/share.jsp?url=' + bLinkUrl + '&title=' + bTitle + '&pic=' + bPicLinks + '" target="_blank" class="bds_xinhua" data-cmd="xinhua" title="分享到新华微博">新华微博</a>' + '<a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + bLinkUrl + '&title=' + bTitle + '&pic=' + bPicLinks + '" target="_blank" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间">QQ空间</a>' + '<a href="http://service.weibo.com/share/share.php?url=' + bLinkUrl + '&title=' + bTitle + '&pic=' + bPicLinks + '" target="_blank" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博">新浪微博</a>' + '<span class="wechat" title="扫码分享到微信" onClick="share.qrcode();">微信</span>';
                    $('.jp-playlist-current').find('.shareBtnBox')[0].innerHTML = temp;
                }
            };

            //audioListSlimScroll
            function audioListSlimScroll(tag, width, height, size) {
                tag.slimScroll({
                    width: width,
                    height: height,
                    size: size,
                    alwaysVisible: true,
                    allowPageScroll: true
                });
            }

            // #video-url
            function checkVideoUrl() {
                var url = getVideoUrl();
                var isVideoUrl = url.indexOf('http://') !== -1;
                console.log('checkVideoUrl: ', isVideoUrl);
                return isVideoUrl;
            }

            function getVideoUrl() {
                var url = $.trim($('#video-url').text());
                console.log('getVideoUrl: ', url);
                return url;
            }

            function getVideoOffTime() {
                var time = $.trim($('#video-off-time').text()) || 40;
                console.log(time);
                return time;
            }

            function setSizeDialog() {
                var $window = $(window);
                var height = Math.round($window.height() * .98);
                var width = Math.round(height * 9 / 16);
                $('.dialog-body').css({
                    'height': height,
                    'margin-top': -height * .5,
                    'width': width,
                    'margin-left': -width * .5
                });
                $('.video-play-btn').hide();
            }

            function audioPlay() {
                $("#jquery_jplayer_1").jPlayer("play");
                $('.video-play-btn').show();
            }

            function audioPause() {
                $("#jquery_jplayer_1").jPlayer("pause");
                $('.video-play-btn').hide();
            }

            function clearHandler(timeout) {
                console.log('clearHandler');
                clearTimeout(timeout);
                timeout = null;
                isVideoCanPlay = false;
            }

            function showVideoDialog() {
                console.log(checkVideoUrl(), isVideoCanPlay);
                if (checkVideoUrl() && isVideoCanPlay) {
                    audioPause();
                    var dialog = void 0;
                    var dialogObj = {
                        maskClose: true,
                        html: '<iframe class="form-iframe" name="form-iframe" width="100%" height="100%" frameborder="0" scrolling="no" src="' + getVideoUrl() + '"></iframe>',
                        callback: function callback() {
                            $('#dialog-mask').off('click');
                            setSizeDialog();
                            var timeout = setTimeout(function () {
                                dialog.close();
                                audioPlay();
                                clearHandler(timeout);
                            }, getVideoOffTime() * 1000);

                            $('.close-icon').on('click', function () {
                                audioPlay();
                                clearHandler(timeout);
                            });

                            // $('iframe, .form-iframe').mouseleave(function(){
                            //     console.log("mouseleave");
                            // });
                        }
                    };
                    console.log(dialogObj);
                    // 执行 dialog
                    if (dialog && dialog.dialog && dialog.dialog.close) {
                        dialog.dialog.close();
                    }
                    dialog = new XhDialog(dialogObj);
                    dialog.show();
                }
            }

            window.formatImgSrc = formatImgSrc;
            window.share = share;
            window.cookie = cookie;
            window.listMore = listMore;
            /****************************************************************************
             * 文档准备就绪
             ***************************************************************************/

            $(function () {
                $('#backMainList').html('\n            <li data-action="' + defaultList + '">\n                <div>\n                    ' + backAHtml + '\n                </div>\n            </li>\n        ').on('click', function () {
                    var $this = $(this);
                    loadData(defaultList, defaultCnt, defaultPageName, 1, 1, 1, setList, defaultTag);
                    backHomePage();
                    $this.fadeOut();
                    setTimeout(function () {
                        $("#jquery_jplayer_1").jPlayer("play");
                    }, 1000);
                });
                addBackMainList();

                if (checkVideoUrl()) {
                    $('.video-play-btn').on('click', function () {
                        isVideoCanPlay = true;
                        showVideoDialog();
                    });
                }
                // banner
                $("#jquery_jplayer_2").jPlayer({
                    ready: function ready() {
                        $(this).jPlayer("setMedia", {
                            m4v: "http://vodfile1.news.cn/data/cdn_transfer/58/C7/582ea06e545d3e45b1c8e639517dededdfb680c7.mp4",
                            poster: "http://www.xinhuanet.com/xinhuaradio/bundle/bannerPoster.jpg"
                        });
                        $(this).jPlayer("play");
                        $(this).jPlayer("repeat");
                        $(this).jPlayer("mute");
                        $('#jp_poster_0').hide();
                    },
                    play: function play() {
                        clearTimeout(timeout);
                        timeout = setTimeout(function () {
                            $('#videoBox').slideUp(2500, function () {
                                $("#jquery_jplayer_2").jPlayer("stop");
                            });
                        }, 10000);
                    },
                    swfPath: "http://www.xinhuanet.com/xinhuaradio/bundle",
                    supplied: "m4v",
                    cssSelectorAncestor: "#jp_container_2",
                    wmode: "window",
                    useStateClassSkin: true,
                    autoBlur: false,
                    smoothPlayBar: false,
                    keyEnabled: false,
                    size: {
                        width: 1920,
                        height: 1080
                    }
                });

                if (album === '0' || album === '4' || album === '5') {
                    // 判断是否加载栏目0作为左边栏的首评（资讯）
                    loadDataCtl(0, config.album);
                }

                loadDataCtl(0, config.top);
                loadDataCtl(0, config.main);

                //
                audioListSlimScroll($("#audioListBox"), "424px", "703px", "4px");
                audioListSlimScroll($(".albumBox").find(".albumCon").find(".albumIn"), "459px", "703px", "4px");
                var albumBannerTxt = $.trim($('#nameCtl').text());
                if (albumBannerTxt === '' || albumBannerTxt === undefined) {
                    albumBannerTxt = '新华网融媒体产品创新中心出品';
                }
                $('#jp_container_1').find('.albumBanner').css({
                    'position': 'relative'
                }).append('<div class="albumBanner_bigTitle">' + albumBannerTxt + '</div>');
                $('#videoBox').append('<div class="albumBanner_bigTitle">' + albumBannerTxt + '</div>');

                // if (hasVod) {
                //     showVideoDialog(vUrl);
                //     // // $("#jquery_jplayer_1").jPlayer("pause");
                //     // setTimeout(function() {
                //     //     console.log(11);
                //     //     $("#jquery_jplayer_1").jPlayer("pause");
                //     // }, 800);
                // }
                (0, _footer2.default)();
            });

            /***/
}),
    /* 1 */
    /***/ (function (module, exports, __webpack_require__) {

            "use strict";


            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            exports.default = function () {
                var href = window.location.href;
                var isDev = /dev/.test(href) || /localhost/.test(href);
                // || /117:3000/.test(href)
                console.log('====================================');
                console.log('isDev: ', isDev);
                console.log('====================================');
                return isDev;
            };

            /***/
}),
    /* 2 */
    /***/ (function (module, exports, __webpack_require__) {

            "use strict";


            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var footer = function footer() {
                var date = new Date();
                var targetBlank = 'target="_blank"';
                var hrefCom = 'href="http://www.xinhuanet.com"';
                var hrefLtd = 'href="http://www.xinhuanet.ltd"';
                $('#footer').html('\n        Copyright &copy; 2000 - ' + date.getFullYear() + ' <a ' + hrefCom + ' ' + targetBlank + '>XINHUANET.com</a>All Rights Reserved.<br>\n        \u7248\u6743\u6240\u6709 <a ' + hrefLtd + ' ' + targetBlank + '>\u65B0\u534E\u7F51\u80A1\u4EFD\u6709\u9650\u516C\u53F8</a>&#12288;\u7248\u6743\u6240\u6709 <a ' + hrefLtd + ' ' + targetBlank + '>\u65B0\u534E\u7F51\u80A1\u4EFD\u6709\u9650\u516C\u53F8</a>\n    ');
            };

            exports.default = footer;

            /***/
}),
    /* 3 */
    /***/ (function (module, exports, __webpack_require__) {

            "use strict";


            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var resetDataAction = function resetDataAction(_ref) {
                var target = _ref.target,
                    find = _ref.find,
                    attr = _ref.attr;

                $(target).find(find).each(function (i, e) {
                    var $e = $(e);
                    $e.find('.playBtn').attr(attr, i + 1);
                });
            };

            exports.default = resetDataAction;

            /***/
})
    /******/]);
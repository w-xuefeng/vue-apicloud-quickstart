"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var js_base64_1 = require("js-base64");
exports.default = (function (opts) {
    var pages = opts.pages;
    var isHttpUrl = function (url) {
        return ['https://', 'http://', '//'].some(function (e) { return url.startsWith(e); });
    };
    var getPageMap = function () {
        return pages.reduce(function (rst, page) {
            rst[page.name] = __assign(__assign({}, page), { htmlPath: page.path.replace(/\/(\w)/, function (match, $1) {
                    return $1.toLocaleLowerCase();
                }) });
            return rst;
        }, {});
    };
    var getQueryString = function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        return r != null ? decodeURI(r[2]) : null;
    };
    var bindKeyBackExitApp = function () {
        if (typeof api !== 'undefined') {
            window.api.addEventListener({
                name: 'keyback',
            }, function () {
                window.api.toast({
                    msg: '再按一次返回键退出' + window.api.appName,
                    duration: 2000,
                    location: 'bottom',
                });
                window.api.addEventListener({
                    name: 'keyback',
                }, function () {
                    window.api.closeWidget({ silent: true });
                });
                setTimeout(function () {
                    bindKeyBackExitApp();
                }, 3000);
            });
        }
    };
    var n2p = function (name) {
        if (getPageMap()[name]) {
            return getPageMap()[name].htmlPath;
        }
        else {
            return undefined;
        }
    };
    var open = function (url, _a) {
        var _b = _a === void 0 ? {} : _a, name = _b.name, pageParam = _b.pageParam, animation = _b.animation, winOpts = _b.winOpts;
        url = url.endsWith('.html') ? url : isHttpUrl(url) ? url : url + '.html';
        if (typeof api === 'undefined') {
            if (pageParam) {
                url = url + "?pageParam=" + js_base64_1.Base64.encodeURI(JSON.stringify(pageParam));
            }
            window.top.location.href = url;
            return;
        }
        name = name ? name : "win_" + url;
        var params = __assign({ name: name,
            url: url,
            pageParam: pageParam,
            animation: animation }, (winOpts || {}));
        window.api.openWin(params);
    };
    var push = function (opts) {
        if (typeof opts === 'string') {
            return open(opts);
        }
        var _a = opts.name, name = _a === void 0 ? '' : _a;
        var url = n2p(name);
        if (url) {
            return open(url, opts);
        }
    };
    var replace = function (opts) {
        var currentWin = api.winName;
        push(opts);
        if (typeof api === 'undefined')
            return;
        var time = typeof opts === 'object' && opts.animation && opts.animation.duration
            ? opts.animation.duration
            : 0;
        setTimeout(function () {
            window.api.closeWin({ name: currentWin, animation: { type: 'none' } });
        }, time);
    };
    var close = function (opts) {
        if (typeof api === 'undefined') {
            window.history.back();
            return;
        }
        window.api.closeWin(opts);
    };
    var closeToWin = function (_a) {
        var url = _a.url, animation = _a.animation;
        url = url.endsWith('.html') ? url : url + '.html';
        if (typeof api !== 'undefined') {
            var name_1 = "win_" + url;
            if (animation) {
                window.api.closeToWin({ name: name_1, animation: animation });
            }
            else {
                window.api.closeToWin({ name: name_1 });
            }
        }
        else {
            window.location.href = url;
        }
    };
    var pageParam = function () {
        if (typeof api !== 'undefined') {
            return window.api.pageParam;
        }
        else {
            var param = getQueryString('pageParam');
            return param ? JSON.parse(js_base64_1.Base64.decode(param)) : undefined;
        }
    };
    var getSafeArea = function () {
        if (typeof api !== 'undefined') {
            return window.api.safeArea;
        }
        else {
            return { top: 0, left: 0, bottom: 0, right: 0 };
        }
    };
    var getWinSize = function () {
        if (typeof api !== 'undefined') {
            return {
                winHeight: window.api.winHeight,
                winWidth: window.api.winWidth,
            };
        }
        return {
            winHeight: window.screen.availHeight,
            winWidth: window.screen.availWidth,
        };
    };
    var setPullDownRefresh = function (fn, options) {
        if (typeof api !== 'undefined') {
            window.api.setRefreshHeaderInfo(Object.assign({
                visible: true,
                loadingImg: 'widget://image/refresh.png',
                bgColor: '#282c34',
                textColor: '#fff',
                textDown: '下拉刷新...',
                textUp: '松开刷新...',
                showTime: true,
            }, options), function (ret, err) {
                fn && fn(ret, err);
            });
        }
    };
    var openFrame = function (params) {
        var url = params.url;
        url = url.endsWith('.html') ? url : isHttpUrl(url) ? url : url + '.html';
        if (typeof api !== 'undefined') {
            window.api.openFrame(__assign(__assign({}, params), { url: url }));
        }
        else {
            var name_2 = params.name, rect = params.rect, pageParam_1 = params.pageParam;
            var iframe = document.createElement('iframe');
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('name', name_2);
            if (pageParam_1) {
                url = url + "?pageParam=" + js_base64_1.Base64.encodeURI(JSON.stringify(pageParam_1));
            }
            iframe.src = url;
            iframe.style.position = 'absolute';
            if (rect) {
                if (rect.x) {
                    iframe.style.left = rect.x + "px";
                }
                if (rect.y) {
                    iframe.style.top = rect.y + "px";
                }
                if (rect.w) {
                    iframe.style.width = rect.w === 'auto' ? '100%' : rect.w + "px";
                }
                if (rect.h) {
                    iframe.style.height = rect.h === 'auto' ? '100%' : rect.h + "px";
                }
            }
            document.body.appendChild(iframe);
        }
    };
    var toast = function (_a) {
        var msg = _a.msg, _b = _a.duration, duration = _b === void 0 ? 3000 : _b, _c = _a.location, location = _c === void 0 ? 'bottom' : _c;
        if (typeof api !== 'undefined') {
            window.api.toast({ msg: msg, duration: duration, location: location });
            return;
        }
        var vlocation = location === 'bottom'
            ? 'bottom: 10%;'
            : location === 'top'
                ? 'top: 10%;'
                : 'top: 50%;';
        var toastElement = document.createElement('div');
        toastElement.innerHTML = msg;
        toastElement.style.cssText = "\n     " + vlocation + ";\n      max-width:60%;\n      min-width:150px;\n      padding:0 14px;\n      height: 40px;\n      color: rgb(255, 255, 255);\n      line-height: 40px;\n      text-align: center;\n      border-radius: 4px;\n      position: fixed;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      z-index: 999999;\n      background: rgba(0, 0, 0, 0.75);\n      font-size: 16px;\n    ";
        document.body.appendChild(toastElement);
        setTimeout(function () {
            var delay = 0.5;
            toastElement.style.webkitTransition = "-webkit-transform " + delay + "s ease-in, opacity " + delay + "s ease-in";
            toastElement.style.opacity = '0';
            setTimeout(function () {
                document.body.removeChild(toastElement);
            }, delay * 1000);
        }, duration);
    };
    var randomColor = function (opts) {
        var _a = opts || {}, _b = _a.rgb, rgb = _b === void 0 ? false : _b, _c = _a.opacity, opacity = _c === void 0 ? 1 : _c;
        var a = opacity === 'random'
            ? Number(Math.random().toFixed(3))
            : opacity > 1 || opacity < 0
                ? 1
                : opacity;
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        var color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
        if (rgb) {
            color = a === 1 ? "rgb(" + r + "," + g + "," + b + ")" : "rgba(" + r + "," + g + "," + b + "," + a + ")";
        }
        return color;
    };
    var isLightColor = function (color) {
        var colorR = 255;
        var colorG = 255;
        var colorB = 255;
        if (color && color.includes('#')) {
            color = color.substring(1);
            color = color.length === 3 ? color + color : color;
            colorR = parseInt(color[0] + color[1], 16);
            colorG = parseInt(color[2] + color[3], 16);
            colorG = parseInt(color[4] + color[5], 16);
        }
        if (color && color.includes('rgb')) {
            var colors = color
                .replace(/rgb[a]?\(([\w\W]+)\)/, function ($0, $1) { return $1; })
                .split(',');
            colorR = parseInt(colors[0]);
            colorG = parseInt(colors[1]);
            colorB = parseInt(colors[2]);
        }
        return 0.213 * colorR + 0.715 * colorG + 0.072 * colorB > 255 / 2;
    };
    var setStatusBarStyle = function (statusBar) {
        if (typeof statusBar === 'string') {
            window.api.setStatusBarStyle({
                color: statusBar,
                style: isLightColor(statusBar) ? 'dark' : 'light',
            });
        }
        if (typeof statusBar === 'object' && statusBar.color) {
            window.api.setStatusBarStyle({
                color: statusBar.color,
                style: statusBar.style
                    ? statusBar.style
                    : isLightColor(statusBar.color)
                        ? 'dark'
                        : 'light',
                animated: !!statusBar.animated,
            });
        }
    };
    return {
        page: { open: open, push: push, replace: replace, close: close, closeToWin: closeToWin, pageParam: pageParam },
        frame: { open: openFrame },
        pagesInfo: Object.keys(getPageMap()).map(function (k) { return (__assign({}, getPageMap()[k])); }),
        toast: toast,
        getPageMap: getPageMap,
        getQueryString: getQueryString,
        bindKeyBackExitApp: bindKeyBackExitApp,
        n2p: n2p,
        getSafeArea: getSafeArea,
        getWinSize: getWinSize,
        setPullDownRefresh: setPullDownRefresh,
        randomColor: randomColor,
        isLightColor: isLightColor,
        setStatusBarStyle: setStatusBarStyle,
    };
});

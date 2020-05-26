"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var noop = function () { };
var updateOrientation = function () {
    var update = function () {
        setTimeout(function () {
            document.dispatchEvent(new MessageEvent('updateOrientation'));
        }, 200);
    };
    window.addEventListener('orientationchange', update, false);
};
var initApiReady = function (debugOnPC) {
    return new Promise(function (resolve) {
        window.apiready = function () {
            return utils_1.catchApiError(function () {
                updateOrientation();
                if (typeof api !== 'undefined' && api.systemType === 'ios') {
                    document.addEventListener('touchstart', noop, false);
                }
                resolve(debugOnPC);
            });
        };
        if (typeof api === 'undefined' && debugOnPC) {
            window.apiready();
        }
    });
};
var install = function (Vue, options) {
    function initApp(opts) {
        var _a;
        return initApiReady(!!((_a = options) === null || _a === void 0 ? void 0 : _a.debugOnPC))
            .then(function () { return new Vue(opts); })
            .then(function (vm) { return (document.dispatchEvent(new MessageEvent('apiEventReady')), vm); });
    }
    Object.defineProperty(Vue, 'init', {
        value: initApp,
    });
    Vue.mixin({
        beforeCreate: function () {
            var _this = this;
            var _a = (options || {}).debugOnPC, debugOnPC = _a === void 0 ? false : _a;
            var _self = this;
            var vmOptions = this.$options;
            _self._isApiready = false;
            _self._debugOnPC = debugOnPC;
            document.addEventListener('apiEventReady', function () {
                utils_1.catchApiError(function () {
                    var addAPIEventListener = function (apiEvent) {
                        var _loop_1 = function (key) {
                            if (apiEvent.hasOwnProperty(key)) {
                                var eventListener = apiEvent[key];
                                var _a = typeof eventListener === 'function'
                                    ? [eventListener, { name: key }]
                                    : [
                                        eventListener.handle,
                                        { name: key, extra: eventListener.extra },
                                    ], handle_1 = _a[0], param = _a[1];
                                if (typeof handle_1 === 'function') {
                                    api.addEventListener(param, function (ret, err) {
                                        handle_1.bind(_this).call(_this, ret, err);
                                    });
                                }
                            }
                        };
                        for (var key in apiEvent) {
                            _loop_1(key);
                        }
                    };
                    var _a = (_self.$data || {}).$apiEventOptions, $apiEventOptions = _a === void 0 ? {} : _a;
                    if ('apiEvent' in vmOptions) {
                        var apiEvent = vmOptions.apiEvent;
                        addAPIEventListener(apiEvent);
                    }
                    if (Object.keys($apiEventOptions).length > 0) {
                        addAPIEventListener($apiEventOptions);
                    }
                }, {
                    cn: 'apiEvent 只能在移动设备上执行',
                    en: 'apiEvent can be run on mobile devices only',
                });
                _self._isApiready = true;
                if (_self._isMounted) {
                    _self.__ready();
                }
            });
            document.addEventListener('updateOrientation', function () {
                vmOptions.onWindowChange && vmOptions.onWindowChange.bind(_this).call();
            });
        },
        mounted: function () {
            var _self = this;
            _self._isMounted = true;
            if (_self._isApiready) {
                _self.__ready();
            }
        },
        methods: {
            __ready: function () {
                var _this = this;
                var _self = this;
                if (_self.__readyed) {
                    return;
                }
                _self.__readyed = true;
                if (_self.$options.onReady) {
                    utils_1.catchApiError(function () {
                        _self.$options.onReady.bind(_this).call();
                    });
                }
            },
        },
    });
};
var ReadyPlugin = {
    install: install,
};
exports.default = ReadyPlugin;

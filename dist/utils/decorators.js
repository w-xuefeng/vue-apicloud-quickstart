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
var index_1 = require("./index");
exports.APIEvent = function (extra) {
    return function (target, key) {
        var _a;
        if (typeof target[key] === 'function') {
            var oldEvents = target.$apiEventOptions || {};
            var newEvent = {};
            if (extra) {
                newEvent = __assign(__assign({}, extra), { handel: target[key] });
            }
            else {
                newEvent = target[key];
            }
            target.$apiEventOptions = __assign(__assign({}, oldEvents), (_a = {}, _a[key] = newEvent, _a));
        }
    };
};
exports.VueAPICloud = function (target) {
    var _a = target.options.methods, methods = _a === void 0 ? {} : _a;
    target.options = index_1.bringFunc(['onWindowChange', 'onReady'], methods, target.options);
};

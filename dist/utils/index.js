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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpFunc_1 = __importDefault(require("./helpFunc"));
exports.apiError = ['api is not defined', 'apiready is not defined'];
exports.handelApiError = function (error, msg) {
    if (exports.apiError.includes(error.message)) {
        var _a = msg || {}, _b = _a.cn, cn = _b === void 0 ? '' : _b, _c = _a.en, en = _c === void 0 ? '' : _c;
        var warningEN = en || 'Please use mobile device to debug native module';
        var warningCN = cn || '请使用移动设备调试原生模块';
        console.warn("[There is no api on the PC side] " + warningEN);
        console.warn("[PC \u7AEF\u6CA1\u6709 API \u73AF\u5883\u53D8\u91CF] " + warningCN);
        console.info(error.stack);
        return error;
    }
    throw error;
};
exports.catchApiError = function (fn, msg) {
    try {
        return fn();
    }
    catch (error) {
        return exports.handelApiError(error, msg);
    }
};
exports.bringFunc = function (funcName, from, to) {
    var res = __assign({}, to);
    if (Array.isArray(funcName)) {
        for (var _i = 0, funcName_1 = funcName; _i < funcName_1.length; _i++) {
            var func = funcName_1[_i];
            if (from[func] && typeof from[func] === 'function') {
                res[func] = from[func];
            }
        }
    }
    else {
        if (from[funcName] && typeof from[funcName] === 'function') {
            res[funcName] = from[funcName];
        }
    }
    return res;
};
exports.default = helpFunc_1.default;

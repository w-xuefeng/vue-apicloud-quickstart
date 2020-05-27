"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __importDefault(require("../utils"));
var request_1 = __importDefault(require("../request"));
require("../utils/api");
var install = function (Vue, options) {
    if (options) {
        var helpFuncs_1 = utils_1.default(options);
        Object.keys(helpFuncs_1).forEach(function (funcName) {
            Object.defineProperty(Vue.prototype, "$" + funcName, {
                get: function () {
                    return helpFuncs_1[funcName];
                }
            });
        });
    }
    Object.defineProperty(Vue.prototype, 'api', {
        get: function () {
            return window.api;
        }
    });
    Object.defineProperty(Vue.prototype, '$api', {
        get: function () {
            return window.$api;
        }
    });
    Object.defineProperty(Vue.prototype, '$req', {
        get: function () {
            return request_1.default;
        }
    });
    if (!Object.getOwnPropertyNames(window.HTMLElement.prototype).includes('getRect')) {
        Object.defineProperty(window.HTMLElement.prototype, 'getRect', {
            get: function () {
                var rect = this.getBoundingClientRect();
                var clientLeft = document.documentElement.clientLeft || document.body.scrollLeft;
                var clientTop = document.documentElement.clientTop || document.body.scrollTop;
                var top = rect.top - clientTop;
                var bottom = rect.bottom - clientTop;
                var left = rect.left - clientLeft;
                var right = rect.right - clientLeft;
                var width = rect.width || right - left;
                var height = rect.height || bottom - top;
                return {
                    x: left,
                    y: top,
                    width: width,
                    height: height,
                    left: left,
                    top: top,
                    right: right,
                    bottom: bottom
                };
            }
        });
    }
    if (!Object.getOwnPropertyNames(window.HTMLElement.prototype).includes('computedStyle')) {
        Object.defineProperty(window.HTMLElement.prototype, 'computedStyle', {
            get: function () {
                return window.getComputedStyle(this);
            }
        });
    }
};
var HelpPlugin = {
    install: install
};
exports.default = HelpPlugin;

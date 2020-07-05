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
var axios_1 = __importDefault(require("axios"));
var utils_1 = require("../utils");
var NetworkRequest = /** @class */ (function () {
    function NetworkRequest(opts) {
        this.baseUrl = '';
        this.tag = '';
        this.requestOptions = __assign({ url: '', headers: {}, method: 'get', timeout: 30, dataType: 'json', returnAll: false, charset: 'utf-8', report: false, cache: false, safeMode: 'none' }, opts);
    }
    NetworkRequest.prototype.interceptor = function (opts) {
        return !!opts;
    };
    NetworkRequest.prototype.afterRequest = function (ret) {
        return ret;
    };
    NetworkRequest.prototype.handleError = function (err) {
        if (err) {
        }
    };
    NetworkRequest.prototype.readyForRequest = function (opts) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.tag = opts.tag || _this.tag || "ajax-" + new Date().getTime();
            _this.requestOptions = __assign(__assign(__assign({}, _this.requestOptions), opts), { tag: _this.tag, url: utils_1.isHttpUrl(opts.url) ? opts.url : "" + _this.baseUrl + opts.url, data: {
                    values: opts.data,
                    files: opts.files,
                    stream: opts.stream,
                    body: opts.body,
                } });
            resolve(_this.requestOptions);
        });
    };
    NetworkRequest.prototype.requestForClient = function (opts) {
        var _this = this;
        var isContinue = this.interceptor(opts);
        if (!isContinue) {
            return new Promise(function (resolve, reject) {
                return reject('The request is intercepted by interceptor');
            });
        }
        return new Promise(function (resolve, reject) {
            window.api.ajax(opts, function (ret, err) {
                if (ret) {
                    return resolve(_this.afterRequest(ret));
                }
                else {
                    return reject(err);
                }
            });
        });
    };
    NetworkRequest.prototype.requestForBrower = function (opts) {
        var _this = this;
        this.tag =
            typeof this.tag === 'string' ? axios_1.default.CancelToken.source() : this.tag;
        this.requestOptions.tag = this.tag;
        var isContinue = this.interceptor(opts);
        if (!isContinue) {
            return new Promise(function (resolve, reject) {
                return reject('The request is intercepted by interceptor');
            });
        }
        var axiosRequestConfig = {
            url: opts.url,
            method: opts.method,
            baseURL: this.baseUrl,
            headers: opts.headers,
            data: (opts.data && (opts.data.values || opts.data.body)),
            timeout: (opts.timeout || 30) * 1000,
            proxy: opts.proxy,
            cancelToken: this.tag.token,
        };
        return axios_1.default
            .request(axiosRequestConfig)
            .then(function (rs) { return _this.afterRequest(rs.data); });
    };
    NetworkRequest.prototype.request = function (opts) {
        var _this = this;
        return this.readyForRequest(opts)
            .then(function (requestOptions) {
            return typeof api !== 'undefined'
                ? _this.requestForClient(requestOptions)
                : _this.requestForBrower(requestOptions);
        })
            .catch(function (err) { return _this.handleError(err); });
    };
    NetworkRequest.prototype.get = function (url, data) {
        if (data) {
            var params = Object.entries(data)
                .filter(function (e) { return String(e[1]).trim() !== ''; })
                .map(function (e) { return e[0] + "=" + e[1]; })
                .join('&');
            url = url + "?" + params;
        }
        return this.request({ url: url });
    };
    NetworkRequest.prototype.post = function (url, data, headers) {
        return this.request({ url: url, data: data, headers: headers, method: 'post' });
    };
    NetworkRequest.prototype.setBaseUrl = function (url) {
        this.baseUrl = url;
    };
    NetworkRequest.prototype.setTag = function (tag) {
        if (typeof api !== 'undefined' && tag) {
            this.tag = tag;
        }
        else {
            this.tag = axios_1.default.CancelToken.source();
        }
    };
    NetworkRequest.prototype.getTag = function () {
        return this.tag;
    };
    NetworkRequest.prototype.cancelAjax = function (tag, msg) {
        if (typeof api !== 'undefined') {
            window.api.cancelAjax({ tag: tag });
        }
        else {
            ;
            this.tag.cancel(msg);
        }
    };
    return NetworkRequest;
}());
exports.NetworkRequest = NetworkRequest;
exports.default = new NetworkRequest();

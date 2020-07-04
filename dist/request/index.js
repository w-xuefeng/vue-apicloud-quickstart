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
        if (err) { }
    };
    NetworkRequest.prototype.readyForRequest = function (opts) {
        var isHttpUrl = function (url) {
            return ['https://', 'http://', '//'].some(function (e) { return url.startsWith(e); });
        };
        this.tag = opts.tag || this.tag || "ajax-" + new Date().getTime();
        this.requestOptions = __assign(__assign(__assign({}, this.requestOptions), opts), { tag: this.tag, url: isHttpUrl(opts.url) ? opts.url : "" + this.baseUrl + opts.url, data: {
                values: opts.data,
                files: opts.files,
                stream: opts.stream,
                body: opts.body,
            } });
    };
    NetworkRequest.prototype.requestForClient = function () {
        var _this = this;
        var isContinue = this.interceptor(this.requestOptions);
        if (!isContinue) {
            return new Promise(function (resolve, reject) {
                return reject('The request is intercepted by interceptor');
            });
        }
        return new Promise(function (resolve, reject) {
            window.api.ajax(_this.requestOptions, function (ret, err) {
                if (ret) {
                    return resolve(_this.afterRequest(ret));
                }
                else {
                    return reject(err);
                }
            });
        });
    };
    NetworkRequest.prototype.requestForBrower = function () {
        var _this = this;
        this.tag = typeof this.tag === 'string' ? axios_1.default.CancelToken.source() : this.tag;
        this.requestOptions.tag = this.tag;
        var isContinue = this.interceptor(this.requestOptions);
        if (!isContinue) {
            return new Promise(function (resolve, reject) {
                return reject('The request is intercepted by interceptor');
            });
        }
        var axiosRequestConfig = {
            url: this.requestOptions.url,
            method: this.requestOptions.method,
            baseURL: this.baseUrl,
            headers: this.requestOptions.headers,
            data: this.requestOptions.data.values || this.requestOptions.data.body,
            timeout: (this.requestOptions.timeout || 30) * 1000,
            proxy: this.requestOptions.proxy,
            cancelToken: this.tag.token
        };
        return axios_1.default
            .request(axiosRequestConfig)
            .then(function (rs) { return _this.afterRequest(rs.data); });
    };
    NetworkRequest.prototype.request = function (opts) {
        var _this = this;
        this.readyForRequest(opts);
        return (typeof api !== 'undefined'
            ? this.requestForClient()
            : this.requestForBrower()).catch(function (err) { return _this.handleError(err); });
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
            this.tag.cancel(msg);
        }
    };
    return NetworkRequest;
}());
exports.NetworkRequest = NetworkRequest;
exports.default = new NetworkRequest();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var plugins_1 = __importDefault(require("./plugins"));
var request_1 = __importStar(require("./request"));
exports.Request = request_1.default;
exports.NetworkRequest = request_1.NetworkRequest;
var decorators_1 = require("./utils/decorators");
exports.VueAPICloud = decorators_1.VueAPICloud;
exports.APIEvent = decorators_1.APIEvent;
var installFunction = function (Vue, options) {
    if (!options || !options.pages) {
        throw new Error('vue-apicloud-quickstart need options with pages configuration!');
    }
    if (!Array.isArray(options.pages)) {
        throw new Error('pages configuration type must be array!');
    }
    if (options.pages.length === 0) {
        throw new Error('pages configuration can not be empty array!');
    }
    if (process.env.NODE_ENV === 'production') {
        options.debugOnPC = false;
    }
    plugins_1.default.forEach(function (plugin) { return Vue.use(plugin, options); });
};
var VueApicloudQuickstart = /** @class */ (function () {
    function VueApicloudQuickstart() {
        this.installed = false;
    }
    VueApicloudQuickstart.prototype.install = function (Vue, options) {
        if (this.installed)
            return;
        this.installed = true;
        return installFunction(Vue, options);
    };
    return VueApicloudQuickstart;
}());
exports.VueApicloudQuickstart = VueApicloudQuickstart;
var vaq = new VueApicloudQuickstart();
exports.default = vaq;

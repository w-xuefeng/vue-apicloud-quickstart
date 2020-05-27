"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var help_plugin_1 = __importDefault(require("./help.plugin"));
var ready_plugin_1 = __importDefault(require("./ready.plugin"));
exports.default = [
    help_plugin_1.default,
    ready_plugin_1.default
];

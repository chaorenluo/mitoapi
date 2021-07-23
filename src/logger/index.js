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
exports.__esModule = true;
exports.errorLogger = exports.responseLogger = exports.requestLogger = void 0;
var log4js = require("log4js");
var fs = require("fs-extra");
var path_1 = require("path");
var LOG_DIR_NAME = '../../logs';
fs.ensureDirSync(path_1.join(__dirname, LOG_DIR_NAME));
void ['request', 'response', 'error'].forEach(function (t) {
    fs.ensureDirSync(path_1.join(__dirname, LOG_DIR_NAME, t));
});
var resolvePath = function (dir, filename) { return path_1.join(__dirname, LOG_DIR_NAME, dir, filename); };
var commonCinfig = {
    type: 'dateFile',
    pattern: '-yyyy-MM-dd.log',
    alwaysIncludePattern: true
};
log4js.configure({
    appenders: {
        request: __assign(__assign({}, commonCinfig), { filename: resolvePath('request', 'request.log'), category: 'request' }),
        response: __assign(__assign({}, commonCinfig), { filename: resolvePath('response', 'response.log'), category: 'response' }),
        error: __assign(__assign({}, commonCinfig), { filename: resolvePath('error', 'error.log'), category: 'error' })
    },
    categories: {
        "default": { appenders: ['request'], level: 'info' },
        response: { appenders: ['response'], level: 'info' },
        error: { appenders: ['error'], level: 'info' }
    }
});
exports.requestLogger = log4js.getLogger('request');
exports.responseLogger = log4js.getLogger('response');
exports.errorLogger = log4js.getLogger('error');

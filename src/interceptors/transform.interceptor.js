"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TransformInterceptor = void 0;
var common_1 = require("@nestjs/common");
var operators_1 = require("rxjs/operators");
var logger_1 = require("../logger");
var TransformInterceptor = /** @class */ (function () {
    function TransformInterceptor() {
    }
    TransformInterceptor.prototype.intercept = function (context, next) {
        return next.handle().pipe(operators_1.map(function (data) {
            var ctx = context.switchToHttp();
            var response = ctx.getResponse();
            var request = ctx.getRequest();
            var statusCode = response.statusCode;
            var url = request.originalUrl;
            var res = {
                statusCode: statusCode,
                msg: null,
                success: true,
                data: data
            };
            logger_1.responseLogger.info(url, res);
            return res;
        }));
    };
    TransformInterceptor = __decorate([
        common_1.Injectable()
    ], TransformInterceptor);
    return TransformInterceptor;
}());
exports.TransformInterceptor = TransformInterceptor;

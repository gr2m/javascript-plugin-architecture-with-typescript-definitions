"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Base = /** @class */ (function () {
    function Base(options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.options = options;
        // apply plugins
        // https://stackoverflow.com/a/16345172
        var classConstructor = this.constructor;
        classConstructor.plugins.forEach(function (plugin) {
            Object.assign(_this, plugin(_this, options));
        });
    }
    Base.plugin = function (plugin) {
        var _a;
        var currentPlugins = this.plugins;
        var BaseWithPlugins = (_a = /** @class */ (function (_super) {
                __extends(class_1, _super);
                function class_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return class_1;
            }(this)),
            _a.plugins = currentPlugins.concat(plugin),
            _a);
        return BaseWithPlugins;
    };
    Base.defaults = function (defaults) {
        var OctokitWithDefaults = /** @class */ (function (_super) {
            __extends(class_2, _super);
            function class_2() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _super.call(this, Object.assign({}, defaults, args[0] || {})) || this;
            }
            return class_2;
        }(this));
        return OctokitWithDefaults;
    };
    Base.plugins = [];
    return Base;
}());
exports.Base = Base;

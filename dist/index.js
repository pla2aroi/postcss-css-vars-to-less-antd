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
exports.cssVarsToLessAntd = void 0;
var resolve_value_1 = __importDefault(require("./lib/resolve-value"));
function cssVarsToLessAntd(root, themeVars) {
    var _a, _b;
    var variables = {};
    root.walkDecls(function (decl) {
        var _a;
        if (/(--(.+))/.test(decl.prop)) {
            variables = __assign(__assign({}, variables), (_a = {}, _a[decl.prop] = decl.value, _a));
        }
    });
    if (!Object.entries(variables).length) {
        return {};
    }
    var rootVars = {};
    for (var _i = 0, _c = Object.entries(variables); _i < _c.length; _i++) {
        var _d = _c[_i], key = _d[0], value = _d[1];
        rootVars = __assign(__assign({}, rootVars), (_a = {}, _a[key] = resolve_value_1.default(value, variables), _a));
    }
    var newThemeVars = {};
    for (var _e = 0, _f = Object.entries(themeVars); _e < _f.length; _e++) {
        var _g = _f[_e], key = _g[0], value = _g[1];
        newThemeVars = __assign(__assign({}, newThemeVars), (_b = {}, _b[key] = resolve_value_1.default(value, rootVars), _b));
    }
    return newThemeVars;
}
exports.cssVarsToLessAntd = cssVarsToLessAntd;
module.exports = cssVarsToLessAntd;
exports.default = cssVarsToLessAntd;
//# sourceMappingURL=index.js.map
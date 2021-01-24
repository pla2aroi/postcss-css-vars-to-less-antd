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
var resolve_value_1 = __importDefault(require("./lib/resolve-value"));
var eachResolveVariables = function (rootVars, themeVars) {
    var _a;
    var newThemeVars = {};
    for (var _i = 0, _b = Object.entries(themeVars); _i < _b.length; _i++) {
        var _c = _b[_i], key = _c[0], value = _c[1];
        newThemeVars = __assign(__assign({}, newThemeVars), (_a = {}, _a[key] = resolve_value_1.default(value, rootVars), _a));
    }
    return newThemeVars;
};
function cssVarsToLessAntd(root, themeVars) {
    if (!root || typeof root !== 'object' || !root.nodes || root.nodes.length === 0) {
        return themeVars;
    }
    var variables = {};
    root.walkDecls(function (decl) {
        var _a;
        if (/(--(.+))/.test(decl.prop)) {
            variables = __assign(__assign({}, variables), (_a = {}, _a[decl.prop] = decl.value, _a));
        }
    });
    var rootVars = eachResolveVariables(variables, variables);
    return eachResolveVariables(rootVars, themeVars);
}
module.exports = cssVarsToLessAntd;
exports.default = cssVarsToLessAntd;
//# sourceMappingURL=index.js.map
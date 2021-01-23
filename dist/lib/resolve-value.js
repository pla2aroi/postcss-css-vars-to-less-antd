"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var balanced_var_1 = __importDefault(require("./balanced-var"));
var resolveValue = function (value, variables) {
    var matchingVar = balanced_var_1.default("" + value);
    if (!Object.entries(matchingVar || {}).length) {
        return value;
    }
    var bodySplit = matchingVar.body.split(',');
    var variableName = bodySplit[0].trim();
    var fallback = bodySplit.length > 1 ? bodySplit.slice(1).join(',').trim() : '';
    var matchingVarDeclMapItem;
    if (!!variables[variableName]) {
        matchingVarDeclMapItem = variables[variableName];
    }
    var replaceValue = matchingVarDeclMapItem || resolveValue(fallback, variables);
    return "" + (matchingVar.pre || '') + (replaceValue || '') + (matchingVar.post || '');
};
module.exports = resolveValue;
exports.default = resolveValue;
//# sourceMappingURL=resolve-value.js.map
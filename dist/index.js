"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveValue = exports.balancedVar = void 0;
const balanced_match_1 = __importDefault(require("balanced-match"));
const balancedVar = (value) => {
    const match = balanced_match_1.default('(', ')', value.trim());
    if (!match) {
        return {};
    }
    if (/(?:^|[^\w-])var$/.test(match.pre)) {
        return {
            pre: match.pre.slice(0, -3).trim(),
            body: match.body.trim(),
            post: match.post.trim(),
        };
    }
    const bodyMatch = exports.balancedVar(match.body);
    if (Object.entries(bodyMatch || {}).length) {
        return {
            pre: `${match.pre}(${bodyMatch.pre}`.trim(),
            body: bodyMatch.body.trim(),
            post: `${bodyMatch.post})${match.post}`.trim(),
        };
    }
    const postMatch = exports.balancedVar(match.post);
    if (Object.entries(postMatch || {}).length) {
        return {
            pre: `${match.pre}(${match.body})${postMatch.pre}`.trim(),
            body: postMatch.body.trim(),
            post: postMatch.post.trim(),
        };
    }
    return {};
};
exports.balancedVar = balancedVar;
const resolveValue = (value, variables) => {
    const matchingVar = exports.balancedVar(`${value}`);
    if (!Object.entries(matchingVar || {}).length) {
        return value;
    }
    const bodySplit = matchingVar.body.split(',');
    const variableName = bodySplit[0].trim();
    const fallback = bodySplit.length > 1 ? bodySplit.slice(1).join(',').trim() : undefined;
    let matchingVarDeclMapItem;
    if (!!variables[variableName]) {
        matchingVarDeclMapItem = variables[variableName];
    }
    const replaceValue = matchingVarDeclMapItem || exports.resolveValue(fallback, variables);
    return `${matchingVar.pre || ''}${replaceValue || ''}${matchingVar.post || ''}`;
};
exports.resolveValue = resolveValue;
function cssVarsToLessAntd(root, themeVars) {
    let variables = {};
    root.walkDecls((decl) => {
        if (/(--(.+))/.test(decl.prop)) {
            variables = Object.assign(Object.assign({}, variables), { [decl.prop]: decl.value });
        }
    });
    if (!Object.entries(variables).length) {
        return {};
    }
    let rootVars = {};
    for (const [key, value] of Object.entries(variables)) {
        rootVars = Object.assign(Object.assign({}, rootVars), { [key]: exports.resolveValue(value, variables) });
    }
    let newThemeVars = {};
    for (const [key, value] of Object.entries(themeVars)) {
        newThemeVars = Object.assign(Object.assign({}, newThemeVars), { [key]: exports.resolveValue(value, rootVars) });
    }
    return newThemeVars;
}
exports.default = cssVarsToLessAntd;
//# sourceMappingURL=index.js.map
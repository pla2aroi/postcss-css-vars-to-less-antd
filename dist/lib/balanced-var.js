"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var balanced_match_1 = __importDefault(require("balanced-match"));
var balancedVar = function (value) {
    var match = balanced_match_1.default('(', ')', value.trim());
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
    var bodyMatch = balancedVar(match.body);
    if (Object.entries(bodyMatch || {}).length) {
        return {
            pre: (match.pre + "(" + bodyMatch.pre).trim(),
            body: bodyMatch.body.trim(),
            post: (bodyMatch.post + ")" + match.post).trim(),
        };
    }
    var postMatch = balancedVar(match.post);
    if (Object.entries(postMatch || {}).length) {
        return {
            pre: (match.pre + "(" + match.body + ")" + postMatch.pre).trim(),
            body: postMatch.body.trim(),
            post: postMatch.post.trim(),
        };
    }
    return {};
};
module.exports = balancedVar;
exports.default = balancedVar;
//# sourceMappingURL=balanced-var.js.map
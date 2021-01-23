"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var balanced_var_1 = __importDefault(require("../../lib/balanced-var"));
describe('function balancedVar', function () {
    test('matching balanced', function () {
        expect(balanced_var_1.default('var(--color-text-black)')).toMatchObject({
            pre: '',
            body: '--color-text-black',
            post: '',
        });
        expect(balanced_var_1.default('(var(--color-text-black), #0012ff)')).toMatchObject({
            pre: '(',
            body: '--color-text-black',
            post: ', #0012ff)',
        });
        expect(balanced_var_1.default('(, (--color-text-black, #000));var(--color-text-black)')).toMatchObject({
            pre: '(, (--color-text-black, #000));',
            body: '--color-text-black',
            post: '',
        });
        expect(balanced_var_1.default('--color-text-black-n, var(--color-text-red-n, #0012ff);')).toMatchObject({
            pre: '--color-text-black-n,',
            body: '--color-text-red-n, #0012ff',
            post: ';',
        });
    });
    test('not matching balanced', function () {
        expect(balanced_var_1.default('#ff0018')).toMatchObject({});
    });
});
//# sourceMappingURL=balanced-var.test.js.map
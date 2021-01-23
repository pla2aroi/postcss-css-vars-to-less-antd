"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var resolve_value_1 = __importDefault(require("../../lib/resolve-value"));
describe('function resolveValue', function () {
    var mockVarible = {
        '--color-text-black': '#000000',
        '--color-text-red': '#ff0018',
        '--color-text-white': '#ffffff',
        '--color-text-unknown': 'var(--color-text-black-n, var(--color-text-red-n, #0012ff))',
    };
    test('matching balancedVar', function () {
        expect(resolve_value_1.default('var(--color-text-black)', mockVarible)).toBe('#000000');
        expect(resolve_value_1.default('var(--color-text-unknown)', mockVarible)).toBe('var(--color-text-black-n, var(--color-text-red-n, #0012ff))');
        expect(resolve_value_1.default('var(--color-text-unknown-todo, #000000)', mockVarible)).toBe('#000000');
        expect(resolve_value_1.default('var(--color-text-unknown-todo, var(--color-text-red))', mockVarible)).toBe('#ff0018');
        expect(resolve_value_1.default('var(--color-text-unknown-todo, var(--color-text-red-todo, #ffffff))', mockVarible)).toBe('#ffffff');
        expect(resolve_value_1.default('var(--color-text-unknown-todo, var(--color-text-white-todo, @white))', mockVarible)).toBe('@white');
    });
    test('not matching balancedVar', function () {
        expect(resolve_value_1.default('#ff0018', mockVarible)).toBe('#ff0018');
    });
});
//# sourceMappingURL=resolve-value.test.js.map
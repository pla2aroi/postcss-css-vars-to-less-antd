"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../index"));
var postcss_1 = require("postcss");
describe('function cssVarsToLessAntd', function () {
    var process = postcss_1.parse("\n  :root {\n    --primary: #00ff73;\n    --black: #000000;\n    --red: #ff0018;\n    --white: #ffffff;\n  }\n  :root {\n    --bg-black: #000000;\n    --bg-red: #ff0018;\n    --bg-white: #ffffff;\n    --color-text-black: var(--black, @black);\n    --color-text-red: var(--red, @red);\n    --color-text-white: var(--white, @white);\n  }\n  html.dark {\n    --prism-foreground: #d4d4d4;\n    --prism-background: #1e1e1e;\n  }\n  a.link {\n    color: var(--color-text-black);\n  }\n  ");
    var mockThemeVariables = {
        '@primary-color': 'var(--primary, @primary)',
        '@info-color': '@primary-color',
        '@success-color': 'var(--primary-n-1, var(--primary-n-2, var(--primary-n-3, #00ff73)))',
        '@error-color': 'var(--bg-red-n-1, var(--bg-red-n-2, var(--bg-red-n-3, @red-color)))',
        '@white': 'var(--white)',
        '@black': 'var(--black)',
    };
    test('variables not empty matching convert css vars to less object', function () {
        expect(index_1.default(process, mockThemeVariables)).toMatchObject({
            '@primary-color': '#00ff73',
            '@info-color': '@primary-color',
            '@success-color': '#00ff73',
            '@error-color': '@red-color',
            '@white': '#ffffff',
            '@black': '#000000',
        });
    });
    test('variables empty convert css vars to less object', function () {
        expect(index_1.default(postcss_1.parse(''), mockThemeVariables)).toMatchObject({
            '@primary-color': 'var(--primary, @primary)',
            '@info-color': '@primary-color',
            '@success-color': 'var(--primary-n-1, var(--primary-n-2, var(--primary-n-3, #00ff73)))',
            '@error-color': 'var(--bg-red-n-1, var(--bg-red-n-2, var(--bg-red-n-3, @red-color)))',
            '@white': 'var(--white)',
            '@black': 'var(--black)',
        });
        expect(index_1.default(process, {})).toMatchObject({});
    });
});
//# sourceMappingURL=index.test.js.map
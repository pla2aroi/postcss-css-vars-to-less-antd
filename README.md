# postcss-css-vars-to-less-antd

<img align="right" width="135" height="95"
	title="Philosopher’s stone, logo of PostCSS"
	src="http://postcss.github.io/postcss/logo-leftp.png">

[![NPM version](http://img.shields.io/npm/v/postcss-css-vars-to-less-antd.svg?style=flat)](https://www.npmjs.org/package/postcss-css-vars-to-less-antd)
[![npm license](http://img.shields.io/npm/l/postcss-css-vars-to-less-antd.svg?style=flat-square)](https://www.npmjs.org/package/postcss-css-vars-to-less-antd)
[![codecov](https://codecov.io/gh/Pla2aroi/postcss-css-vars-to-less-antd/branch/main/graph/badge.svg?token=8AX6UQVWI8)](https://codecov.io/gh/Pla2aroi/postcss-css-vars-to-less-antd)

[![npm](https://nodei.co/npm/postcss-css-vars-to-less-antd.svg?downloads=true)](https://nodei.co/npm/postcss-css-vars-to-less-antd/)


## Introduction

For conversion css variables to less

## Installation

```
npm install postcss-css-vars-to-less-antd
or
yarn postcss-css-vars-to-less-antd
```

### example

##### 💅 file globals.css

```
:root {
  --primary: #00ff73;
  --black: #000000;
  --red: #ff0018;
  --white: #ffffff;
}
:root {
  --bg-black: #000000;
  --bg-red: #ff0018;
  --bg-white: #ffffff;
  --color-text-black: var(--black, @black);
  --color-text-red: var(--red, @red);
  --color-text-white: var(--white, @white);
  --color-text-todo1: var(--color-text-white-n,var(--color-text-red-n, #ff0018));
  --color-text-todo2: var(--color-text-white-n, var(--color-text-red-n, @red));
  --color-text-todo3: var(--color-text-white-n, var(--color-text-red));
}
html.dark {
  --prism-foreground: #d4d4d4;
  --prism-background: #1e1e1e;
}
a.link {
  color: var(--color-text-black);
}
```

##### 💅 file antd-custom.less

```
@primary-color: var(--primary, @primary-color);
@info-color: var(--primary);
@info-text: @info-color;
@error-color: var(--color-text-red-n1, var(--color-text-red-n2, var(--red)));
@white: var(--white);
@black: var(--black);
@red: #ff0018;
```

##### 🛠 custom

```
const fs = require("fs")
const lessToJS = require('less-vars-to-js')
const cssVarsToLessAntd = require('postcss-css-vars-to-less-antd')
const { parse } = require("postcss")

or

import fs from 'fs'
import lessToJS from 'less-vars-to-js'
import cssVarsToLessAntd from 'postcss-css-vars-to-less-antd'
import { parse } from 'postcss'

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './antd-custom.less'), 'utf8'),
)

```

🚀 output themeVariables

```
{
  '@primary-color': 'var(--primary, @primary-color)',
  '@info-color': 'var(--primary)',
  '@info-text': '@info-color',
  '@error-color': 'var(--color-text-red-n1, var(--color-text-red-n2, var(--red)))',
  '@white': 'var(--white)',
  '@black': 'var(--black)',
  '@red': '#ff0018'
}

```

```
const process = parse(fs.readFileSync("./globals.css", "utf8"));
const newThemeVariables = cssVarsToLessAntd(process, themeVariables)
```

🚀 output newThemeVariables

```
{
  '@primary-color': '#00ff73',
  '@info-color': '#00ff73',
  '@info-text': '@info-color',
  '@error-color': '#ff0018',
  '@white': '#ffffff',
  '@black': '#000000',
  '@red': '#ff0018'
}
```

🥰 with nextjs next.config.js
ref [[https://github.com/vercel/next.js/blob/canary/examples/with-ant-design-less/next.config.js](https://github.com/vercel/next.js/blob/canary/examples/with-ant-design-less/next.config.js "https://github.com/vercel/next.js/blob/canary/examples/with-ant-design-less/next.config.js")]

```
{
  ...
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: newThemeVariables,
  },
  ...
}
```

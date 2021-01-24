import cssVarsToLessAntd from '../index'
import { parse } from 'postcss'

describe('function cssVarsToLessAntd', () => {
  const process = parse(`
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
  }
  html.dark {
    --prism-foreground: #d4d4d4;
    --prism-background: #1e1e1e;
  }
  a.link {
    color: var(--color-text-black);
  }
  `)

  const mockThemeVariables = {
    '@primary-color': 'var(--primary, @primary)',
    '@info-color': '@primary-color',
    '@success-color':
      'var(--primary-n-1, var(--primary-n-2, var(--primary-n-3, #00ff73)))',
    '@error-color': 'var(--bg-red-n-1, var(--bg-red-n-2, var(--bg-red-n-3, @red-color)))',
    '@white': 'var(--white)',
    '@black': 'var(--black)',
  }

  test('variables not empty matching convert css vars to less object', () => {
    expect(cssVarsToLessAntd(process, mockThemeVariables)).toMatchObject({
      '@primary-color': '#00ff73',
      '@info-color': '@primary-color',
      '@success-color': '#00ff73',
      '@error-color': '@red-color',
      '@white': '#ffffff',
      '@black': '#000000',
    })
  })

  test('variables empty convert css vars to less object', () => {
    expect(cssVarsToLessAntd(parse(''), mockThemeVariables)).toMatchObject({
      '@primary-color': 'var(--primary, @primary)',
      '@info-color': '@primary-color',
      '@success-color':
        'var(--primary-n-1, var(--primary-n-2, var(--primary-n-3, #00ff73)))',
      '@error-color':
        'var(--bg-red-n-1, var(--bg-red-n-2, var(--bg-red-n-3, @red-color)))',
      '@white': 'var(--white)',
      '@black': 'var(--black)',
    })
    expect(cssVarsToLessAntd(process, {})).toMatchObject({})
  })
})

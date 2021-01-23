import cssVarsToLessAntd, { balancedVar, resolveValue } from '../index'
import { parse } from 'postcss'

describe('function resolveValue', () => {
  const mockVarible = {
    '--color-text-black': '#000000',
    '--color-text-red': '#ff0018',
    '--color-text-white': '#ffffff',
    '--color-text-unknown': 'var(--color-text-black-n, var(--color-text-red-n, #0012ff))',
  }
  test('matching balancedVar', () => {
    expect(resolveValue('var(--color-text-black)', mockVarible)).toBe('#000000')
    expect(resolveValue('var(--color-text-unknown)', mockVarible)).toBe(
      'var(--color-text-black-n, var(--color-text-red-n, #0012ff))',
    )
    expect(resolveValue('var(--color-text-unknown-todo, #000000)', mockVarible)).toBe(
      '#000000',
    )
    expect(
      resolveValue('var(--color-text-unknown-todo, var(--color-text-red))', mockVarible),
    ).toBe('#ff0018')
    expect(
      resolveValue(
        'var(--color-text-unknown-todo, var(--color-text-red-todo, #ffffff))',
        mockVarible,
      ),
    ).toBe('#ffffff')
    expect(
      resolveValue(
        'var(--color-text-unknown-todo, var(--color-text-white-todo, @white))',
        mockVarible,
      ),
    ).toBe('@white')
  })

  test('not matching balancedVar', () => {
    expect(resolveValue('#ff0018', mockVarible)).toBe('#ff0018')
  })
})

describe('function balancedVar', () => {
  test('matching balanced', () => {
    expect(balancedVar('var(--color-text-black)')).toMatchObject({
      pre: '',
      body: '--color-text-black',
      post: '',
    })
    expect(balancedVar('(var(--color-text-black), #0012ff)')).toMatchObject({
      pre: '(',
      body: '--color-text-black',
      post: ', #0012ff)',
    })
    expect(
      balancedVar('(, (--color-text-black, #000));var(--color-text-black)'),
    ).toMatchObject({
      pre: '(, (--color-text-black, #000));',
      body: '--color-text-black',
      post: '',
    })
    expect(
      balancedVar('--color-text-black-n, var(--color-text-red-n, #0012ff);'),
    ).toMatchObject({
      pre: '--color-text-black-n,',
      body: '--color-text-red-n, #0012ff',
      post: ';',
    })
  })

  test('not matching balanced', () => {
    expect(balancedVar('#ff0018')).toMatchObject({})
  })
})

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
    expect(cssVarsToLessAntd(parse(''), mockThemeVariables)).toMatchObject({})
  })
})

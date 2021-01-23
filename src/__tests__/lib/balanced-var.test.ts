import balancedVar from '../../lib/balanced-var'

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

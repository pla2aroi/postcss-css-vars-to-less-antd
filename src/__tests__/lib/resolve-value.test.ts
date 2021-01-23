import resolveValue from '../../lib/resolve-value'

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

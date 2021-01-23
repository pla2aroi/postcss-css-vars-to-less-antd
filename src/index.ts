import { Root } from 'postcss'
import resolveValue from './lib/resolve-value'
import type { IResolveValue } from '@type/common'

export function cssVarsToLessAntd(root: Root, themeVars: IResolveValue): IResolveValue {
  let variables = {} as IResolveValue

  root.walkDecls((decl) => {
    if (/(--(.+))/.test(decl.prop)) {
      variables = {
        ...variables,
        [decl.prop]: decl.value,
      }
    }
  })

  if (!Object.entries(variables).length) {
    return {}
  }

  let rootVars = {}
  for (const [key, value] of Object.entries(variables)) {
    rootVars = {
      ...rootVars,
      [key]: resolveValue(value, variables),
    }
  }

  let newThemeVars = {}
  for (const [key, value] of Object.entries(themeVars)) {
    newThemeVars = {
      ...newThemeVars,
      [key]: resolveValue(value, rootVars),
    }
  }

  return newThemeVars
}

module.exports = cssVarsToLessAntd
export default cssVarsToLessAntd

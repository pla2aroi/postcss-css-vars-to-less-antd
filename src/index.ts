import resolveValue from './lib/resolve-value'
import type { IResolveValue } from '@type/common'
import type { Root } from 'postcss'

const eachResolveVariables = (rootVars: IResolveValue, themeVars: IResolveValue) => {
  let newThemeVars = {} as IResolveValue
  for (const [key, value] of Object.entries(themeVars)) {
    newThemeVars = {
      ...newThemeVars,
      [key]: resolveValue(value, rootVars),
    }
  }
  return newThemeVars
}

function cssVarsToLessAntd(root: Root, themeVars: IResolveValue): IResolveValue {
  if (!root || typeof root !== 'object' || !root.nodes || root.nodes.length === 0) {
    return themeVars
  }

  let variables = {} as IResolveValue
  root.walkDecls((decl) => {
    if (/(--(.+))/.test(decl.prop)) {
      variables = {
        ...variables,
        [decl.prop]: decl.value,
      }
    }
  })

  const rootVars = eachResolveVariables(variables, variables)
  return eachResolveVariables(rootVars, themeVars)
}

module.exports = cssVarsToLessAntd
export default cssVarsToLessAntd

import balanced from 'balanced-match'
import { Root } from 'postcss'
type IBalancedVar = {
  pre: string
  body: string
  post: string
}

type IResolveValue = {
  [key: string]: string
}

export const balancedVar = (value: string): IBalancedVar => {
  const match = balanced('(', ')', value.trim())
  if (!match) {
    return {} as IBalancedVar
  }

  if (/(?:^|[^\w-])var$/.test(match.pre)) {
    return {
      pre: match.pre.slice(0, -3).trim(),
      body: match.body.trim(),
      post: match.post.trim(),
    }
  }

  const bodyMatch = balancedVar(match.body)
  if (Object.entries(bodyMatch || {}).length) {
    return {
      pre: `${match.pre}(${bodyMatch.pre}`.trim(),
      body: bodyMatch.body.trim(),
      post: `${bodyMatch.post})${match.post}`.trim(),
    }
  }

  const postMatch = balancedVar(match.post)
  if (Object.entries(postMatch || {}).length) {
    return {
      pre: `${match.pre}(${match.body})${postMatch.pre}`.trim(),
      body: postMatch.body.trim(),
      post: postMatch.post.trim(),
    }
  }

  return {} as IBalancedVar
}

export const resolveValue = (value: string, variables: IResolveValue): string => {
  const matchingVar = balancedVar(`${value}`)

  if (!Object.entries(matchingVar || {}).length) {
    return value
  }

  const bodySplit = matchingVar.body.split(',')
  const variableName = bodySplit[0].trim()
  const fallback = bodySplit.length > 1 ? bodySplit.slice(1).join(',').trim() : undefined

  let matchingVarDeclMapItem
  if (!!variables[variableName]) {
    matchingVarDeclMapItem = variables[variableName]
  }

  const replaceValue = matchingVarDeclMapItem || resolveValue(fallback, variables)
  return `${matchingVar.pre || ''}${replaceValue || ''}${matchingVar.post || ''}`
}

export default function cssVarsToLessAntd(
  root: Root,
  themeVars: IResolveValue,
): IResolveValue {
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

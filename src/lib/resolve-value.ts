import balancedVar from './balanced-var'
import type { IResolveValue } from '@type/common'

const resolveValue = (value: string, variables: IResolveValue): string => {
  const matchingVar = balancedVar(`${value}`)
  if (!Object.entries(matchingVar || {}).length) {
    return value
  }

  const bodySplit = matchingVar.body.split(',')
  const variableName = bodySplit[0].trim()
  const fallback = bodySplit.length > 1 ? bodySplit.slice(1).join(',').trim() : ''

  let matchingVarDeclMapItem
  if (!!variables[variableName]) {
    matchingVarDeclMapItem = variables[variableName]
  }

  const replaceValue = matchingVarDeclMapItem || resolveValue(fallback, variables)
  return `${matchingVar.pre || ''}${replaceValue || ''}${matchingVar.post || ''}`
}

module.exports = resolveValue
export default resolveValue

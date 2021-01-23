import balanced from 'balanced-match'
import type { IBalancedVar } from '@type/common'

const balancedVar = (value: string): IBalancedVar => {
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

module.exports = balancedVar
export default balancedVar

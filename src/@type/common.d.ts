declare module '@type/common' {
  export type IResolveValue = {
    [key: string]: string
  }

  export type IBalancedVar = {
    pre: string
    body: string
    post: string
  }
}

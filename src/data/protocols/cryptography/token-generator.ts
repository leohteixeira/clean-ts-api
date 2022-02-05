export interface TokenGenerator {
  generate: (id: TokenGenerator.Params) => Promise<TokenGenerator.Result>
}

export namespace TokenGenerator {
  export type Params = string
  export type Result = string
}

export interface Hasher {
  hash: (params: Hasher.Params) => Promise<Hasher.Result>
}

export namespace Hasher {
  export type Params = string

  export type Result = string
}

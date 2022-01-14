export interface Encrypter {
  encrypt: (params: Encrypter.Params) => Promise<Encrypter.Result>
}

export namespace Encrypter {
  export type Params = string

  export type Result = string
}

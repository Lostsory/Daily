declare function globalLib(opt: globalLib.Opt): void

declare namespace globalLib{
  const version: string
  function dosomething(): void
  interface Opt{
    [x: string] :any
  }
}
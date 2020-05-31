declare function moduleLib(opt:Opt): void

interface Opt{
  [x: string] :any
}

declare namespace moduleLib {
  const verison:string
  function dosomething(): void
}

export = moduleLib

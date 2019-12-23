export function serviceRegistryFactory() {
  return new Factory<{}>({})
}

class Factory<T> {
  private readonly ids: T
  public constructor(ids: T) {
    this.ids = ids
  }
  public add<N extends string>(id: N): Factory<T & { [n in N]: symbol }> {
    // tslint:disable-next-line: no-object-literal-type-assertion
    const added = { [id]: Symbol.for(id) } as { [n in N]: symbol }

    return new Factory<T & { [n in N]: symbol }>({ ...this.ids, ...added })
  }

  public build(): T {
    return this.ids
  }
}

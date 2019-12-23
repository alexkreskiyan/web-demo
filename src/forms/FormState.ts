import { action, computed, observable, toJS } from 'mobx'

import { ValidationResult } from './validation/ValidationResult'
import { ValidationStatus } from './validation/ValidationStatus'


export class FormState<T extends Object> {
  @observable
  public data: T
  @observable
  public validation: Record<string, ValidationResult> = {}
  @computed
  public get isValid(): boolean {
    const values = Object.values(this.validation)

    for (const value of values)
      if (value.status === ValidationStatus.Error)
        return false

    return true
  }
  @computed
  public get isComplete(): boolean {
    const data = toJS(this.data)
    const touched = toJS(this.touchedFields)
    const keys = getKeys(data)

    return keys.filter(x => !touched[x]).length === 0
  }
  @observable
  private readonly touchedFields: { [key: string]: boolean } = {}

  public constructor(data: T) {
    this.data = data
  }

  public getField(name: string) {
    return get(this.data, name)
  }

  @action
  public setField(name: string, value: unknown) {
    set(this.data, name, value)
  }

  @action
  public setFieldTouched(name: string) {
    this.touchedFields[name] = true
  }

  public getFieldValidation(name: string): ValidationResult | undefined {
    return this.validation[name]
  }

  @action
  public setFieldValidation(name: string, value: ValidationResult) {
    this.validation[name] = value
  }
}

function getKeys(x: unknown, prefix: string = ''): string[] {
  if (Array.isArray(x))
    return concat(x.map((_, i) => getKeys(x[i], `${prefix}[${i}]`)))


  if (x instanceof Object) {
    const obj = x as { [key: string]: unknown }
    const objectKeys = Object.keys(x).filter(i => x.hasOwnProperty(i))
    const keys = prefix
      ? objectKeys.map(i => getKeys(obj[i], [prefix, i].join('.')))
      : objectKeys.map(i => getKeys(obj[i], i))

    return concat(keys)
  }

  return prefix ? [prefix] : []
}

function get(src: unknown, path: string): unknown {
  let current = src

  for (const part of splitPath(path)) {
    if (typeof part === 'number')
      current = (current as unknown[])[part]
    if (typeof part === 'string')
      current = (current as Record<string, unknown>)[part]
  }

  return current
}

function set(src: unknown, path: string, value: unknown): void {
  let current = src

  const parts = splitPath(path)
  for (const part of parts.slice(0, -1)) {
    if (typeof part === 'number')
      current = (current as unknown[])[part]
    if (typeof part === 'string')
      current = (current as Record<string, unknown>)[part]
  }

  const lastPart = parts[parts.length - 1]
  if (typeof lastPart === 'number')
    (current as unknown[])[lastPart] = value
  if (typeof lastPart === 'string')
    (current as Record<string, unknown>)[lastPart] = value
}

function splitPath(path: string): (string | number)[] {
  let p = path
  const parts: (string | number)[] = []

  while (true) {
    const index = Math.min(getPathPartIndex(p, '.'), getPathPartIndex(p, '['), getPathPartIndex(p, ']'))

    // use path as is, if not composite
    if (index === Infinity) {
      if (p)
        parts.push(p)
      break
    }

    const part = p.substr(0, index)
    if (parseInt(part, 10).toString() === part)
      parts.push(parseInt(part, 10))
    else if (part)
      parts.push(part)
    p = p.substr(index + 1)
  }

  return parts
}

function getPathPartIndex(p: string, c: string) {
  const index = p.indexOf(c)

  return index < 0 ? Infinity : index
}

function concat(items: unknown[]) {
  return Array.prototype.concat.apply([], items)
}

import { createBrowserHistory, Location } from 'history'
import { injectable } from 'inversify'
import { action, computed } from 'mobx'
import { RouterStore as RouterStoreBase, syncHistoryWithStore } from 'mobx-react-router'
import { generatePath, matchPath } from 'react-router'

export const history = createBrowserHistory()

@injectable()
export class RouterStore implements IRouterStore {
  @computed
  public get startup(): Location {
    return this._startup
  }

  @computed
  public get location(): Location {
    return this._base.location
  }

  private readonly _startup: Location
  private readonly _base: RouterStoreBase

  public constructor() {
    this._base = new RouterStoreBase()
    syncHistoryWithStore(history, this._base)

    this._startup = this._base.location
  }

  @action
  public go<T extends {}>(route: string, params?: T): void {
    this._base.push(generatePath(route, params))
  }

  public get<T>(route: string): T | null {
    const match = matchPath<T>(this.location.pathname, route)

    return match ? match.params : null
  }

  public path<T extends { [key: string]: string | number | boolean }>(route: string, params?: T): string {
    return generatePath(route, params)
  }
}

export interface IRouterStore {
  startup: Location
  location: Location
  go(route: string): void
  go<T>(route: string, params: T): void
  get<T>(route: string): T | null
  path(route: string): string
  path<T>(route: string, params: T): string
}

import { Container } from 'inversify'
// tslint:disable-next-line: no-import-side-effect
import 'reflect-metadata'

import { IRouterStore, RouterStore } from '../../stores/RouterStore'

import { serviceRegistry } from './serviceRegistry'


export const container = new Container()

container.bind<IRouterStore>(serviceRegistry.RouterStore).to(RouterStore).inSingletonScope()

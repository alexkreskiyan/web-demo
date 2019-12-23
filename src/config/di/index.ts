import { container } from './container'
import { getContainerContext } from './getContainerContext'
import { serviceRegistry } from './serviceRegistry'


export const { ContainerProvider, services, useInjection } = getContainerContext(container, serviceRegistry, true)

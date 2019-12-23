import { serviceRegistryFactory } from './serviceRegistryFactory'

export const serviceRegistry = serviceRegistryFactory()
  .add('RouterStore')
  .build()

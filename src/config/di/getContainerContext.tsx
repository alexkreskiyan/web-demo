import { Container, interfaces } from 'inversify'
import React, { ReactNode, useContext } from 'react'


type Provider = (props: { children?: ReactNode }) => JSX.Element

export function getContainerContext<T extends { [key: string]: symbol }>(
  container: Container,
  services: T,
  debug: boolean,
) {
  const context = React.createContext(container)

  const ContainerProvider: Provider = props => (
    <context.Provider value={container}>
      {props.children}
    </context.Provider>
  )

  function useInjection<I>(identifier: interfaces.ServiceIdentifier<I>) {
    return useContext(context).get<I>(identifier)
  }

  if (debug) {
    const dev = Object.keys(services)
      .reduce<{ [key in keyof T]: object }>((result, key) => {
        Object.defineProperty(result, key, { get: () => container.get<unknown>(services[key]) })

        return result
      }, {} as unknown as { [key in keyof T]: object })
    Object.defineProperty(window, 's', { get: () => dev })
  }

  return { ContainerProvider, services, useInjection }
}

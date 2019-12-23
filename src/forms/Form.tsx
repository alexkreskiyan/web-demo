import React, { createContext, ReactNode } from 'react'

import { FormState } from './FormState'


export const context = createContext<FormState<Object>>({} as unknown as FormState<Object>)


type Props<T> = {
  state: FormState<T>
  className?: string
  children?: ReactNode
}

export function Form<T>({ state, className, children }: Props<T>) {
  return (
    <form className={className}>
      <context.Provider value={state as unknown as FormState<Object>}>
        {children}
      </context.Provider>
    </form>
  )
}

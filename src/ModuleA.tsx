import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'

import { services, useInjection } from './config/di'
import { IRouterStore } from './stores/RouterStore'


export const ModuleA = observer(() => {
  const router = useInjection<IRouterStore>(services.RouterStore)

  const pageId = Math.floor(Math.random() * 1000)

  return (
    <div>
      <div>
        <Link to={router.path('/page/:id', { id: pageId })}>Page {pageId}</Link>
      </div >
      {router.startup.pathname}
      {router.startup.search}
      {router.startup.hash}
    </div >
  )
})

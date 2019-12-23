import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'

import { services, useInjection } from './config/di'
import { IRouterStore } from './stores/RouterStore'


export const Dynamic = observer(() => {
  const router = useInjection<IRouterStore>(services.RouterStore)

  return (
    <div>
      <div>
        <Link to="/module-a">Module A</Link>
      </div>
      {router.location.pathname}
      {router.location.search}
      {router.location.hash}
      {JSON.stringify(router.get<{ id: number }>('/page/:id'))}
    </div>
  )
})

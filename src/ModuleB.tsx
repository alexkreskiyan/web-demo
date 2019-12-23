import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'

import { services, useInjection } from './config/di'
import { IRouterStore } from './stores/RouterStore'


export const ModuleB = observer(() => {
  const router = useInjection<IRouterStore>(services.RouterStore)

  return (
    <div>
      <div>
        <Link to="/module-b">Module B</Link>
      </div>
      {router.location.pathname}
      {router.location.search}
      {router.location.hash}
    </div>
  )
})

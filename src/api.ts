import { httpClientFactory } from '@annium/client-http'

export const api = httpClientFactory({
  url: 'https://randomuser.me/api',
  init: {
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
    },
  },
})

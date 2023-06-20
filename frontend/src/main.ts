import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import '~/styles/main.scss'
import 'virtual:uno.css'

import App from './App.vue'
import { pinia } from '~/modules/pinia'
import { router } from '~/modules/router'
import { client } from '~/modules/graphql'

createApp(App)
  .use(client)
  .use(pinia)
  .use(router)
  .mount('#app')

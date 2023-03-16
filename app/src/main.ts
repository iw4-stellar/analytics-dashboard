import { createApp } from 'vue'
import { router } from '@/plugins/router'
import { axios } from '@/plugins/axios'

import './style.css'
import 'primeicons/primeicons.css'

import App from './App.vue'

const app = createApp(App)

app.use(router)

app.config.globalProperties.$api = axios

app.mount('#app')

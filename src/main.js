import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import './assets/style.css'
import router from './router'

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:8000'

app.use(createPinia())
app.use(router, axios)

app.mount('#app')

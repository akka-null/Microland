import { createApp } from 'vue'
// import './style.css'
import './assets/index.css'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
const pinia = createPinia();

const app = createApp(App)
app.use(pinia)
app.use(router)

app.mount('#app')

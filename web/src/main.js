import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import maska from 'maska'

createApp(App).use(router).use(maska).mount('#app')

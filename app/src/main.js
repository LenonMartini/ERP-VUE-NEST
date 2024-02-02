import { createApp } from 'vue'
import { router } from './routers'
import  pinia  from './stores/index'
import { useMeStore } from './stores/me'

import App from './App.vue'



import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './style.css';

const app = createApp(App)
app.use(pinia);
const meStore = useMeStore();

meStore.getMe()
.catch(() => {})
.finally(() => {
    app.use(router)
    app.mount('#app')
})


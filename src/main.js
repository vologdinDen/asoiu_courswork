import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import { AuthModule } from './storage/AuthModule'
import router from './router'
import components from './components'

import './assets/main.css'

const store = createStore({
    modules:{
        auth: AuthModule
    }
})

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app.use(store)
app.use(router)

app.mount('#app')

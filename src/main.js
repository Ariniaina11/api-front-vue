import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faPlusCircle, faBan, faPencil, faEye } from '@fortawesome/free-solid-svg-icons'
import router from './routes/routes'
import store from './store'

// Fontawesome
library.add([faUserSecret, faPlusCircle, faBan, faPencil, faEye])

createApp(App)
    .use(router)
    .use(store)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import router from './routes/routes'

// Fontawesome
library.add(faUserSecret)

createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

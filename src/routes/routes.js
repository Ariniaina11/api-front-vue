import { createMemoryHistory, createRouter } from 'vue-router'
import SignInComponent from '@/components/layouts/SignInComponent.vue'
import SignUpComponent from '@/components/layouts/SignUpComponent.vue'
import WelcomeComponent from '@/components/layouts/WelcomeComponent.vue'

// Routes
const routes = [
    {path: '/', component: WelcomeComponent },
    {path: '/sign-in', component: SignInComponent },
    {path: '/sign-up', component: SignUpComponent }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router
import { createMemoryHistory, createRouter } from 'vue-router'
import SignInComponent from '@/components/layouts/SignInComponent.vue'
import SignUpComponent from '@/components/layouts/SignUpComponent.vue'

// Routes
const routes = [
    {path: '/sign-in', component: SignInComponent },
    {path: '/sign-up', component: SignUpComponent }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router
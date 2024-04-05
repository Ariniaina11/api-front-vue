<template>
    <div class="bg-teal-800 text-white m-auto mx-3 mt-2 p-3 ">
        <div class="my-auto inline">
            <font-awesome-icon icon="user-secret" class="text-3xl mr-2 text-gray-200"></font-awesome-icon>
            <RouterLink :to="this.$store.state.homeUrl" class="text-2xl inline">{{ this.$store.state.title }}</RouterLink>
        </div>
        <div class="float-right my-auto">
            <RouterLink v-if="!this.$store.state.connected" to="/sign-in" class="font-serif text-gray-300 mr-5 px-4 py-2 border-solid border border-gray-300 rounded text-lg hover:text-gray-700 hover:bg-gray-300 hover:ease-in hover:duration-200 hover:cursor-pointer">Sign In</RouterLink>
            <RouterLink v-if="!this.$store.state.connected" to="/sign-up" class="font-serif text-gray-700 mr-4 px-4 py-2 border-solid border border-gray-300 rounded text-lg bg-gray-300 cursor-pointer">Sign Up</RouterLink>
            <button v-if="this.$store.state.connected" @click.prevent="logoutModal = true" class="font-serif text-gray-700 my-auto px-4 py-1 border-solid border border-gray-300 rounded text-lg bg-gray-300 cursor-pointer" type="button">Logout</button>
        </div>
    </div>

    <!-- Logout modal -->
    <Teleport to="#modal">
        <div v-if="logoutModal" class="bg-gray-800 bg-opacity-50 flex justify-center items-center fixed top-0 left-0 w-screen h-screen">
            <LogoutComponent 
                @logout-close="logoutModal = false" 
                @logout-success="logoutModal = false"
                />
        </div>
    </Teleport>
</template>

<script>
    import LogoutComponent from './modals/LogoutComponent.vue'
    
    export default {
        name: 'HeaderComponent',
        components: {
            LogoutComponent
        },
        data(){
            return{
                logoutModal: false
            }
        }
    }
</script>
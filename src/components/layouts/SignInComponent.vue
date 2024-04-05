<template>
    <form @submit.prevent="checkLogin" class="bg-white shadow-md rounded  w-4/12 mx-auto px-8 pt-6 pb-8 mb-10">
        <h1 class="block text-gray-700 text-2xl text-center font-bold mb-5">Sign In</h1>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
            </label>
            <input v-model="user.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email">
        </div>
        <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
            </label>
            <input v-model="user.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
        </div>

        <!-- Errors -->
        <ul class="list-disc text-red-600 mb-6 ml-5 text-xs">
            <li v-for="(error, index) in errors" :key="index">{{error}}</li>
        </ul>

        <div class="flex items-center justify-between">
            <button class="bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Sign In
            </button>

            <!-- Loading -->
            <div v-if="loading" class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-teal-500" role="status">
                <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>
    </form>
</template>

<script>
    import axios from 'axios';
    import router from '@/routes/routes';

    export default {
        name : 'SignInComponent',
        data(){
            return {
                user: {},
                email: '',
                password: '',
                errors : [],
                loading: false
            }
        },
        methods: {
            async checkLogin(){
                this.errors = []

                // Validations
                this.checkEmptyField(this.user.email, 'Email')
                this.checkEmptyField(this.user.password, 'Password')

                // Everything works
                if(!this.errors.length){
                    this.loading = true // Start the loading

                    const apiUrl = 'http://localhost:8000/api/login-check';
                    let formData = new FormData();

                    formData.append('email', this.user.email)
                    formData.append('password', this.user.password)

                    // Sending request
                    await axios.post(apiUrl, formData).then((response) => {
                        console.log(response)
                        if(response.status == 200){
                            // Credentials accepted
                            if(response.data.code == 200){
                                const user = response.data.user

                                // Edit the user, title, home URL and login status
                                this.$store.commit('userAutheticated', user)
                                this.$store.commit('setTitle', user.name);
                                this.$store.commit('setConnected', true);
                                this.$store.commit('setHomeUrl', '/customers');

                                router.push({path: '/customers'})
                            }
                            else{
                                this.errors.push(response.data.message)
                            }
                            this.loading = false; // Stop the loading
                        }
                    }).catch((error) =>{
                        this.loading = false; // Stop the loading
                        this.errors.push(error.message)
                    })
                }
            },
            checkEmptyField(field, message){
                if(!field) {
                    this.errors.push(`${message} is required`)
                }
            }
        }
    }
</script>
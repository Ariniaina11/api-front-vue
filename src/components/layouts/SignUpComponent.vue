<template>
    <form @submit.prevent="storeUser" class="bg-white shadow-md rounded w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 mx-auto px-8 pt-6 pb-8 mb-10" novalidate>
        <h1 class="block text-gray-700 text-2xl text-center font-bold mb-5">Sign Up</h1>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Username
            </label>
            <input v-model="user.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" placeholder="Username">
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Email
            </label>
            <input v-model="user.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Email">
        </div>
        <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
            </label>
            <input v-model="user.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="******************">
        </div>
        <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Retape password
            </label>
            <input v-model="user.passwordConf" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
        </div>
        <ul class="list-disc text-red-600 mb-6 ml-5 text-xs">
            <li v-for="(error, index) in errors" :key="index">{{error}}</li>
        </ul>
        <div class="flex items-center justify-between">
            <button class="bg-teal-700 hover:bg-teal-600 text-white font-bold w-4/12 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Sign Up
            </button>

            <!-- Loading -->
            <div v-if="loading" class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-teal-500" role="status">
                <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>
    </form>
</template>

<script>
    import axios from 'axios'
    import router from '@/routes/routes'

    export default {
        name : 'SignUpComponent',
        data(){
            return {
                user: {},
                name: '',
                email: '',
                password: '',
                passwordConf: '',
                errors: [],
                loading: false
            }
        },
        methods: {
            async storeUser(){
                this.errors = []

                // Validations
                this.checkEmptyField(this.user.name, 'Name')
                this.checkEmptyField(this.user.email, 'Email')
                this.checkEmptyField(this.user.password, 'Password')
                this.checkEmptyField(this.user.passwordConf, 'Password confirmation')

                // Everything works
                if(!this.errors.length){
                    this.loading = true // Start the loading

                    const apiUrl = 'http://localhost:8000/api/add_user';
                    let formData = new FormData();

                    formData.append('name', this.user.name)
                    formData.append('email', this.user.email)
                    formData.append('password', this.user.password)

                    // Sending request
                    await axios.post(apiUrl, formData).then((response) => {
                        console.log(response)
                        if(response.status == 200){
                            this.loading = false; // Stop the loading

                            router.push({path: '/sign-in'}) // Redirect to Sign-In

                            console.log(response.data.message)
                            this.resetInputs();
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
            },
            resetInputs(){
                this.user.name = '';
                this.user.email = '';
                this.user.password = '';
                this.user.passwordConf = '';
            }
        }
    }
</script>
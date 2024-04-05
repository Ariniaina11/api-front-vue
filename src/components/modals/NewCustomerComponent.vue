<template>
    <div class="relative w-1/3 bg-white p-5 border rounded shadow-lg shadow-slate-700">
        <!-- Close button -->
        <button @click="closeHandler" class="absolute top-1 right-2 border-none cursor-pointer bg-none">X</button>
        
        <h1 class="block text-gray-700 text-2xl text-center font-bold mb-5">{{title}}</h1>
        <form @submit.prevent="submitHandler" class="w-full" novalidate>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="first_name">
                    First name
                </label>
                <input v-model="customer.first_name" v-bind:disabled="viewCustomer" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="first_name" name="first_name" type="text" placeholder="First name">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="last_name">
                    Last name
                </label>
                <input v-model="customer.last_name" v-bind:disabled="viewCustomer" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="last_name" name="last_name" type="text" placeholder="Last name">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    Email
                </label>
                <input v-model="customer.email" v-bind:disabled="viewCustomer" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Email">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="contact">
                    Contact
                </label>
                <input v-model="customer.contact" v-bind:disabled="viewCustomer" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" placeholder="Contact">
            </div>

            <!-- Errors -->
            <ul class="list-disc text-red-600 mb-6 ml-5 text-xs">
                <li v-for="(error, index) in errors" :key="index">{{error}}</li>
            </ul>

            <div v-if="!viewCustomer" class="flex items-center justify-between">
                <button class="bg-teal-700 hover:bg-teal-600 text-white font-bold w-4/12 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    {{btnText}}
                </button>

                <!-- Loading -->
                <div v-if="loading" class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-teal-500" role="status">
                    <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'NewCustomerComponent',
        props:{
            title: String,
            btnText: String,
            customerToEdit: Array,
            viewCustomer: Boolean
        },
        data(){
            return {
                customer: {...this.customerToEdit} ?? {}, // Edit or New
                first_name : '',
                last_name : '',
                email : '',
                contact : '',
                loading: false,
                errors: []
            }
        },
        methods: {
            // New customer or update customer
            submitHandler(){
                if(this.customerToEdit){
                    this.updateCustomer()
                }
                else{
                    this.storeCustomer()
                }
            },
            // Store a new customer
            async storeCustomer(){
                this.loading = true // Start the loading
                this.errors = []

                const apiUrl = 'http://localhost:8000/api/add_customer';
                let formData = new FormData();

                formData.append('first_name', this.customer.first_name)
                formData.append('last_name', this.customer.last_name)
                formData.append('email', this.customer.email)
                formData.append('contact', this.customer.contact)

                // Sending request
                await axios.post(apiUrl, formData).then((response) => {
                    this.loading = false; // Stop the loading

                    if(response.data.code === 200){
                        this.$emit('new-customer-stored', true)

                        console.log(response.data.message)
                    }else{
                        this.errors.push(response.data.message)
                    }
                }).catch((error) =>{
                    this.loading = false; // Stop the loading
                    this.errors.push(error.message)
                })
            },

            // Update a customer
            async updateCustomer(){
                this.loading = true // Start the loading
                this.errors = []

                const apiUrl = `http://localhost:8000/api/customer/update/${this.customerToEdit.id}`;
                let formData = new FormData();

                formData.append('first_name', this.customer.first_name)
                formData.append('last_name', this.customer.last_name)
                formData.append('email', this.customer.email)
                formData.append('contact', this.customer.contact)

                // Sending request
                await axios.post(apiUrl, formData).then((response) => {
                    this.loading = false; // Stop the loading

                    if(response.data.code === 200){
                        this.$emit('customer-updated', true)

                        console.log(response.data.message)
                    }else{
                        this.errors.push(response.data.message)
                    }
                }).catch((error) =>{
                    this.loading = false; // Stop the loading
                    this.errors.push(error.message)
                })
            },

            // Close the modal
            closeHandler(){
                this.$emit('new-customer-close', true)
            }
        }
    }
</script>
<template>
    <div class="m-auto my-5">
        <h1 class="text-center font-bold font-sans text-gray-700 text-3xl">List of your customers</h1>
        <hr class="w-20 h-1 m-auto bg-gray-700">
    </div>
    <div class="px-10">
        <button @click="newCustomerModal = true" class="block mb-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            <font-awesome-icon icon="plus-circle" class="mr-2 text-gray-200"></font-awesome-icon>
            Add new customer
        </button>

        <!-- Loading -->
        <div v-if="getCustomerloading" class="mt-2 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-teal-500" role="status">
            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
        <table class="min-w-full bg-white">
            <thead class="bg-gray-600 text-white">
                <tr>
                    <th class="w-5 text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                    <th class="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">First name</th>
                    <th class="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">Last name</th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                    <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Contact</th>
                    <th class="text-center py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                </tr>
            </thead>
            <tbody v-for="customer in customers" :key="customer.id" class="text-gray-700">
                <tr>
                    <td class="w-auto text-left py-3 px-4">{{customer.id}}</td>
                    <td class="w-1/3 text-left py-3 px-4">{{customer.first_name}}</td>
                    <td class="w-1/3 text-left py-3 px-4">{{customer.last_name}}</td>
                    <td class="text-left py-3 px-4"><a class="hover:text-blue-500" href="mailto:{{customer.email}}">{{customer.email}}</a></td>
                    <td class="text-left py-3 px-4"><a class="hover:text-blue-500" href="tel:{{customer.contact}}">{{customer.contact}}</a></td>
                    <td class="text-center w-1/3 py-3 px-4">
                        <button class="mr-2 bg-gray-700 hover:bg-gray-600 text-white p-1 rounded focus:outline-none focus:shadow-outline" type="button">
                            &nbsp;
                            <font-awesome-icon icon="eye" class="mr-2 text-gray-200"></font-awesome-icon>
                        </button>
                        <button class="mr-2 bg-blue-700 hover:bg-blue-600 text-white p-1 rounded focus:outline-none focus:shadow-outline" type="button">
                            &nbsp;
                            <font-awesome-icon icon="pencil" class="mr-2 text-gray-200"></font-awesome-icon>
                        </button>
                        <button @click.prevent="deleteCustomer(customer.id)" class="bg-red-700 hover:bg-red-600 text-white p-1 rounded focus:outline-none focus:shadow-outline" type="button">
                            &nbsp;
                            <font-awesome-icon icon="ban" class="mr-2 text-gray-200"></font-awesome-icon>
                        </button>
                    </td>
                </tr>
                
            </tbody>
        </table>
    </div>
    
    <!-- New customer modal -->
    <Teleport to="#modal">
        <div v-if="newCustomerModal" class="bg-gray-800 bg-opacity-50 flex justify-center items-center fixed top-0 left-0 w-screen h-screen">
            <div class="relative w-1/3 bg-white p-5 border rounded shadow-lg shadow-slate-700">
                <!-- Close button -->
                <button @click="newCustomerModal = false" class="absolute top-1 right-2 border-none cursor-pointer bg-none">X</button>
                
                <h1 class="block text-gray-700 text-2xl text-center font-bold mb-5">New customer</h1>
                <form @submit.prevent="storeCustomer" class="w-full" novalidate>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="first_name">
                            First name
                        </label>
                        <input v-model="customer.first_name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="first_name" name="first_name" type="text" placeholder="First name">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="last_name">
                            Last name
                        </label>
                        <input v-model="customer.last_name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="last_name" name="last_name" type="text" placeholder="Last name">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                            Email
                        </label>
                        <input v-model="customer.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Email">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="contact">
                            Contact
                        </label>
                        <input v-model="customer.contact" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" placeholder="Contact">
                    </div>

                    <!-- Errors -->
                    <ul class="list-disc text-red-600 mb-6 ml-5 text-xs">
                        <li v-for="(error, index) in newCustomerErrors" :key="index">{{error}}</li>
                    </ul>

                    <div class="flex items-center justify-between">
                        <button class="bg-teal-700 hover:bg-teal-600 text-white font-bold w-4/12 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Create
                        </button>

                        <!-- Loading -->
                        <div v-if="newCustomerLoading" class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-teal-500" role="status">
                            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'CustomerListComponent',
        data(){
            return {
                customers: Array,
                getCustomerloading: true,

                // For the new customer
                customer: {},
                first_name: '',
                last_name: '',
                email: '',
                contact: '',
                newCustomerModal: false,
                newCustomerLoading: false,
                newCustomerErrors : []
            }
        },
        created(){
            this.getCustomers()
        },
        methods:{
            async getCustomers(){
                this.getCustomerloading = true
                
                let apiUrl = 'http://127.0.0.1:8000/api/customers'

                await axios.get(apiUrl).then((response) => {
                    this.customers = response.data.customers
                    console.log(this.customers)

                    this.getCustomerloading = false
                }).catch((error) => {
                    console.log(error)
                })
            },
            async deleteCustomer(id){
                let apiUrl = `http://127.0.0.1:8000/api/customer/delete/${id}`;

                await axios.delete(apiUrl).then((response) => {
                    // console.log(response.data)
                    if(response.data.code === 200){
                        alert(response.data.message)
                        this.getCustomers()
                    }
                    else{
                        alert(response.data.message)
                    }
                }).catch(error => {
                    alert(error)
                })
            },
            async storeCustomer(){
                this.newCustomerLoading = true // Start the loading
                this.newCustomerErrors = []

                const apiUrl = 'http://localhost:8000/api/add_customer';
                let formData = new FormData();

                formData.append('first_name', this.customer.first_name)
                formData.append('last_name', this.customer.last_name)
                formData.append('email', this.customer.email)
                formData.append('contact', this.customer.contact)

                // Sending request
                await axios.post(apiUrl, formData).then((response) => {
                    this.newCustomerLoading = false; // Stop the loading

                    if(response.data.code === 200){
                        this.newCustomerModal = false
                        this.getCustomers()
                        // console.log(response.data.message)
                    }else{
                        this.newCustomerErrors.push(response.data.message)
                    }
                }).catch((error) =>{
                    this.newCustomerLoading = false; // Stop the loading
                    this.newCustomerErrors.push(error.message)
                })
            }
        },
        mounted(){
            console.log('Mounted !')
        }
    }
</script>
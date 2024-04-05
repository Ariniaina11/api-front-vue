<template>
    <div class="relative  w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 bg-white p-5 border rounded shadow-lg shadow-slate-700">
        <!-- Close button -->
        <button @click="closeHandler" class="absolute top-1 right-2 border-none cursor-pointer bg-none">X</button>
        
        <h1 class="block text-gray-700 text-2xl text-center font-bold mb-5">Deleting customer</h1>
        <form @submit.prevent="storeCustomer" class="w-full" novalidate>
            <h1 class="text-center my-4 font-mono text-md text-gray-800">Did you like to delete this customer with ID : {{customerId}} ?</h1>

            <div class="flex items-center justify-between">
                <button @click="closeHandler" class="bg-gray-700 hover:bg-gray-600 text-white font-bold w-3/12 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    No
                </button>

                <!-- Loading -->
                <div v-if="loading" class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-teal-500" role="status">
                    <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>

                <button @click="deleteCustomer" class="bg-red-700 hover:bg-red-600 text-white font-bold w-3/12 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Yes
                </button>

            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'DeleteCustomerComponent',
        props: {
            customerId: Number
        },
        data(){
            return {
                loading: false
            }
        },
        methods: {
            // Delete a customer
            async deleteCustomer(){
                this.loading = true
                let apiUrl = `http://127.0.0.1:8000/api/customer/delete/${this.customerId}`;

                await axios.delete(apiUrl).then((response) => {
                    // console.log(response.data)
                    if(response.data.code === 200){
                        this.loading = false
                        console.log(response.data.message)
                        this.$emit('customer-deleted', true)
                    }
                    else{
                        console.log(response.data.message)
                    }
                }).catch(error => {
                    console.log(error)
                })
            },

            // Close the modal
            closeHandler(){
                this.$emit('delete-customer-close', true)
            }
        }
    }
</script>
<template>
    <div class="m-auto my-5">
        <h1 class="text-center font-bold font-sans text-gray-700 text-3xl">List of your customers</h1>
        <hr class="w-20 h-1 m-auto bg-gray-700">
    </div>
    <div class="px-10">
        <button @click="newCustomerHandle" class="block mb-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
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
                        <button @click.prevent="editCustomerHandle(customer)" class="mr-2 bg-blue-700 hover:bg-blue-600 text-white p-1 rounded focus:outline-none focus:shadow-outline" type="button">
                            &nbsp;
                            <font-awesome-icon icon="pencil" class="mr-2 text-gray-200"></font-awesome-icon>
                        </button>
                        <button @click.prevent="deleteCustomerHandler(customer.id)" class="bg-red-700 hover:bg-red-600 text-white p-1 rounded focus:outline-none focus:shadow-outline" type="button">
                            &nbsp;
                            <font-awesome-icon icon="ban" class="mr-2 text-gray-200"></font-awesome-icon>
                        </button>
                    </td>
                </tr>
                
            </tbody>
        </table>
    </div>

    <Teleport to="#modal">
        <!-- New customer modal -->
        <div v-if="newCustomerModal" class="bg-gray-800 bg-opacity-50 flex justify-center items-center fixed top-0 left-0 w-screen h-screen">
            <NewCustomerComponent 
                :title="modalTitle"
                :customerToEdit="customerToEdit"
                :btnText="btnText"
                @new-customer-close="newCustomerModal = false" 
                @new-customer-stored="newCustomerStoredHandler"
                @customer-updated="customerUpdatedHandler" />
        </div>

        <!-- Deleting customer modal -->
        <div v-if="deleteCustomerModal" class="bg-gray-800 bg-opacity-50 flex justify-center items-center fixed top-0 left-0 w-screen h-screen">
            <DeleteCustomerComponent 
                @delete-customer-close="deleteCustomerModal = false"
                :customerId="customerToDelete"
                @customer-deleted="customerDeletedHandler" />
        </div>
    </Teleport>
</template>

<script>
    import axios from 'axios'
    import NewCustomerComponent from '../modals/NewCustomerComponent.vue'
    import DeleteCustomerComponent from '../modals/DeleteCustomerComponent.vue'

    export default {
        name: 'CustomerListComponent',
        components: {
            NewCustomerComponent,
            DeleteCustomerComponent
        },
        data(){
            return {
                customers: Array,
                customerToDelete: 0,
                customerToEdit: null,
                modalTitle: '',
                btnText: '',
                newCustomerModal: false,
                deleteCustomerModal: false
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

            // New customer
            newCustomerHandle(){
                this.customerToEdit = null
                this.modalTitle = 'New customer';
                this.btnText = 'Create'
                this.newCustomerModal = true
            },

            // If a new customer stored successfully
            newCustomerStoredHandler(){
                this.newCustomerModal = false
                this.getCustomers()
            },

            // Edit customer
            editCustomerHandle(customer){
                this.customerToEdit = customer
                this.modalTitle = 'Editing customer'
                this.btnText = 'Update'
                this.newCustomerModal = true
            },

            // Delete a customer
            deleteCustomerHandler(id){
                this.customerToDelete = id
                this.deleteCustomerModal = true
            },

            // If a customer deleted successfully
            customerDeletedHandler(){
                this.deleteCustomerModal = false
                this.getCustomers()
            },

            // If a customer updated successfully
            customerUpdatedHandler(){
                this.newCustomerModal = false
                this.getCustomers()
            }
        },
        mounted(){
            console.log('Mounted !')
        }
    }
</script>
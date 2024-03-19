<template>
    <div class="container">
        <button type="button" class="create-btn">+ Create a new user</button>
        <table class="table">
            <thead>
                <tr>
                    <td>ID</td>
                    <td>First name</td>
                    <td>Last name</td>
                    <td>Email</td>
                    <td>Contact</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody v-for="customer in customers" :key="customer.id">
                <tr>
                    <td>{{ customer.id }}</td>
                    <td>{{ customer.first_name }}</td>
                    <td>{{ customer.last_name }}</td>
                    <td>{{ customer.email }}</td>
                    <td>{{ customer.contact }}</td>
                    <td>
                        <button type="button" class="edit-btn bg-emerald-700 px-5 py-2 text-white">Modifier</button>
                        <button type="button" class="delete-btn">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'MainComponent',
        data() {
            return{
                customers : Array
            }
        },
        created(){
            this.getCustomers()
        },
        methods: {
            async getCustomers(){
                let url = 'http://127.0.0.1:8000/api/customers'
                await axios.get(url).then((response) => {
                    this.customers = response.data.customers
                    console.log(this.customers)
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
        mounted() {
            console.log('Customer list component mounted !')
        }
    }

</script>

<style scoped>
    .container{
        margin: auto;
    }
    .create-btn{
        padding: 5px 20px;
        background-color: #1ca19a;
        color: whitesmoke;
        border-radius: 3px;
        font-size: 18px;
        margin-top: 1%;
    }
    .create-btn:hover{
        color: white;
        transition: .5s;
        background-color: #1c6b67;;
    }
</style>
<template>
    <div class="flex bg-teal-800 text-white m-auto mx-3 mt-2 p-3 ">
        <h1 class="my-auto text-2xl">{{ title }}</h1>
        <button type="button" class="logout-btn mx-">Logout</button>
    </div>
</template>

<script>
    export default {
        name: 'HeaderComponent',
        props: {
            title: String
        }
    }
</script>

<style scoped>
    .title{
        /* font-size: 22px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        width: 100%;
        margin: auto; */
    }
    .logout-btn{
        padding: 10px 20px;
        border-radius: 2px;
        border: 1px solid rgb(194, 194, 194);
        font-family: inherit;
        color: rgb(194, 194, 194);
        font-weight: bold;
    }
    .logout-btn:hover{
        color: white;
        border-color: white;
        transition: .5s;
    }
</style>
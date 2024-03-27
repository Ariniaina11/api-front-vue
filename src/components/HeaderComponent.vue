<template>
    <div class="bg-teal-800 text-white m-auto mx-3 mt-2 p-3 ">
        <div class="my-auto inline">
            <font-awesome-icon icon="user-secret" class="text-3xl mr-2 text-gray-200"></font-awesome-icon>
            <h1 class="text-2xl inline">{{ title }}</h1>
        </div>
        <div class="float-right">
            <button type="button" class="font-serif text-gray-300 mr-5 px-4 py-1 border-solid border border-gray-300 rounded text-lg hover:text-gray-700 hover:bg-gray-300 hover:ease-in hover:duration-200">Sign In</button>
            <button type="button" class="font-serif text-gray-700 mr-5 px-4 py-1 border-solid border border-gray-300 rounded text-lg bg-gray-300">Sign Up</button>
        </div>
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
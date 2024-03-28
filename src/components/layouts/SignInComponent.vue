<template>
    <form class="bg-white shadow-md rounded  w-4/12 mx-auto px-8 pt-6 pb-8 mb-10">
        <h1 class="block text-gray-700 text-2xl text-center font-bold mb-5">Sign In</h1>
        <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
        </div>
        <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
        </div>
        <div class="flex items-center justify-between">
        <button class="bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Sign In
        </button>
        <a class="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-gray-600" href="#">
            Forgot Password?
        </a>
        </div>
    </form>
</template>

<script>
    export default {
        name : 'SignInComponent'
    }
</script>
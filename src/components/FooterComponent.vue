<template>
    <footer class="text-center text-gray-700 font-thin w-full fixed bottom-0 opacity-50 hover:opacity-100">&copy; {{ author }} copyright - {{ new Date().getFullYear() }}</footer>
</template>

<script>
    export default {
        name: 'FooterComponent',
        props : {
            author: String
        }
    }
</script>
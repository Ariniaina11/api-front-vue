<template>
    <span>{{ author }} copyright - 2024</span>
</template>

<script>
    export default {
        name: 'FooterComponent',
        props : {
            author: String
        }
    }
</script>

<style>
    span{
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
    }
</style>
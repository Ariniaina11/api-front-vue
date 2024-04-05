<template>
    <div class="mx-auto text-center px-5 py-20 md:p-20">
        <div class="w-max m-auto">
            <h1 class="text-8xl lg:text-9xl text-gray-800 md:tracking-widest animate-typing overflow-hidden whitespace-nowrap">Welcome</h1>
        </div>
        <span class="text-xl md:text-2xl lg:text-3xl font-sans">to <strong class="underline decoration-teal-600 transition-all hover:bg-red-200">#{{this.$store.state.title}}</strong></span>
        <div class="mx-auto m-16">
            <RouterLink to="/sign-in" class="mt-10 font-mono text-teal-800 px-5 py-3 border-solid border border-teal-800 rounded-xl text-2xl cursor-pointer hover:text-white hover:bg-gradient-to-r hover:from-teal-800 hover:to-teal-600 hover:ease-in hover:duration-200">Get started</RouterLink>
        </div>
    </div>
</template>
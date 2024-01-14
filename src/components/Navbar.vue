<template>
    <div class="bg-gray-900 p-4 md:flex md:items-center justify-between px-4">
        <div class="logo text-xl font-bold text-white cursor-pointer">
            <h1>CRM APP</h1>
        </div>
        <span class="text-white text-4xl absolute right-6 top-5 cursor-pointer md:hidden" @click="menuOpen">
            <i :class="`hover:text-green-400 ${open ? 'bi bi-x' : 'bi bi-filter-left'}`"></i>
        </span>

        <ul class="w-full bg-gray-900 gap-5 items-center px-6 absolute top-14 md:flex md:static md:w-auto md:pb-0 md:px-0 duration-500" :class="[open ? 'left-0' : 'left-[-100%]']">
            <li v-if="store.isAuthenticated" class="my-6 md:my-0 text-white duration-300 text-xl"><RouterLink to="/account">My Account</RouterLink></li>
            <li v-else class="my-6 md:my-0 text-white duration-300 text-xl"><RouterLink to="/">Log In</RouterLink></li>
        </ul>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useCmrStore } from '../stores/index.js'

const store = useCmrStore();

onBeforeMount(() => {
  store.initializeStore();
})

const open = ref(false)

const menuOpen = () => {
    open.value = !open.value
}

</script>

<style lang="scss" scoped>

.router-link-exact-active {
    color: rgb(74 222 128);
    border-bottom: 3px solid rgb(74 222 128) !important;
}

li.router-link-exact-active{
    color: rgb(74 222 128) !important;
}

li:hover {
    color: rgb(74 222 128) !important;
}

</style>
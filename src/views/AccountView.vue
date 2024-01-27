<template>
  <div class="container">
    <h1>My Account</h1>
    <div class="w-full">
      <RouterLink :to="{name: 'editMember', params: {id: store.user.id}}" class="button">Edit</RouterLink>
      <button @click="logout">Logout</button>
    </div>
    
  </div>
</template>

<script setup>
import axios from 'axios';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useCmrStore } from '../stores/index';

const store = useCmrStore();
const router = useRouter();

onBeforeMount(() => {
  store.initializeStore();
})

const logout = async () => {
    await axios
            .post('/api/v1/token/logout/')
            .then(response => {
              console.log('Logged Out')
            })
            .catch(error => {
              console.log(JSON.stringify(error))
            })

          axios.defaults.headers.common['Authorization'] = ""

          localStorage.removeItem('token')
          localStorage.removeItem('username')
          localStorage.removeItem('userid')
          localStorage.removeItem('team_id')
          localStorage.removeItem('team_name')
    
          store.removeToken()

          router.push('/')
}
</script>

<style scoped>

</style>
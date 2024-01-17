<template>
  <div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
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
    
          store.removeToken()

          router.push('/')
}
</script>

<style scoped>

</style>
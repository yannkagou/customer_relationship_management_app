<template>
  <div id="app" class="bg-green-400 h-screen">
    <Navbar />

    <div class="is-loading-bar text-center" :class="{'is-loading': store.isLoading}">
      <div class="lds-dual-ring"></div>
    </div>

    <section class="section">
      <RouterView />
    </section>

    <footer class="mt-6">
      <p class="text-center">Copyright (c) Yannick Kagou 2024</p>
    </footer>
    
  </div>

</template>

<script setup>
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import Navbar from './components/Navbar.vue';
import { useCmrStore } from '../src/stores/index.js'

const store = useCmrStore();

onBeforeMount(() => {
  store.initializeStore();
  const token = store.token;
  if (token){
    axios.defaults.headers.common['Authorization'] = 'Token' + token
  } else {
    axios.defaults.headers.common['Authorization'] = ''
  }
})


</script>

<style lang="scss" scoped>
  
.lds-dual-ring{
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring:after{
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}

.is-loading-bar{
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading{ 
    height: 80px;
  }
}


</style>



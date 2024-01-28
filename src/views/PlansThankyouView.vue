<template>
    <div class="container">
        <div class="w-full">
            <h1>Thank You</h1>    
        </div>
        <div class="w-1/3">
            <p>Thank you for subscribing to a plan!</p>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onBeforeMount, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCmrStore } from '@/stores';

let store = useCmrStore()

let route = useRoute()

onBeforeMount(() => {
    store.initializeStore();
})

onMounted(() => {
    axios.post('/stripe/check_session/', {
        'session_id': route.query.session_id
    })
    .then(response => {
        console.log(response)
        store.setTeam({
            'id': response.data.id,
            'name': response.data.name,
            'plan': response.data.plan.name,
            'max_leads': response.data.plan.max_leads,
            'max_clients': response.data.plan.max_clients
        })
    })
    .catch(error => {
        console.log(error)
    })
})

</script>
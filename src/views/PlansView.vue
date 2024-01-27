<template>
    <div class="container">
        <div class="w-full">
            <h1>Plans</h1>    
        </div>
        <div class="w-1/3">
            <div class="box">
                <h2>Free</h2>
                <h4>$0</h4>
                <p>Max 5 clients</p>
                <p>Max 5 leads</p>
                <button @click="subscribe('free')">Subscribe</button>
            </div>
        </div>
        <div class="w-1/3">
            <div class="box">
                <h2>Small Team</h2>
                <h4>$10</h4>
                <p>Max 15 clients</p>
                <p>Max 15 leads</p>
                <button @click="subscribe('smallteam')">Subscribe</button>
            </div>
        </div>
        <div class="w-1/3">
            <div class="box">
                <h2>Big team</h2>
                <h4>$25</h4>
                <p>Max 50 clients</p>
                <p>Max 50 leads</p>

                <button @click="subscribe('bigteam')">Subscribe</button>
            </div>
        </div>  
    </div>
</template>

<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useCmrStore } from '@/stores';
import { onBeforeMount } from 'vue';

const store = useCmrStore()

const router = useRouter()

onBeforeMount(() => {
    store.initializeStore()
})

const subscribe = async (plan) => {
    store.setIsLoading(true)

    const data = {
        plan: plan
    }

    await axios.post(`/api/v1/teams/upgrade_plan/`, data)
        .then(response => {
            console.log('Upgraded plan ', response.data)
            store.setTeam({
                'id': response.data.id, 
                'name': response.data.name,
                'plan': response.data.plan.name,
                'max_leads': response.data.plan.max_leads,
                'max_clients': response.data.plan.max_clients
            })

            router.push('/teams/plans/thankyou')
        })
        .catch(error => {
            console.log(error)
        })

    store.setIsLoading(false)
}

</script>
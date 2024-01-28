<template>
    <div class="container">
        <div class="w-full">
            <h1>Plans</h1>    
        </div>
        <div class="w-full flex">
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

        <hr>

        <div class="w-full">
            <button @click="cancelPlan()" class="bg-red-400 text-white">Cancel plan</button>
        </div>

    </div>
</template>

<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useCmrStore } from '@/stores';
import { onBeforeMount, onMounted, ref } from 'vue';

const store = useCmrStore()

const router = useRouter()

let pub_key = ref('')

let stripe =ref(null)

onBeforeMount(() => {
    store.initializeStore()
})

onMounted(async () => {
    await get_pub_key()
    stripe.value = Stripe(pub_key.value)
})

const get_pub_key = async () => {
    store.setIsLoading(true)

    await axios
        .get(`/api/v1/teams/get_stripe_pub_key/`)
        .then(response => {
                pub_key.value = response.data.pub_key
            })
            .catch(error => {
                console.log(error)
            })

    store.setIsLoading(false)
}

const cancelPlan = async () => {
    store.setIsLoading(true)

    await axios.post('/api/v1/teams/cancel_plan/')
            .then(response => {
                store.setTeam({
                'id': response.data.id, 
                'name': response.data.name,
                'plan': response.data.plan.name,
                'max_leads': response.data.plan.max_leads,
                'max_clients': response.data.plan.max_clients
            })

            router.push('/team')
            })

    store.setIsLoading(false)
}

const subscribe = async (plan) => {
    store.setIsLoading(true)

    const data = {
        plan: plan
    }

    await axios
        .post('/api/v1/stripe/create_checkout_session/', data)
        .then(response => {
            console.log(response)

            return stripe.redirectToCheckout({sessionId: response.data.sessionId})
        })
        .catch(error => {
            console.log('error', error)
        })

    // await axios.post(`/api/v1/teams/upgrade_plan/`, data)
    //     .then(response => {
    //         console.log('Upgraded plan ', response.data)
    //         store.setTeam({
    //             'id': response.data.id, 
    //             'name': response.data.name,
    //             'plan': response.data.plan.name,
    //             'max_leads': response.data.plan.max_leads,
    //             'max_clients': response.data.plan.max_clients
    //         })

    //         router.push('/teams')
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })

    store.setIsLoading(false)
}

</script>
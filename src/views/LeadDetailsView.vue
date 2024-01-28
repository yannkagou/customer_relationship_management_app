<template>
    <div class="container">
        <div class="w-full flex items-center justify-between">
            <h1>{{ lead.company }}</h1>
            <div class="button">
                <button @click="convertToClient" class="">Convert to client</button>
            </div>
            <RouterLink :to="{name: 'editLead', params: {id: lead.id}}" class="button"><button>Edit</button></RouterLink>
            <div class="button">
                <button @click="deleteLead()" class="">Delete</button>
            </div>
        </div>

        <div class="flex w-1/2">
            <div class="box">
                <h2>Details</h2>
                <template v-if="lead.assigned_to"><p><strong>Assigned to:</strong>{{ lead.assigned_to.first_name }} {{ lead.assigned_to.last_name }}</p></template>
                <p><strong>Status:</strong>{{ lead.status }}</p>
                <p><strong>Priority:</strong>{{ lead.priority }}</p>
                <p><strong>Confidence:</strong>{{ lead.confidence }}</p>
                <p><strong>Estimated value:</strong>{{ lead.estimeted_value }}</p>
                <p><strong>Created at:</strong>{{ lead.created_at }}</p>
                <p><strong>Modified at:</strong>{{ lead.modified_at }}</p>
            </div>
        </div>

        <div class="flex w-1/2">
            <div class="box">
                <h2>Contact informations</h2>
                <p><strong>Contact person:</strong>{{ lead.contact_person }}</p>
                <p><strong>Email:</strong>{{ lead.email }}</p>
                <p><strong>Phone:</strong>{{ lead.phone }}</p>
                <p><strong>Website:</strong>{{ lead.website }}</p>
            </div>
        </div>

    </div>
</template>

<script setup>
import axios from 'axios';
import { useCmrStore } from '@/stores';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const store = useCmrStore()

const router = useRouter()

const route = useRoute()

let lead = reactive({})

onMounted(() => {
    getLead()
})

const getLead = async () => {
    store.setIsLoading(true)
    const leadID = route.params.id
    await axios
            .get(`/api/v1/leads/${leadID}`)
            .then(response => {
                console.log(response.data)
                Object.assign(lead, response.data)
            })
            .catch(error => {
                console.log(error)
            })
    store.setIsLoading(false)
}

const deleteLead = async () => {
    store.setIsLoading(true)
    const leadID = route.params.id
    await axios
            .post(`/api/v1/leads/delete_lead/${leadID}/`)
            .then(response => {
                console.log(response.data)
                router.push('/leads')
            })
            .catch(error => {
                console.log(error)
            })
    store.setIsLoading(false)
}

const convertToClient = async () => {
    store.setIsLoading(true)
    const leadID = route.params.id
    const data = {
        lead_id: leadID
    }
    await axios
            .post(`/api/v1/convert_lead_to_client/`, data)
            .then(response => {
                console.log('Convert to client')
                router.push('/clients')
            })
    store.setIsLoading(false)
}

</script>

<style lang="scss" scoped> 

</style>
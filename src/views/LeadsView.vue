<template>
    <div class="container">
        <div>
            <h1>Leads</h1>
            <RouterLink to="/leads/add">Add lead</RouterLink>
        </div>
  
        <div>
            <table class="w-full table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Contact Person</th>
                        <th>Assigned to</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="lead in leads" :key="lead.id">
                        <td>{{ lead.company }}</td>
                        <td>{{ lead.contact_person }}</td>
                        <td>
                            <template v-if="lead.assigned_to">{{ lead.assigned_to.username }}</template>
                        </td>
                        <td>{{ lead.status }}</td>
                        <td><RouterLink :to="{name: 'leadDetails', params: {id: lead.id}}">Details</RouterLink></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useCmrStore } from '../stores/index';
import { onMounted, ref } from 'vue';

const store = useCmrStore();

let leads = ref([])

onMounted(() => {
    getLeads()
})

const getLeads = async () => {
    store.setIsLoading(true)
    await axios.get('/api/v1/leads/')
        .then(response => {
            Object.assign(leads, response.data)
        })
        .catch(error => {
            console.log(error)
        })

    store.setIsLoading(false)
}

</script>

<style lang="scss" scoped>

</style>
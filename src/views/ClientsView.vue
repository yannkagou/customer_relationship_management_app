<template>
    <div class="container">
        <div>
            <h1>Clients</h1>
            <RouterLink to="/client/add">Add client</RouterLink>
        </div>
  
        <div>
            <template v-if="clients.length">
                <table class="w-full table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact Person</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="client in clients" :key="client.id">
                            <td>{{ client.name }}</td>
                            <td>{{ client.contact_person }}</td>
                            <td><RouterLink :to="{name: 'clientDetails', params: {id: client.id}}">Details</RouterLink></td>
                        </tr>
                    </tbody>
                </table>
            </template>

            <template v-else>
                <p>You don't have any clients yet...</p>
            </template>
            
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useCmrStore } from '../stores/index';
import { onMounted, ref } from 'vue';

const store = useCmrStore();

let clients = ref([])

onMounted(() => {
    getClients()
})

const getClients = async () => {
    store.setIsLoading(true)
    await axios.get('/api/v1/clients/')
        .then(response => {
            Object.assign(clients, response.data)
        })
        .catch(error => {
            console.log(error)
        })

    store.setIsLoading(false)
}

</script>

<style lang="scss" scoped>

</style>
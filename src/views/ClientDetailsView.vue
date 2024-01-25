<template>
    <div class="container">
        <div class="w-full flex items-center justify-between">
            <h1>{{ client.name }}</h1>
            <RouterLink :to="{name: 'editClient', params: {id: client.id}}" class="button">Edit</RouterLink>
        </div>

        <div class="flex w-1/2">
            <div class="box">
                <h2>Details</h2>
                <p><strong>Created at:</strong>{{ client.created_at }}</p>
                <p><strong>Modified at:</strong>{{ client.modified_at }}</p>
            </div>
        </div>

        <div class="flex w-1/2">
            <div class="box">
                <h2>Contact informations</h2>
                <p><strong>Contact person:</strong>{{ lead.contact_person }}</p>
                <p><strong>Email:</strong>{{ client.email }}</p>
                <p><strong>Phone:</strong>{{ client.phone }}</p>
                <p><strong>Website:</strong>{{ client.website }}</p>
            </div>
        </div>

        <hr>

        <div class="w-full">
            <h2>Notes</h2>

            <RouterLink :to="{name: 'addNote', params: {id: client.id}}" class="button mb-6">Add note</RouterLink>

            <div class="box" v-for="note in notes" :key="note.id">
                <h3>{{ note.name }}</h3>
                <p>{{ note.body }}</p>
            </div> 
        </div>

    </div>
</template>

<script setup>
import axios from 'axios';
import { useCmrStore } from '@/stores';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const store = useCmrStore()

const route = useRoute()

let client = reactive({})

let notes = ref([])

onMounted(() => {
    getClient()
})

const getClient = async () => {
    store.setIsLoading(true)
    const clientID = route.params.id
    await axios
            .get(`/api/v1/leads/${clientID}`)
            .then(response => {
                Object.assign(client, response.data)
            })
            .catch(error => {
                console.log(error)
            })
    
    await axios
            .get(`/api/v1/notes/?client_id=${clientID}`)
            .then(response => {
                Object.assign(notes, response.data)
            })
            .catch(error => {
                console.log(error)
            })

    store.setIsLoading(false)
} 

</script>

<style lang="scss" scoped> 

</style>
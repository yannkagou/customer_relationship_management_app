<template>
    <div class="container">
        <div class="w-full flex items-center justify-between">
            <h1>{{ client.name }}</h1>
            <RouterLink :to="{name: 'editClient', params: {id: client.id}}" class="button"><button>Edit</button></RouterLink>
            <div class="button">
                <button @click="deleteClient()" class="">Delete</button>
            </div>
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
                <RouterLink :to="{name: 'editNote', params: {id: client.id, note_id: note.id}}" class="button mt-6">Edit note</RouterLink>
            </div> 
        </div>

    </div>
</template>

<script setup>
import axios from 'axios';
import { useCmrStore } from '@/stores';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const store = useCmrStore()

const route = useRoute()

const router = useRouter()

let client = reactive({})

let notes = ref([])

onMounted(() => {
    getClient()
})

const getClient = async () => {
    store.setIsLoading(true)
    const clientID = route.params.id
    await axios
            .get(`/api/v1/clients/${clientID}`)
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

const deleteClient = async () => {
    store.setIsLoading(true)
    const clientID = route.params.id
    await axios
            .post(`/api/v1/clients/delete_client/${clientID}/`)
            .then(response => {
                console.log(response.data)
                router.push('/clients')
            })
            .catch(error => {
                console.log(error)
            })
    store.setIsLoading(false)
}

</script>

<style lang="scss" scoped> 

</style>
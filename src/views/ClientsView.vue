<template>
    <div class="container">
        <div>
            <h1>Clients</h1>
            <RouterLink to="/client/add" v-if="store.team.max_clients > num_clients">Add client</RouterLink>

            <div class="notification bg-red-400 text-white" v-else>
                You have reached the top of your limitaions, please upgrade!
            </div>
            <hr>
            <form @submit.prevent="submitForm">
                <div class="text-green-400 w-11/12 mx-auto my-2 flex items-center">
                    <input type="text" class="py-0 px-4 font-semibold w-1/3" v-model="query">
                </div>

                <div class="">
                    <button>Search</button>
                </div>
            </form>
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
                <div class="">
                    <button v-if="showPreviousButton" @click="goToPreviousPage()">Previous</button>
                    <button v-if="showNextButton" @click="goToNextPage()">Next</button>
                </div>
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
import { onBeforeMount, onMounted, ref } from 'vue';

const store = useCmrStore();

let clients = ref([])

let query = ref('')

let num_clients = ref(0)

let showNextButton =ref(false)
let showPreviousButton =ref(false)

let currentPage = ref(1)

onBeforeMount(() => {
  store.initializeStore();
})

onMounted(() => {
    getClients()
})

const getClients = async () => {
    store.setIsLoading(true)

    showNextButton.value = false
    showPreviousButton.value = false

    await axios.get(`/api/v1/clients/`)
        .then(response => {
            console.log(response.data)
            num_clients.value = response.data.count
        })
        .catch(error => {
            console.log(error)
        })

    await axios.get(`/api/v1/clients/?page=${currentPage.value}&search=${query.value}`)
        .then(response => {
            Object.assign(clients, response.data.results)
            if (response.data.next) {
                showNextButton.value = true
            }
            if (response.data.previous) {
                showPreviousButton.value = true
            }
        })
        .catch(error => {
            console.log(error)
        })

    store.setIsLoading(false)
}

const goToNextPage = () => {
    currentPage.value += 1
    getClients()
}

const goToPreviousPage = () => {
    currentPage.value -= 1
    getClients()
}

const submitForm = () => {
    getClients()
}

</script>

<style lang="scss" scoped>

input{
    border: 1px solid rgb(74 222 128);
    border-radius: 6px;
    line-height: 48px;
    outline: none;
}

input:focus{
    border: 3px solid rgb(74 222 128);
}

button {
    width: 70%;
    margin: 20px auto;
    background-color: rgb(74 222 128);
    border: 1px solid #dddfe2;
    border-radius: 6px;
    color: #fff;
    font-size: 17px;
    line-height: 48px;
    padding: 0 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
}

</style>
<template>
    <div class="container">
        <div>
            <h1>Leads</h1>
            <RouterLink to="/leads/add" v-if="store.team.max_leads > num_leads">Add lead</RouterLink>

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
                            <template v-if="lead.assigned_to">{{ lead.assigned_to.first_name }} {{ lead.assigned_to.last_name }}</template>
                        </td>
                        <td>{{ lead.status }}</td>
                        <td><RouterLink :to="{name: 'leadDetails', params: {id: lead.id}}">Details</RouterLink></td>
                    </tr>
                </tbody>
            </table>
            <div class="">
                <button v-if="showPreviousButton" @click="goToPreviousPage()">Previous</button>
                <button v-if="showNextButton" @click="goToNextPage()">Next</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useCmrStore } from '../stores/index';
import { onBeforeMount, onMounted, ref } from 'vue';

const store = useCmrStore();

let leads = ref([])

let query = ref('')

let num_leads = ref(0)

let showNextButton =ref(false)
let showPreviousButton =ref(false)

let currentPage = ref(1)

onBeforeMount(() => {
  store.initializeStore();
})

onMounted(() => {
    getLeads()
})

const getLeads = async () => {
    store.setIsLoading(true)

    showNextButton.value = false
    showPreviousButton.value = false

    await axios.get(`/api/v1/leads/`)
        .then(response => {
            console.log(response.data)
            num_leads.value = response.data.count
        })
        .catch(error => {
            console.log(error)
        })

    await axios.get(`/api/v1/leads/?page=${currentPage.value}&search=${query.value}`)
        .then(response => {
            Object.assign(leads, response.data.results)
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

const submitForm = () => {
    getLeads()
}

const goToNextPage = () => {
    currentPage.value += 1
    getLeads()
}

const goToPreviousPage = () => {
    currentPage.value -= 1
    getLeads()
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
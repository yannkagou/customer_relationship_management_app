<template>
    <div class="container">
        <div class="w-full">
            <h1>Edit {{ lead.company }}</h1>
        </div>

        <div class="flex flex-col">
            <form @submit.prevent="submitForm">
                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Company</label>
                    <input type="text" class="w-full py-0 px-4 font-semibold" v-model="lead.company">
                </div>
                    
                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Contact Person</label>
                    <input type="text" class="w-full py-0 px-4 font-semibold" v-model="lead.contact_person">
                </div>

                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Email</label>
                    <input type="email" class="w-full py-0 px-4 font-semibold" v-model="lead.email">
                </div>

                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Phone</label>
                    <input type="text" class="w-full py-0 px-4 font-semibold" v-model="lead.phone">
                </div>

                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Website</label>
                    <input type="text" class="w-full py-0 px-4 font-semibold" v-model="lead.website">
                </div>

                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Confidence</label>
                    <input type="number" class="w-full py-0 px-4 font-semibold" v-model="lead.confidence">
                </div>

                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Estimated value</label>
                    <input type="number" class="w-full py-0 px-4 font-semibold" v-model="lead.estimeted_value">
                </div>

                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Status</label>
                    <select class="w-full py-0 px-4 font-semibold" v-model="lead.status">
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="inprogress">In progress</option>
                        <option value="lost">Lost</option>
                        <option value="won">Won</option>
                    </select>
                </div>

                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Priority</label>
                    <select class="w-full py-0 px-4 font-semibold" v-model="lead.priority">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Assign to</label>
                    <select class="w-full py-0 px-4 font-semibold" v-model="lead.assigned_to">
                        <option value="" selected>Select member</option>
                        <option v-for="member in team.members" :key="member.id" :value="member.id">{{member.username}}</option>
                    </select>
                </div>

                <div class="mt-2">
                    <button>Update</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useCmrStore } from '@/stores';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const store = useCmrStore()

const route = useRoute()

const router = useRouter()

let lead = reactive({})

let team = reactive({
    members: []
})

onMounted(() => {
    getLead();
    getTeam()
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
    store.setIsLoading(false)
}

getTeam = async () => {
    store.setIsLoading(true)
    await axios
            .get('/api/v1/teams/get_my_team/')
            .then(response => {
                Object.assign(team, response.data)
            })
            .catch(error => {
                console.log(error)
            })
    store.setIsLoading(false)
}

const submitForm = async () => {
    store.setIsLoading(true)
    const leadID = route.params.id
    await axios
            .patch(`/api/v1/leads/${leadID}`, lead)
            .then(response => {
                console.log(response.data)
                router.push(`/leads/${leadID}`)
            })
            .catch(error => {
                console.log(error)
            })
    store.setIsLoading(false)
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
.errors{
    border-radius: 6px;
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
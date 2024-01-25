<template>
    <div class="container">
        <div class="w-full">
            <h1>Edit {{ client.name }}</h1>
        </div>

        <div class="flex flex-col">
            <form @submit.prevent="submitForm">
                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Name</label>
                    <input type="text" class="w-full py-0 px-4 font-semibold" v-model="client.name">
                </div>
                    
                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Contact Person</label>
                    <input type="text" class="w-full py-0 px-4 font-semibold" v-model="client.contact_person">
                </div>

                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Email</label>
                    <input type="email" class="w-full py-0 px-4 font-semibold" v-model="client.email">
                </div>

                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Phone</label>
                    <input type="text" class="w-full py-0 px-4 font-semibold" v-model="client.phone">
                </div>

                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Website</label>
                    <input type="text" class="w-full py-0 px-4 font-semibold" v-model="client.website">
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

let client = reactive({})

onMounted(() => {
    getClient();
})

const getClient = async () => {
    store.setIsLoading(true)
    const clientID = route.params.id
    await axios
            .get(`/api/v1/clients/${clientID}`)
            .then(response => {
                console.log(response.data)
                Object.assign(client, response.data)
            })
    store.setIsLoading(false)
}

const submitForm = async () => {
    store.setIsLoading(true)
    const clientID = route.params.id
    await axios
            .patch(`/api/v1/leads/${clientID}`, client)
            .then(response => {
                console.log(response.data)
                router.push(`/clients/${clientID}`)
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
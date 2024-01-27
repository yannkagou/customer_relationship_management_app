<template>
    <div class="container">
        <div>
            <h1>Add member</h1>
        </div>

        <div class="flex flex-col">
            <form @submit.prevent="submitForm">
                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">First name</label>
                    <input type="text" class="w-full py-0 px-4 font-semibold" v-model="user.first_name">
                </div>
                    
                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Last name</label>
                    <input type="text" class="w-full py-0 px-4 font-semibold" v-model="user.last_name">
                </div>

                <div class="mt-2">
                    <button>Edit</button>
                </div>
            </form>
        </div>
        
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, reactive, onMounted } from 'vue';
import { useCmrStore } from '@/stores';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const store = useCmrStore()

const router = useRouter()

const route = useRoute()

let user = reactive ({})

onMounted(() => {
    getUser()
})

const getUser = async () => {
    store.setIsLoading(true)
    const userID = route.params.id
    await axios
            .get(`/api/v1/teams/member/${userID}/`)
            .then(response => {
                Object.assign(user, response.data)
            })
    store.setIsLoading(false)
}

const submitForm = async () => {
    store.setIsLoading(true)
    const userID = route.params.id
    await axios.put(`/api/v1/teams/member/${userID}/`, user)
        .then(response => {
            router.push({name: 'account'})
        })
        .catch(error => {
            console.log(error)
        })
    store.setIsLoading(false)
}

</script>

<style lang="scss" scoped>
input, textarea{
    border: 1px solid rgb(74 222 128);
    border-radius: 6px;
    line-height: 48px;
    outline: none;
}

input:focus, textarea:focus{
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
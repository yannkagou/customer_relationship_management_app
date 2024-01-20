<template>
    <div class="container">
        <div>
            <h1>Add Teams</h1>
        </div>

        <div class="flex flex-col">
            <form @submit.prevent="submitForm">
                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full"> Team name</label>
                    <input type="text" class="w-full py-0 px-4 font-semibold" v-model="team.name">
                </div>

                <div class="mt-2">
                    <button>Submit</button>
                </div>
            </form>
        </div>
        
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, reactive } from 'vue';
import { useCmrStore } from '@/stores';
import { useRouter } from 'vue-router';

const store = useCmrStore()

const router = useRouter()

let team = reactive ({
    name: ''
})

const submitForm = async () => {
    store.setIsLoading(true)
    await axios.post('/api/v1/teams/', team)
        .then(response => {
            console.log(response)
            store.setTeam({"id": response.data.id, "name": response.data.name})
            router.push('/')
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
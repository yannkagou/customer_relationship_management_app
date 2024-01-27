<template>
    <div class="container">
        <div>
            <h1>Add {{ note.name }}</h1>
        </div>

        <div class="flex flex-col">
            <form @submit.prevent="submitForm">
                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Name</label>
                    <input type="text" class="w-full py-0 px-4 font-semibold" v-model="note.name">
                </div>
                    
                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Body</label>
                    <textarea class="w-full py-0 px-4 font-semibold" v-model="note.body"></textarea>
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

let note = reactive ({})

onMounted(() => {
    getNote()
})

const getNote = async () => {
    store.setIsLoading(true)
    const clientID = route.params.id
    const noteID = route.params.note_id
    await axios
            .get(`/api/v1/notes/${noteID}/?=client_id=${clientID}`)
            .then(response => {
                console.log(response.data)
                Object.assign(note, response.data)
            })
    store.setIsLoading(false)
}

const submitForm = async () => {
    store.setIsLoading(true)
    const clientID = route.params.id
    await axios.patch(`/api/v1/notes/${note.id}/?=client_id=${clientID}`, note)
        .then(response => {
            console.log(response)
            router.push({name: 'ClientDetailsView', params: {id: route.params.id}})
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
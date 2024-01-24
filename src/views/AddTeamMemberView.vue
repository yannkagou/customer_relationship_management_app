<template>
    <div class="m-auto w-1/2">
            <div class="pt-16">
                <h1 class="text-2xl font-bold mb-5">Add Member</h1>
                <form @submit.prevent="submitForm">

                    <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                        <label class="w-full">Username</label>
                        <input type="text" class="w-full py-0 px-4 font-semibold" v-model="username">
                    </div>

                    <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                        <label class="w-full">Password</label>
                        <input type="password" class="w-full py-0 px-4 font-semibold" v-model="password">
                    </div>

                    <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                        <label class="w-full">Repeat Password</label>
                        <input type="password" class="w-full py-0 px-4 font-semibold" v-model="password2">
                    </div>

                    <div class="bg-red-500 w-11/12 mx-auto my-2 flex flex-col items-center errors py-2" v-if="errors.length">
                        <p v-for="error in errors" :key="error" class="w-full py-0 px-4 font-semibold text-white">{{ error }}</p>
                    </div>

                    <div class="mt-2">
                        <button class="">Add</button>
                    </div>

                </form>
            </div>
    </div>
</template>

<script setup>
import axios  from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

const router = useRouter()

let username = ref('')
let password = ref('')
let password2 = ref('')

let errors = ref([])

onMounted(() => {
    document.title = 'Sign Up | CRM'
})

function submitForm() {
    errors.value = []
    if (username.value === ''){
        errors.value.push('The username is missing')
    }
    if (password.value === ''){
        errors.value.push('The password is missing')
    }
    if (password2.value === ''){
        errors.value.push('The password is missing')
    }
    if (password.value !== password2.value){
        errors.value.push('The password doesn\'t match')
    }

    if (!errors.value.length) {
        const formData = {
            email: username.value,
        }

        axios
            .post('/api/v1/teams/add_member', formData)
            .then(response => {
                router.push('/team')
                toast.success('Member was added')
            })
            .catch(error => {
                if (error.response){
                    for (const property in error.response.data){
                        errors.value.push(`${property}: ${error.response.data[property]}`)
                    }
                    console.log(JSON.stringify(error.response.data))
                } else if (error.message) {
                    errors.value.push('Something went wrong. Please try again')
                    console.log(JSON.stringify(error))
                }
            })
    }
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
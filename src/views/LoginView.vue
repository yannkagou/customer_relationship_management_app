<template>
    <div class="m-auto w-1/2">
        <div class="pt-16">
            <h1 class="text-2xl font-bold mb-5">Log In</h1>
            <form @submit.prevent="submitForm">
  
                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Username</label>
                    <input type="text" class="w-full py-0 px-4 font-semibold" v-model="username">
                </div>
                    
                <div class="text-green-400 w-11/12 mx-auto my-2 flex flex-col items-center">
                    <label class="w-full">Password</label>
                    <input type="password" class="w-full py-0 px-4 font-semibold" v-model="password">
                </div>

                <div class="bg-red-500 w-11/12 mx-auto my-2 flex flex-col items-center errors py-2" v-if="errors.length">
                    <p v-for="error in errors" :key="error" class="w-full py-0 px-4 font-semibold text-white">{{ error }}</p>
                </div>

                <div class="mt-2">
                    <button class="">Log In</button>
                </div>

                <hr class="mb-3">

                <p class="lg:text-2xl">Or <span class="text-green-400"><router-link to="/signup">click here</router-link></span> to sign up!</p>

            </form>
        </div>
    </div>
</template>

<script setup>
import axios  from 'axios';
import { useCmrStore } from '../stores/index';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const toast = useToast();

const store = useCmrStore();
const router = useRouter()

let username = ref('')
let password = ref('')

let errors = ref([])

onBeforeMount(() => {
  store.initializeStore();
})


onMounted(() => {
    document.title = 'Log In | CMR'
})

async function submitForm() {
    errors.value = []
    if (username.value === ''){
        errors.value.push('The username is missing')
    }
    if (password.value === ''){
        errors.value.push('The password is missing')
    }
    if (!errors.value.length) {

        store.setIsLoading(true)

        axios.defaults.headers.common['Authorization'] = ''
        localStorage.removeItem('cmr_token')

        const formData = {
            username: username.value,
            password: password.value
        }

        await axios
                .post('/api/v1/token/login/', formData)
                .then(response => {
                    const token = response.data.auth_token
                    store.setToken(token)
                    axios.defaults.headers.common['Authorization'] = 'Token' + token
                    localStorage.setItem('cmr_token', token)
                })
                .catch(error => {
                    if (error.response){
                        for (const property in error.response.data){
                            errors.value.push(`${property}: ${error.response.data[property]}`)
                        }
                        console.log(JSON.stringify(error.response.data))
                    } else if (error.message) {
                        errors.value.push('Something went wrong. Please try again')
                        console.log(error.message)
                        console.log(JSON.stringify(error))
                    }
                })
        
        await axios
                .get('/api/v1/users/me')
                .then(response => {
                    store.setUser({
                        'id': response.data.id,
                        'username': response.data.username
                    })
                    localStorage.setItem('username', response.data.username)
                    localStorage.setItem('userid', response.data.id)

                    router.push('/account')
                    toast.success("Successfully Login!")
                })
                .catch(error => {
                    console.log(error)
                })

        store.setIsLoading(false)
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
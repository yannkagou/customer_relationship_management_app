<template>
    <div class="container">
        <div>
            <h1>{{team.name}}</h1>

            <hr>

            <p><strong>Plan:</strong>{{ store.team.plan }}</p>
            <p><strong>Max leads:</strong>{{ store.team.max_leads }}</p>
            <p><strong>Max clients:</strong>{{ store.team.max_clients }}</p>

            <p>
                <RouterLink :to="{'name': 'plans'}">Change plan</RouterLink>
            </p>
            <hr>

            <template v-if="team.created_by.id == store.user.id">
                <RouterLink :to="{'name': 'addMember'}" class="button">Add member</RouterLink>    
            </template>
            
        </div>
        <div>
            <h2>Members</h2>
            <table class="w-full table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Full name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="member in team.members" :key="member.id">
                        <td>{{ member.username }}</td>
                        <td>{{ member.first_name }} {{ member.first_name }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        

    </div>
</template>

<script setup>
import axios from 'axios';
import { onBeforeMount, onMounted, reactive } from 'vue';
import { useCmrStore } from '../stores/index';

const store = useCmrStore();

onBeforeMount(() => {
  store.initializeStore();
})

let team = reactive({
    members: [],
    created_by: {}
})

onMounted(async () => {
    getTeam();
})

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

</script>

<style lang="scss" scoped>

</style>
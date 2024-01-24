<template>
    <div class="container">
        <div>
            <h1>{{team.name}}</h1>

            <template v-if="team.created_by.id == store.user.id">
                <RouterLink :to="{'name': 'addMember'}" class="button">Add member</RouterLink>    
            </template>
            
        </div>
        <div>
            <h2>Members</h2>
            <table class="w-full table">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="member in team.members" :key="member.id">
                        <td>{{ member.username }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        

    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue';


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
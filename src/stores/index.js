import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCmrStore = defineStore({
    id: 'cmr',

    state: () => ({
        user: {
           id : 0,
           username: ''
        },
        team: {
            id: 0,
            name: '',
            plan: '',
            max_leads: 0,
            max_clients: 0,
        },
        isAuthenticated: false,
        token: null,
        isLoading: false
    }),
    

    actions: {
        initializeStore() {
            // console.log('initStore', localStorage.getItem('cart'))

            // if (localStorage.getItem('cart')) {
            //     this.cart = JSON.parse(localStorage.getItem('cart'));
            // } else{
            //     localStorage.setItem('cart', JSON.stringify(this.cart))
            // }

            if (localStorage.getItem('cmr_token')){
                this.token = localStorage.getItem('cmr_token')
                this.isAuthenticated = true
                this.user.id = localStorage.getItem('userid')
                this.user.username = localStorage.getItem('username')
                this.team.id = localStorage.getItem('team_id')
                this.team.name = localStorage.getItem('team_name')
                this.team.plan = localStorage.getItem('team_plan')
                this.team.max_leads = localStorage.getItem('team_max_leads')
                this.team.max_clients = localStorage.getItem('team_max_clients')
            } else {
                this.token = '',
                this.isAuthenticated = false
                this.user.id = 0
                this.user.username = ''
                this.team.id = 0
                this.team.name = ''
                this.team.plan = ''
                this.team.max_leads = 0
                this.team.max_clients = 0
            }
        },

        
        setIsLoading(status){
            this.isLoading = status
        },

        setToken(token) {
            this.token = token,
            this.isAuthenticated = true
            // console.log(this.token)
        },
        removeToken() {
            this.token = '',
            this.isAuthenticated = false
        },
        setUser(user) {
            this.user = user
        },
        setTeam(team) {
            this.team = team

            localStorage.setItem('team_id', team.id)
            localStorage.setItem('team_name', team.name)
            localStorage.setItem('team_plan', team.plan)
            localStorage.setItem('team_max_leads', team.max_leads)
            localStorage.setItem('team_max_clients', team.max_clients)
        }
    }
})
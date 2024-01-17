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
            } else {
                this.token = '',
                this.isAuthenticated = false
                this.user.id = 0
                this.user.username = ''
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
        }
    }
})
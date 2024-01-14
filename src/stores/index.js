import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCmrStore = defineStore({
    id: 'cmr',

    state: () => ({
        lead: {
           clients : []
        },
        isAuthenticated: false,
        token:'',
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
                this.token = localStorage.getItem('cmr_token'),
                this.isAuthenticated = true
            } else [
                this.token = '',
                this.isAuthenticated = false
            ]
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
    }
})
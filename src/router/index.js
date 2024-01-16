import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import HomeView from '../views/HomeView.vue'
import AccountView from '../views/AccountView.vue'
import LeadsView from '../views/LeadsView.vue'
import LeadDetailsView from '../views/LeadDetailsView.vue'
import EditLeadView from '../views/EditLeadView.vue'
import AddLeadsView from '../views/AddLeadsView.vue'

import { useCmrStore } from '../stores/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView
    },
    {
      path: '/leads',
      name: 'leads',
      component: LeadsView,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/leads/add',
      name: 'addLead',
      component: AddLeadsView,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/leads/:id',
      name: 'leadDetails',
      component: LeadDetailsView,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/leads/:id/edit',
      name: 'editLead',
      component: EditLeadView,
      meta: {
        requireLogin: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !useCmrStore().isAuthenticated){
    next({name: 'login', query: {to: to.path} });
  } else {
    next()
  }
})

export default router

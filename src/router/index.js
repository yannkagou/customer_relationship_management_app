import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import HomeView from '../views/HomeView.vue'
import AccountView from '../views/AccountView.vue'
import LeadsView from '../views/LeadsView.vue'
import LeadDetailsView from '../views/LeadDetailsView.vue'
import EditLeadView from '../views/EditLeadView.vue'
import AddLeadsView from '../views/AddLeadsView.vue'
import AddTeamsView from '../views/AddTeamsView.vue'
import TeamView from '../views/TeamView.vue'
import AddTeamMemberView from '../views/AddTeamMemberView.vue'
import ClientsView from '../views/ClientsView.vue'
import AddClientView from '../views/AddClientView.vue'
import ClientDetailsView from '../views/ClientDetailsView.vue'
import EditClientView from '../views/EditClientView.vue'
import AddNoteView from '../views/AddNoteView.vue'
import EditNoteView from '../views/EditNoteView.vue'
import EditMemberView from '../views/EditMemberView.vue'
import PlansView from '../views/PlansView.vue'
import PlansThankyouView from '../views/PlansThankyouView.vue'

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
    },
    {
      path: '/team/add-team',
      name: 'addTeam',
      component: AddTeamsView,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/team',
      name: 'team',
      component: TeamView,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/team/add-member',
      name: 'addMember',
      component: AddTeamMemberView,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/clients',
      name: 'clients',
      component: ClientsView,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/clients/add',
      name: 'addClient',
      component: AddClientView,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/client/:id',
      name: 'clientDetails',
      component: ClientDetailsView,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/clients/:id/edit',
      name: 'editClient',
      component: EditClientView,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/clients/:id/add-note',
      name: 'addNote',
      component: AddNoteView,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/clients/:id/edit-note/:note_id',
      name: 'editNote',
      component: EditNoteView,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/teams/edit-member/:id',
      name: 'editMember',
      component: EditMemberView,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/teams/plans',
      name: 'plans',
      component: PlansView,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/teams/plans/thankyou',
      name: 'thankyou',
      component: PlansThankyouView,
      meta: {
        requireLogin: true
      }
    },
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

import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import DetailTournament from '@/pages/DetailTournament.vue'
import TournamentControl from '@/pages/TournamentControl.vue'
import AddTournament from '@/pages/AddTournament.vue'
import UpdateTournament from '@/pages/UpdateTournament.vue'
import AddParticipents from '@/pages/AddParticipents.vue'
import AddResult from '@/pages/AddResult.vue'
import Result from '@/pages/Result.vue'
import TournamentReport from '@/pages/TournamentReport.vue'

const authGuard = function(to, from, next) {
  const isAuthorized = localStorage.hasOwnProperty('token') & localStorage.getItem('token') !== 'null';
  if (!isAuthorized) next({name: "login"});
  else next()
}

const adminGuard = function(to, from, next) {
  const isNotCommon = localStorage.hasOwnProperty('token') & localStorage.getItem('userRole') !== 'user_common'
  if (!isNotCommon) {
    alert("У вас нет доступа к этой странице")
    next({name: "home"})
  } else next()
}

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    beforeEnter: authGuard
  },
  
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },

  {
    path: "/tournament/:id",
    name: "select_tournament",
    component: DetailTournament,
    beforeEnter: authGuard
  },

  {
    path: "/tournament/control",
    name: "tournament_control",
    component: TournamentControl,
    beforeEnter: adminGuard
  },

  {
    path: "/tournament/add",
    name: "tournament_add",
    component: AddTournament,
    beforeEnter: adminGuard
  },

  {
    path: "/tournament/update/:id",
    name: "tournament_update",
    component: UpdateTournament,
    beforeEnter: adminGuard
  },

  {
    path: "/tournament/part/add/:id",
    name: "part_add",
    component: AddParticipents,
    beforeEnter: authGuard
  },

  {
    path: "/tournament/result/add/:id",
    name: "result_add",
    component: AddResult,
    beforeEnter: adminGuard
  },

  {
    path: "/tournament/result/view/:id",
    name: "result",
    component: Result,
    beforeEnter: authGuard
  },

  {
    path: "/tournament/report",
    name: "sec_report",
    component: TournamentReport,
    beforeEnter: authGuard
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

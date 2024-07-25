import Vue from 'vue'
import VueRouter from 'vue-router'
import BaseView from '../views/View.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import UserView from '../views/UserView.vue'
import StatsView from '../views/StatsView.vue'
import LawList from '../views/LawOrder/ListView.vue'
import LawDetail from '../views/LawOrder/DetailView.vue'
import LawEdit from '../views/LawOrder/EditView.vue'
import LawCreate from '../views/LawOrder/CreateView.vue'
import PriceList from '../views/Price/ListView.vue'
import PriceDetail from '../views/Price/DetailView.vue'
import PriceEdit from '../views/Price/EditView.vue'
import PriceCreate from '../views/Price/CreateView.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/user', name: 'user', component: UserView },
  { path: '/stats', name: 'stats', component: StatsView },
  { path: '/law', component: BaseView, children: [
    { path: '', name: 'law_list', component: LawList },
    { path: ':id', name: 'law_detail', component: LawDetail },
    { path: ':id/edit', name: 'law_edit', component: LawEdit },
    { path: 'create', name: 'law_create', component: LawCreate },
  ]},
  { path: '/price', component: BaseView, children: [
    { path: '', name: 'price_list', component: PriceList },
    { path: ':id', name: 'price_detail', component: PriceDetail },
    { path: ':id/edit', name: 'price_edit', component: PriceEdit },
    { path: 'create', name: 'price_create', component: PriceCreate },
  ]},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } 
    if (to.hash) {
      return { selector: to.hash, behavior: 'smooth', offset: { x: 0, y: 0 } }
    }
    return { x: 0, y: 0 }
  }
})

export default router

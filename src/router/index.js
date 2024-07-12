import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import UserView from '../views/UserView.vue'
import DetailView from '../views/DetailView.vue'
import EditView from '../views/EditView.vue'
import CreateView from '../views/CreateView.vue'
import StatsView from '../views/StatsView.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/user', name: 'user', component: UserView },
  { path: '/detail', name: 'detail', component: DetailView },
  { path: '/edit', name: 'edit', component: EditView },
  { path: '/create', name: 'create', component: CreateView },
  { path: '/stats', name: 'stats', component: StatsView },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

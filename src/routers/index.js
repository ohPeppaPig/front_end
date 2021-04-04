import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@views/dashboard.vue'
import Clustering from '@views/clustering.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/clustering',
      name: 'Clustering',
      component: Clustering
    },
  ]
})

export default router

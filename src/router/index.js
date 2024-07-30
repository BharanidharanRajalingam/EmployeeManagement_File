import { createRouter, createWebHistory } from 'vue-router'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import AdditionalInformation from '@/views/AdditionalInformation.vue'
import Layout from '@/components/Layout/Header.vue'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: "/",
      redirect: "/login",
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,

    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Layout',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/Layout',
          name: 'Home',
          component: Home,
        },
        {
          path: '/AdditionalInformation',
          name: 'AdditionalInformation',
          component: AdditionalInformation,
        },
      ]
    },
  ]
})

export default router

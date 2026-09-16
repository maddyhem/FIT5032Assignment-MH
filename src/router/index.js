import { createRouter, createWebHistory } from 'vue-router'
import AboutPage from '@/views/AboutPage.vue'  
import EventsPage from '@/views/EventsPage.vue'
import MainPage from '@/views/MainPage.vue'
import SignupLoginPage from '@/views/SignupLoginPage.vue' 
import UserProfile from '@/views/UserProfile.vue'

const routes = [
    {
    path: '/', 
    redirect: '/main' 
    },
    {
        path: '/main',
        name: 'Mainpage',
        component: MainPage
    },
    {
        path: '/about',
        name: 'About',
        component: AboutPage
    },
    {
        path: '/events',
        name: 'Events',
        component: EventsPage
    },
    {
        path: '/signuplogin',
        name: 'SignupLogin',
        component: SignupLoginPage
    },
    {
        path: '/userprofile',
        name: 'Profile',
        component: UserProfile
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
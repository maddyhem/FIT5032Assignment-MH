import { createRouter, createWebHistory } from 'vue-router'
import AboutPage from '@/views/AboutPage.vue'  
import EventsPage from '@/views/EventsPage.vue'
import MainPage from '@/views/MainPage.vue'
import SignupLoginPage from '@/views/SignupLoginPage.vue' 
import UserProfile from '@/views/UserProfile.vue'
import SendEmailView from '@/views/SendEmailView.vue'
import FindOpShops from '@/views/FindOpShops.vue'
import UpcycleHubView from '@/views/UpcycleHubView.vue'

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
    {
        path: '/sendemail',
        name: 'SendEmail',
        component: SendEmailView
    },
    {
        path: '/findopshops',
        name: 'FindOpShops',
        component: FindOpShops
    },
    {
        path: '/upcyclehub',
        name: 'UpcycleHub',
        component: UpcycleHubView
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
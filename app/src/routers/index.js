import { createRouter, createWebHistory } from 'vue-router'
import { auth, redirectIfAuthenticated } from '../middlewares/guard';
import  AdminLayout  from '../layouts/AdminLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import Home from '../views/home/home.vue'
import  Login from '../views/login/login.vue'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes:[
        {
            path:'/login', 
            beforeEnter:redirectIfAuthenticated,
            component:AuthLayout,
            children: [
                { path:'', name:'login', component:Login }
            ]
        },
        {
            path: '/',
            component:AdminLayout,
            beforeEnter:auth,
            children: [
                { path:'', name:'home', component:Home }
            ]
        }
    ]

});
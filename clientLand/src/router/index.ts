import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            // component: () => import('../views/AboutView.vue')
            component: () => import('@/views/AboutView.vue')
        },
        {
            path: '/product/:productId',
            name: 'ProductDetail',
            component: ProductView,
        },
        {
            path: '/products/:type',
            name: 'ProductsByType',
            component: HomeView,
        },
        {
            path: '/products/:type/:category',
            name: 'ProductsByCategory',
            component: HomeView,
        },
        {
            path: '/myOrders',
            name: 'Order',
            component: () => import('@/views/orderView.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/LoginView.vue')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/views/RegisterView.vue')
        },
        {
            path: '/forget',
            name: 'Forget',
            component: () => import('@/views/ForgetView.vue')
        },
        {
            path: '/reset/:token',
            name: 'Reset',
            component: () => import('@/views/ResetView.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: () => import('@/views/404.vue')
        },
    ]
})

export default router

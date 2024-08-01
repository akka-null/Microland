// import  pinia  from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import { authStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'


// import ProductDetailView from '../views/ProductView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView
        },
        {
            path: '/test',
            name: 'Test',
            component: () => import('@/views/TestView.vue')
        },
        {
            path: '/add-product',
            name: 'AddProduct',
            component: () => import('@/views/AddProductView.vue')
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
            component: () => import('@/views/ProductDetailView.vue')
        },
        {
            path: '/products/:type',
            name: 'ProductsByType',
            component: () => import('@/views/ProductView.vue')
        },
        {
            path: '/products/:type/:category',
            name: 'ProductsByCategory',
            component: () => import('@/views/ProductView.vue')
        },
        {
            path: '/myOrders',
            name: 'Order',
            component: () => import('@/views/OrderView.vue')
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
            path: '/email/:token',
            name: 'Confirm',
            component: () => import('@/views/ConfirmView.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: () => import('@/views/404.vue')
        }
    ]
})

router.beforeEach( (to) => {
    const auth = authStore();

    if (to.name === 'AddProduct' &&
        (!auth.user || !auth.user.admin)) {
            return { name: 'Home' };
        }
});

export default router

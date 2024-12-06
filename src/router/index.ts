import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:page?',
            name: 'List',
            component: () => import('../views/ListView.vue'),
        },
        {
            path: '/favourite',
            name: 'FavouriteList',
            component: () => import('../views/FavouriteView.vue'),
        },
    ],
})

export default router

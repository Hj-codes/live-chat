import { useUserStore } from '@/stores/userStore';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import ChatRoom from '@/views/ChatRoom.vue';
import SignUp from '@/views/SignUp.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: Home,
        name : 'home',
    },
    {
        path: '/signup',
        component: SignUp,
        name : 'signup',
    },
    {
        path: '/login',
        component: Login,
        name : 'login',
    },
    {
        path: '/chatroom',
        component: ChatRoom,
        name : 'chat',
        meta: {requiresAuth: true},
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    if (to.meta.requiresAuth && !userStore.user) {
        next({name: 'login'});
    } else {
        next();
    }
});

export { router };
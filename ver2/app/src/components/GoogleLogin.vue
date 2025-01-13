<script setup>
import { useUserStore } from '../stores/userStore.js';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const handleLogin = async () => {
    try {
        await userStore.googleLogin();
        if (!userStore.error) {
            console.log('Login successful');
            await router.push('/chatroom');
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
};

</script>

<template>
    <div>
        <button @click="handleLogin">Login with Google</button>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const logout = async() => {
    try {
        await userStore.logout();
        if (!userStore.error) {
            await router.push('/login');
        }
        else {
            console.log('Logout failed');
        }
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

</script>

<template>
    <button @click="logout" :disabled="userStore.loading">Log Out</button>
</template>
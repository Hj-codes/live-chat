<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import LogOut from '@/components/LogOut.vue';

const router = useRouter();
const userStore = useUserStore();

onMounted( async () => {
    if (userStore.user) {
        await router.push('/chatroom');
    } else {
        await router.push('/login');
    }
});


</script>

<template>
<nav>
    <h1> Welcome to the Live Chat App </h1>
    <RouterLink to="/login">Login</RouterLink>
    <RouterLink to="/chatroom">Chat Room</RouterLink>
    <LogOut v-show="userStore.user"/>
</nav>
<main>
    <RouterView />
</main>
</template>

<style scoped>
nav, main {
  border: 2px solid #000;
  margin-bottom: 10px;
  padding: 10px;
}

nav > a + a {
  margin-left: 10px;
}

</style>


<script setup>
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import GoogleLogin from '@/components/GoogleLogin.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const userStore = useUserStore();

const login = async () => {
    try {
        await userStore.login(email.value, password.value);
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
    <div class="login-container">
        <h1>Login</h1>
        <form action="" @submit.prevent="login">
            <div class="form">
                <input type="email" id="email" v-model="email" placeholder="Email" required>
            </div>
            <div class="form">
                <input type="password" id="password" v-model="password" placeholder="Password" required>
            </div>
            <button type="submit" :disabled="userStore.loading">Login</button>
            <p v-if="userStore.error">{{ userStore.error }}</p>
        </form>        
        <GoogleLogin />
    </div>
</template>
<style scoped>
button {
    background-color: #4c81af;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
}
button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>
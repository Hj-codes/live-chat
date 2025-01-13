<script setup>
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const userStore = useUserStore();
const email = ref('');
const password = ref('');

const signUp = async () => {
    try {
        await userStore.signUp(email.value, password.value);
        if (!userStore.error) {
            await router.push('/chatroom');
        }
    } catch (error) {
        console.error('Sign up failed:', error);
    }
};

</script>

<template>
    <div>
        <h2>Sign Up</h2>
        <form @submit.prevent="signUp">
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit" :disabled="userStore.loading">Sign Up</button>
            <p v-if="userStore.error">{{ userStore.error }}</p>
        </form>
    </div>
</template>

<style scoped>
button {
    background-color: #af6a4c;
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
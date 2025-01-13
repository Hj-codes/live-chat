<script setup>
    import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
    import { db, auth } from '@/firebase';
    import { ref, onMounted } from 'vue';

    const messages = ref([]);
    const newMessage = ref('');

    onMounted(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
        onSnapshot(q, (snapshot) => {
            messages.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        });
    });

    const sendMessage = async () => {
        if (!newMessage.value.trim()) return;
        try {
            await addDoc(collection(db, 'messages'), {
                user: auth.currentUser.email,
                text: newMessage.value,
                timestamp: new Date(),
            });
        } catch (error) {
            console.error('Error adding document: ', error);
        }

        newMessage.value = '';
    };

</script>

<template>
  <div>
    <h2>Live Chat</h2>
    <div v-for="message in messages" :key="message.id">
      <strong>{{ message.user }}:</strong> {{ message.text }}
    </div>
    <form @submit.prevent="sendMessage">
      <input v-model="newMessage" placeholder="Type a message..." required />
      <button type="submit">Send</button>
    </form>
  </div>
</template>
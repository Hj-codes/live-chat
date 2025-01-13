import { auth, googleProvider, signInWithPopup, signOut } from '@/firebase';
import { setPersistence, browserSessionPersistence, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        loading: false,
        error: null,
    }),
    actions: {
        async login(email, password) {
            this.loading = true;
            await setPersistence(auth, browserSessionPersistence);
            try {
                this.error = null;
                const user = await signInWithEmailAndPassword(auth, email, password);
                this.user = user;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        
        async googleLogin() {
            this.loading = true;
            await setPersistence(auth, browserSessionPersistence);
            try {
                this.error = null;
                const user = await signInWithPopup(auth, googleProvider);
                this.user = user;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        
        async logout() {
            this.loading = true;
            try {
                this.error = null;
                await signOut(auth);
                this.user = null;
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },

        const monitorAuthState = (store) => {
            onAuthStateChanged(auth, (user) => {
              store.user = user ? user : null;
            });
        };
    },
});
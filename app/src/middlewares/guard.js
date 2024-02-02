import { defineStore } from 'pinia';
import { useAuthStore } from '../stores/auth';
import Cookie from '../services/cookies';

export const auth = async (to, from, next) => {
    const authStore = useAuthStore();

    const token = Cookie.getToken();
    const authorized = await authStore.isLogged();

    //if (!token || (authorized === null || authorized === 401)) {
    if (!token) {   
        // Remove o token (se necessário)
         Cookie.deleteToken();
        // Redireciona para a página de login
        next({ name: 'login' });
        
    } else {
        next();
    }
}

export const redirectIfAuthenticated = (to, from, next) => {
    const authStore = useAuthStore();

    const token = Cookie.getToken();

    if (token && authStore.isLogged()) {
        next({ name: 'home' });
    } else {
       
        next();
    } 
}

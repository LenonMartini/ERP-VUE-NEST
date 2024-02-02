<script setup>
  import { ref } from 'vue';
  import './styles/style.css';
  import NavBar from '../components/NavBar.vue';
 
  import { useAuthStore } from '../stores/auth';

  const auth = useAuthStore();
  

  const isTheme = ref(auth?.settings?.layout);


  const toggleTheme = () => {
    isTheme.value = !isTheme.value;
    updateBodyClass();
  };

  const updateBodyClass = () => {
    const body = document.body;
    body.classList.toggle('dark-theme', isTheme.value);
    body.classList.toggle('light-theme', !isTheme.value);
  };

  // Chame updateBodyClass ao montar o componente para garantir que a classe do corpo seja inicializada corretamente
  updateBodyClass();
</script>
<template>
    <main>
        <NavBar />
       
        <router-view></router-view>
    </main>
</template>
<script setup>
import { ref } from 'vue';
import './styles/style.css';

const isTheme = ref(true);


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
        <router-view></router-view>
    </main>
</template>
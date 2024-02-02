<script setup>
import { ref } from 'vue';

const props = defineProps(['message']);
const message = ref(props.message || '');

</script>
<template>
    <div class="container">
        <!-- Se isLoading for verdadeiro, exiba o indicador de loading -->
        <div class="loading-indicator">
            <div class="spinner"></div>
            <span class="text-loading">{{ message }}</span>
        </div>

    <!-- Resto do conteúdo do seu componente -->
    </div>

</template>
<style scoped>
.loading-indicator {
  position: absolute; /* Alteração para position absolute */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: var(--bs-danger);
  background-color: rgba(0, 0, 0, 0.742);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  z-index: 1000; /* Ajuste o z-index para garantir que fique sobreposto */
}

.spinner {
  border: 6px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 6px solid var(--bs-danger);
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  
}

.text-loading {
  margin-top: 3px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
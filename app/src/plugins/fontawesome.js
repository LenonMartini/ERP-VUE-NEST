// fontawesome.js
import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const app = createApp();
app.component('font-awesome-icon', FontAwesomeIcon);
app.config.globalProperties.$icons = { coffee: faCoffee };

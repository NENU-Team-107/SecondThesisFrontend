import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import router from './router';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faLocation, faPeopleGroup, faPrint, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(faLocation, faPeopleGroup, faPrint, faRightFromBracket);

createApp(App).use(router).use(ElementPlus).component('font-awesome-icon', FontAwesomeIcon).use(pinia).mount('#app');

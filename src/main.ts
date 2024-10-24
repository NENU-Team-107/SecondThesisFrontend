import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
zhCn.el.pagination.total = '共 {total} 条';
zhCn.el.pagination.pagesize = '条/页';
zhCn.el.pagination.goto = '前往';
zhCn.el.pagination.pageClassifier = '页';

import router from './router';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import {
  faLocation,
  faPeopleGroup,
  faCheck,
  faHand,
  faUser,
  faRightFromBracket,
  faHouse,
  faClipboard,
  faClock,
  faIdCard,
  faShuffle,
  faRotate,
  faUserTie,
  faUserGraduate,
  faList,
  faPlus,
  faMagnifyingGlassPlus,
  faCircleCheck,
  faCircleXmark,
  faFile,
} from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(
  faLocation,
  faPeopleGroup,
  faCheck,
  faHand,
  faUser,
  faRightFromBracket,
  faHouse,
  faClipboard,
  faClock,
  faIdCard,
  faShuffle,
  faRotate,
  faUserTie,
  faUserGraduate,
  faList,
  faPlus,
  faMagnifyingGlassPlus,
  faCircleCheck,
  faCircleXmark,
  faFile,
);

createApp(App).use(pinia).use(router).use(ElementPlus, { locale: zhCn }).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
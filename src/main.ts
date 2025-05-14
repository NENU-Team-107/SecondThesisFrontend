import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import router from "./router";

import App from "./App.vue";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
zhCn.el.pagination.total = "共 {total} 条";
zhCn.el.pagination.pagesize = "条/页";
zhCn.el.pagination.goto = "前往";
zhCn.el.pagination.pageClassifier = "页";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faCheck,
  faCircleCheck,
  faCircleXmark,
  faClipboard,
  faClock,
  faFile,
  faHand,
  faHouse,
  faIdCard,
  faList,
  faLocation,
  faMagnifyingGlass,
  faMagnifyingGlassPlus,
  faPeopleGroup,
  faPlus,
  faQuestionCircle,
  faRightFromBracket,
  faRotate,
  faShuffle,
  faUser,
  faUserGraduate,
  faUserTie,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

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
  faXmark,
  faFile,
  faQuestionCircle,
  faMagnifyingGlass,
);

createApp(App)
  .use(pinia)
  .use(router)
  .use(ElementPlus, { locale: zhCn })
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

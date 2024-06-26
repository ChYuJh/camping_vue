import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
createApp(App)
  .use(router)
  .use(ElementPlus, { size: "small", zIndex: 3000 })
  .mount("#app");

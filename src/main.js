import "./assets/main.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import Notifications from "@kyvg/vue3-notification";
import router from "./router";
const app = createApp(App);

app.use(createPinia());
app.use(Notifications);
app.use(router);

app.mount("#app");

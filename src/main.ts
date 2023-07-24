// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "@/style.css";
import router from "@/router";
import { getInitialData } from "./utils/utils";
import { myStore } from "./store";

const app = createApp(App);
const pinia = createPinia();
const store = myStore(pinia);
app.use(router);
app.use(pinia);

getInitialData().then((res) => (store.originalData = res));

app.mount("#app");

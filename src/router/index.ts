// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import PokemonView from "@/views/PokemonDetailView.vue";
import PokemonListView from "@/views/PokemonListView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/pokemons/:page",
    name: "PokemonListView",
    component: PokemonListView,
  },
  {
    path: "/PokemonView/:id",
    name: "PokemonView",
    component: PokemonView,
  },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddMuebleView from "../views/AddMuebleView.vue"; 


const routes = [
  { path: "/", component: HomeView },
  { path: "/agregar", component: AddMuebleView },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

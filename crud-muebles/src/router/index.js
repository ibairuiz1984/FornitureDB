import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddMuebleView from "../views/AddMuebleView.vue"; 
import ContactView from "@/views/ContactView.vue";


const routes = [
  { path: "/", component: HomeView },
  { path: "/agregar", component: AddMuebleView },
  { path: "/contacto", component: ContactView },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomeView from "../views/HomeView.vue";
import AddMuebleView from "../views/AddMuebleView.vue";
import ContactView from "@/views/ContactView.vue";
import LoginView from "@/views/LoginView.vue";
import ProcesoView from "@/views/ProcesoView.vue";


const routes = [
  { path: "/", component: HomeView },
  { path: "/contacto", component: ContactView },
  { path: "/proceso", component: ProcesoView },
  { path: "/login", component: LoginView },
  {
    path: "/agregar",
    component: AddMuebleView,
    meta: { requiresAuth: true },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Proteger rutas
router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  onAuthStateChanged(auth, user => {
    if (requiresAuth && !user) {
      next("/login"); // Si no está autenticado, redirige al login
    } else {
      next();
    }
  });
});

export default router;

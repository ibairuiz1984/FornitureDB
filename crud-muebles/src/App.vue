<template>
  <div>
    <!-- Pasamos el filtro al NavBar mediante props o usamos el evento para actualizarlo -->
    <NavBar :muebles="muebles" @buscarPorTag="actualizarFiltro" />
    <!-- Aquí usamos un componente que mostrará la lista filtrada.
         Este componente inyectará la variable reactiva 'mueblesFiltrados' -->
    <HomeView />
  </div>
</template>

<script>
import { ref, computed, onMounted, provide } from "vue";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import NavBar from "./components/NavBar.vue";
import HomeView from "./views/HomeView.vue";

export default {
  name: "App",
  components: { NavBar, HomeView },
  setup() {
    // Lista completa de muebles (reactiva)
    const muebles = ref([]);
    // Filtro actual, puede ser una categoría o cadena vacía
    const filtro = ref("");

    // Cargar los muebles desde Firebase
    const cargarMuebles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "muebles"));
        muebles.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error al obtener los muebles:", error);
      }
    };

    onMounted(cargarMuebles);

    // Propiedad computada para filtrar los muebles en base al filtro actual
    const mueblesFiltrados = computed(() => {
      if (!filtro.value) return muebles.value;
      return muebles.value.filter((mueble) =>
        mueble.tag.toLowerCase().includes(filtro.value.toLowerCase())
      );
    });

    // Función para actualizar el filtro cuando se emite el evento desde NavBar
    const actualizarFiltro = (tag) => {
      filtro.value = tag;
    };

    // Proveer la lista filtrada para que otros componentes la usen
    provide("mueblesFiltrados", mueblesFiltrados);

    return { muebles, actualizarFiltro };
  },
};
</script>

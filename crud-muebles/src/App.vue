<template>
  <div>
    <NavBar :muebles="muebles" @buscarPorTag="filtrarPorCategoria" />
    <router-view />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { db } from "@/firebase"; // Asegúrate de importar correctamente Firebase
import { collection, getDocs } from "firebase/firestore";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: { NavBar },
  setup() {
    const muebles = ref([]); // Guarda los muebles desde Firebase
    const mueblesOriginales = ref([]); // Para restaurar la lista tras filtrar

    // Función para cargar los datos desde Firebase
    const cargarMuebles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "muebles"));
        const datos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        muebles.value = datos;
        mueblesOriginales.value = datos; // Guarda la lista completa
      } catch (error) {
        console.error("Error al obtener los muebles:", error);
      }
    };

    // Función para filtrar los muebles por categoría (tag)
    const filtrarPorCategoria = (tag) => {
      if (!tag) {
        muebles.value = mueblesOriginales.value; // Restaura todos los muebles si no hay búsqueda
        return;
      }
      muebles.value = mueblesOriginales.value.filter((mueble) =>
        mueble.tag.toLowerCase().includes(tag.toLowerCase())
      );
    };

    onMounted(cargarMuebles);

    return { muebles, filtrarPorCategoria };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

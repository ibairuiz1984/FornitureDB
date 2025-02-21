<template>
  <div>
    <!-- Encabezado introductorio -->
    <header class="site-header">
      <div class="header-container">
        <img
          :src="require('@/assets/img/logo.png')"
          alt="Logo"
          class="header-logo"
        />
        <div class="header-text">
          <h1 class="site-name">Restauración & Conservación</h1>
          <p class="tagline">
            Nos dedicamos a restaurar y dar nueva vida a muebles y otros
            elementos de decoración. Fusionamos tradición y modernidad para
            transformar espacios en lugares únicos y llenos de historia.
          </p>
          <p class="tagline">
            Altzariak eta dekorazioko beste elementu batzuk zaharberritzen eta
            bizitza berria ematen aritzen gara. Tradizioa eta modernitatea
            uztartzen ditugu, espazioak leku paregabe eta historiaz beteak
            bihurtzeko.
          </p>
        </div>
      </div>
    </header>

    <!-- Filtros de búsqueda y categorías -->
    <div class="container mt-4">
      <div class="row mb-3">
        <div class="col-md-6">
          <select v-model="categoriaSeleccionada" class="form-control">
            <option value="">Todas las categorías</option>
            <option
              v-for="categoria in categorias"
              :key="categoria"
              :value="categoria"
            >
              {{ categoria }}
            </option>
          </select>
        </div>
      </div>

      <!-- Listado de muebles -->
      <div
        v-if="mueblesFiltrados.length === 0"
        class="alert alert-warning text-center"
      >
        No hay muebles disponibles.
      </div>

      <div class="row">
        <div
          v-for="mueble in mueblesFiltrados"
          :key="mueble.id"
          class="col-md-4 col-sm-6 mb-4"
        >
          <div class="card h-100 modern-card" :style="getCardStyle(mueble)">
            <div class="image-container">
              <img
                :src="mueble.imagenUrl"
                class="card-img-top"
                alt="Imagen del mueble"
                @click="openModal(mueble)"
              />
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ mueble.nombre }}</h5>
              <p class="card-text">
                <strong>Categoría:</strong> {{ mueble.tag }}
              </p>
              <p class="card-text">{{ mueble.descripcion }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para imagen ampliada -->
    <div v-if="selectedMueble" class="modal-overlay" @click="closeModal">
      <div class="modal-content">
        <img :src="selectedMueble.imagenUrl" class="modal-image" @click.stop />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export default {
  name: "MueblesList",
  setup() {
    const muebles = ref([]);
    const selectedMueble = ref(null);
    const busqueda = ref("");
    const categoriaSeleccionada = ref("");
    const categorias = ref([]);

    const colores = ["#df0411", " #5dade2", "#ffe101", "#2ecc71"]; //Rojo, Azul, Amarillo, verde
    const cargarMuebles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "muebles"));
        muebles.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          color: colores[Math.floor(Math.random() * colores.length)],
        }));
        categorias.value = [
          ...new Set(muebles.value.map((mueble) => mueble.tag)),
        ];
      } catch (error) {
        console.error("Error al obtener los muebles: ", error);
      }
    };

    onMounted(cargarMuebles);

    const mueblesFiltrados = computed(() => {
      return muebles.value.filter((mueble) => {
        const matchesSearch =
          mueble.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
          mueble.descripcion
            .toLowerCase()
            .includes(busqueda.value.toLowerCase());

        return categoriaSeleccionada.value === ""
          ? matchesSearch
          : matchesSearch && mueble.tag === categoriaSeleccionada.value;
      });
    });

    const openModal = (mueble) => {
      selectedMueble.value = mueble;
    };

    const closeModal = () => {
      selectedMueble.value = null;
    };

    const getCardStyle = (mueble) => {
      return {
        backgroundColor: mueble.color,
        color: mueble.color === "#ffe101" ? "#000" : "#FFF", // Texto oscuro si el fondo es amarillo
      };
    };

    return {
      mueblesFiltrados,
      selectedMueble,
      openModal,
      closeModal,
      busqueda,
      categoriaSeleccionada,
      categorias,
      getCardStyle,
    };
  },
};
</script>

<style scoped>
/* Estilo del header */
.site-header {
  width: 100%;
  background: #ffe101;
  padding: 3rem 0;

  display: flex;
  justify-content: center;
  align-items: center;
}

.header-container {
  display: flex;
  align-items: center;
  width: 90%;
  max-width: 1200px;
}

.header-logo {
  height: 80px;
  margin-right: 20px;
  transition: transform 0.2s ease-in-out;
}

.header-logo:hover {
  transform: scale(1.05);
}

.header-text {
  flex: 1;
  color: black;
}

.site-name {
  font-size: 2rem;
  font-weight: bold;
}

.tagline {
  font-size: 1rem;
  margin-top: 10px;
}

/* Estilo de la tarjeta */
.modern-card {
  position: relative;
  border: none;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.image-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.image-container::before {
  content: "";
  position: absolute;
  bottom: -15px;
  left: 0;
  width: 100%;
  height: 30px;
  clip-path: polygon(0% 100%, 50% 70%, 100% 100%);
  background: inherit;
}

.modern-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s ease;
  /* Corte poligonal en la parte inferior de la imagen */
  clip-path: polygon(0% 0%, 900% 0%, 100% 75%, 40% 100%, 0% 50%);
}

.card-img-top:hover {
  transform: scale(1.02);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
}

.modal-content {
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  text-align: center;
}

.modal-image {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 10px;
  object-fit: contain;
  cursor: auto;
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    /* Cambiar a columna en pantallas pequeñas */
    text-align: center;
  }

  .header-logo {
    margin: 20px 0 0 0;
    /* Agregar margen arriba */
  }
}
</style>

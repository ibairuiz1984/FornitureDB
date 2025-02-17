<template>
  <div>
    <!-- Encabezado introductorio -->
    <header class="site-header">
      <div class="header-container">
        <img :src="require('@/assets/img/logo.png')" alt="Logo" class="header-logo" />
        <div class="header-text">
          <h1 class="site-name">Restauración & Conservación</h1>
          <p class="tagline">
            Nos dedicamos a restaurar y dar nueva vida a muebles y otros elementos de decoración.
            Fusionamos tradición y modernidad para transformar espacios en lugares únicos y llenos de historia.
          </p>
          <p class="tagline">
            Altzariak eta dekorazioko beste elementu batzuk zaharberritzen eta bizitza berria ematen aritzen gara.
            Tradizioa eta modernitatea uztartzen ditugu, espazioak leku paregabe eta historiaz beteak bihurtzeko.
          </p>
        </div>
      </div>
    </header>

    <!-- Listado de muebles -->
    <div class="container mt-4">

      <div v-if="mueblesFiltrados.length === 0" class="alert alert-warning text-center">
        No hay muebles disponibles.
      </div>
      <div class="row">
        <div v-for="mueble in mueblesFiltrados" :key="mueble.id" class="col-md-4 col-sm-6 mb-4">
          <div class="card h-100 modern-card">
            <!-- Al hacer clic se abre el modal con la imagen completa -->
            <img :src="mueble.imagenUrl" class="card-img-top" alt="Imagen del mueble"
              @click="openModal(mueble.imagenUrl)" />
            <div class="card-body">
              <h5 class="card-title">{{ mueble.nombre }}</h5>
              <p class="card-text"><strong>Categoría:</strong> {{ mueble.tag }}</p>
              <p class="card-text">{{ mueble.descripcion }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para imagen ampliada -->
    <div v-if="enlargedImage" class="modal-overlay" @click="closeModal">
      <img :src="enlargedImage" class="modal-image" @click.stop />
    </div>
  </div>
</template>

<script>
import { ref, inject } from "vue";

export default {
  name: "MueblesList",
  setup() {
    // Inyecta la propiedad reactiva 'mueblesFiltrados' desde el componente padre
    const mueblesFiltrados = inject("mueblesFiltrados");
    const enlargedImage = ref(null);

    const openModal = (url) => {
      enlargedImage.value = url;
    };

    const closeModal = () => {
      enlargedImage.value = null;
    };

    return { mueblesFiltrados, enlargedImage, openModal, closeModal };
  },
};
</script>

<style scoped>
/* Encabezado introductorio */
.site-header {
  background-color: transparent;
  /* sin fondo gris */
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;
  margin-bottom: 2rem;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.header-logo {
  height: 60px;
  margin-right: 1rem;
}

.header-text {
  max-width: 600px;
  text-align: left;
}

.site-name {
  margin: 0;
  font-size: 1.75rem;
  font-weight: bold;
}

.tagline {
  margin: 0.5rem 0 0;
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
}

/* Ajustar el padding del body para que no quede oculto por el header */
body {
  padding-top: 120px;
}

/* Tarjeta de muebles */
.card-img-top {
  max-height: 200px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.card-img-top:hover {
  transform: scale(1.02);
}

.modern-card {
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.modern-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.card-body {
  background: #fff;
  padding: 1.5rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.card-text {
  font-size: 0.95rem;
  color: #555;
}

/* Modal overlay para imagen ampliada */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 0.5rem;
}
</style>


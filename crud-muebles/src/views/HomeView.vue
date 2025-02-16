<template>
    <div class="container mt-4">
      <h1 class="text-center">Muebles Restaurados</h1>
      <div v-if="mueblesFiltrados.length === 0" class="alert alert-warning text-center">
        No hay muebles disponibles.
      </div>
      <div class="row">
        <div v-for="mueble in mueblesFiltrados" :key="mueble.id" class="col-md-4 col-sm-6 mb-4">
          <div class="card h-100">
            <img :src="mueble.imagenUrl" class="card-img-top" alt="Imagen del mueble">
            <div class="card-body">
              <h5 class="card-title">{{ mueble.nombre }}</h5>
              <p class="card-text"><strong>Categoría:</strong> {{ mueble.tag }}</p>
              <p class="card-text">{{ mueble.descripcion }}</p>
              <!-- Agrega más funcionalidad si es necesario -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { inject } from "vue";
  
  export default {
    name: "MueblesList",
    setup() {
      // Inyecta la propiedad reactiva 'mueblesFiltrados' proporcionada en App.vue
      const mueblesFiltrados = inject("mueblesFiltrados");
      return { mueblesFiltrados };
    },
  };
  </script>
  
  <style scoped>
  .card-img-top {
    max-height: 200px;
    object-fit: cover;
  }
  </style>
  
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" exact to="/agregar"
              >Agregar Mueble</router-link
            >
          </li>

          <!-- Dropdown de categorías dinámico -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Categorías
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li v-for="(tag, index) in uniqueTags" :key="index">
                <a
                  class="dropdown-item"
                  href="#"
                  @click.prevent="buscar(tag)"
                  >{{ tag }}</a
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item" href="#" @click.prevent="buscar('')"
                  >Todas</a
                >
              </li>
            </ul>
          </li>
        </ul>

        <!-- Barra de búsqueda -->
        <form class="d-flex" @submit.prevent="buscar(busqueda)">
          <input
            v-model="busqueda"
            class="form-control me-2"
            type="search"
            placeholder="Buscar por categoría"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Buscar</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    muebles: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      busqueda: "",
    };
  },
  computed: {
    uniqueTags() {
      if (!Array.isArray(this.muebles)) return [];
      const tags = this.muebles.map((mueble) => mueble.tag);
      return [...new Set(tags)];
    },
  },
  methods: {
    buscar(tag) {
      // Si se recibe una cadena vacía (''), se interpretará como "mostrar todos"
      this.$emit("buscarPorTag", tag);
    },
  },
};
</script>

<style scoped>
/* Asegura que el contenido no quede oculto detrás de la navbar */
body {
  padding-top: 60px;
}
</style>

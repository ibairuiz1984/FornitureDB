<!-- NavBar.vue (Actualizado) -->
<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container-fluid">
      <img :src="require('@/assets/img/logo.png')" alt="logo" class="logo" />
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" exact to="/agregar">Agregar Mueble</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
img {
  width: 40px;
}
.navbar{
  background-color: #5dade2;
}
</style>

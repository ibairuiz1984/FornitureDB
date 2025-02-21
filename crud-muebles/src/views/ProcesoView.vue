<template>
  <div class="container mt-5">
    <!-- Formas poligonales -->
    <div class="polygon circle"></div>
    <div class="polygon triangle"></div>
    <div class="polygon square"></div>
    <div class="polygon rhombus"></div>
    <div class="polygon big-triangle"></div>
    <div class="polygon small-circle"></div>
    <h1 class="text-center mb-4">Proceso de Restauración</h1>
    <div class="row">
      <div class="col-md-6">
        <img
          :src="proceso03"
          class="img-fluid mb-4"
          alt="Restauración de muebles"
        />
      </div>
      <div class="col-md-6">
        <p>
          En nuestro taller, nos especializamos en la restauración y
          conservación de muebles y obras de arte. Utilizamos técnicas
          tradicionales y materiales de alta calidad para asegurar que cada
          pieza recupere su esplendor original.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <p>
          Cada proyecto comienza con una evaluación detallada del estado del
          mueble. Luego, planificamos el proceso de restauración, que puede
          incluir limpieza, reparación de estructuras, y aplicación de acabados.
        </p>
      </div>
      <div class="col-md-6">
        <img
          :src="proceso01"
          class="img-fluid mb-4"
          alt="Proceso de restauración"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <img
          :src="proceso02"
          class="img-fluid mb-4"
          alt="Conservación de obras de arte"
        />
      </div>
      <div class="col-md-6">
        <p>
          Nuestro equipo de expertos trabaja con dedicación y cuidado para
          asegurar que cada pieza sea tratada con el respeto que merece. Nos
          enorgullece devolver la vida a muebles y obras de arte que tienen un
          valor sentimental y histórico.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProcesoView",
  data() {
    return {
      proceso01: require("@/assets/img/proceso01.jpg"),
      proceso02: require("@/assets/img/proceso02.jpg"),
      proceso03: require("@/assets/img/proceso03.jpg"),
    };
  },
};
</script>

<style scoped>
/* Fondo general */
.background {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* Formulario */
.container {
  position: relative;
  max-width: 100%;

  padding: 20px;
  border-radius: 10px;

  z-index: 10; /* Asegura que el formulario esté encima */
}

/* Formas de fondo */
.polygon {
  position: fixed;
  width: 200px;
  height: 200px;
  opacity: 0.6;
  pointer-events: none;
  animation: morph 6s infinite alternate ease-in-out;
  z-index: -1;
}

/* Colores y posiciones de las figuras */
.circle {
  top: 10%;
  left: 15%;
  background-color: #df0411;
  animation-duration: 20s;
  animation-delay: 0s;
}

.square {
  bottom: 10%;
  right: 10%;
  background-color: #5dade2;
  animation-duration: 10s;
  animation-delay: 1s;
}

.rhombus {
  top: 50%;
  left: 10%;
  background-color: #ffe101;
  animation-duration: 25s;
  animation-delay: 2s;
}

.big-triangle {
  bottom: 50%;
  left: 65%;
  background-color: #2ecc71;
  animation-duration: 25s;
  animation-delay: 3s;
}

/* Animación de transformación */
@keyframes morph {
  0% {
    border-radius: 0%;
    transform: rotate(0deg) scale(1);
  }
  50% {
    border-radius: 50%;
    transform: rotate(90deg) scale(1.2);
  }
  100% {
    border-radius: 0%;
    transform: rotate(0deg) scale(1);
  }
}
</style>

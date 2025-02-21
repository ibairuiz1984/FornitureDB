<template>
  <div class="background">
    <!-- Formas poligonales -->
    <div class="polygon circle"></div>
    <div class="polygon triangle"></div>
    <div class="polygon square"></div>
    <div class="polygon rhombus"></div>
    <div class="polygon big-triangle"></div>
    <div class="polygon small-circle"></div>

    <div class="container mt-5">
      <h1 class="text-center">Contacto</h1>
      <p class="text-center">
        Si tienes alguna consulta, rellena el siguiente formulario:
      </p>

      <form @submit.prevent="enviarMensaje" class="form-box">
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre</label>
          <input
            v-model="nombre"
            type="text"
            class="form-control"
            id="nombre"
            required
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Correo electrónico</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="mensaje" class="form-label">Mensaje</label>
          <textarea
            v-model="mensaje"
            class="form-control"
            id="mensaje"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>

      <div v-if="mensajeEnviado" class="alert alert-success mt-3">
        ¡Tu mensaje ha sido enviado con éxito!
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ContactView",
  setup() {
    const nombre = ref("");
    const email = ref("");
    const mensaje = ref("");
    const mensajeEnviado = ref(false);

    const enviarMensaje = () => {
      console.log("Mensaje enviado:", {
        nombre: nombre.value,
        email: email.value,
        mensaje: mensaje.value,
      });
      mensajeEnviado.value = true;
      setTimeout(() => (mensajeEnviado.value = false), 3000);

      // Resetear campos
      nombre.value = "";
      email.value = "";
      mensaje.value = "";
    };

    return { nombre, email, mensaje, mensajeEnviado, enviarMensaje };
  },
};
</script>

<style scoped>
/* Fondo general */
.background {
  position: relative;
  width: 100%;
  height: 80vh;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Formulario */
.container {
  position: relative;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
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
}

/* Colores y posiciones de las figuras */
.circle {
  top: 10%;
  left: 15%;
  background-color: #df0411;
  animation-duration: 7s;
  animation-delay: 0s;
}

.square {
  bottom: 20%;
  right: 10%;
  background-color: #5dade2;
  animation-duration: 6s;
  animation-delay: 1s;
}

.rhombus {
  top: 50%;
  left: 10%;
  background-color: #ffe101;
  animation-duration: 5s;
  animation-delay: 2s;
}

.big-triangle {
  bottom: 70%;
  left: 65%;
  background-color: #2ecc71;
  animation-duration: 8s;
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

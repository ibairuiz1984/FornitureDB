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
  height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Estilos del formulario */
.container {
  position: relative;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Estilos de formas poligonales */
.polygon {
  position: absolute;
  opacity: 0.8;
}

/* Círculo grande */
.circle {
  width: 150px;
  height: 150px;
  background-color: #df0411;
  border-radius: 50%;
  top: 10%;
  left: 5%;
}

/* Círculo pequeño */
.small-circle {
  width: 80px;
  height: 80px;
  background-color: #5dade2;
  border-radius: 50%;
  top: 60%;
  right: 15%;
}

/* Triángulo */
.triangle {
  width: 0;
  height: 0;
  border-left: 90px solid transparent;
  border-right: 90px solid transparent;
  border-bottom: 150px solid #ffe101;
  top: 20%;
  right: 10%;
}

/* Triángulo grande */
.big-triangle {
  width: 0;
  height: 0;
  border-left: 120px solid transparent;
  border-right: 120px solid transparent;
  border-bottom: 180px solid #5dade2;
  bottom: 10%;
  left: 20%;
}

/* Cuadrado */
.square {
  width: 110px;
  height: 110px;
  background-color: #2ecc71;
  position: absolute;
  bottom: 30%;
  left: 35%;
}

/* Rombo */
.rhombus {
  width: 90px;
  height: 90px;
  background-color: #C70039;
  position: absolute;
  bottom: 10%;
  right: 10%;
  transform: rotate(45deg);
}
</style>

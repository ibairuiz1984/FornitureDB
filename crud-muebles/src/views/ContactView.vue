<template>
  <div class="container mt-5">
    <h1 class="text-center">Contacto</h1>
    <p class="text-center">
      Si tienes alguna consulta, rellena el siguiente formulario:
    </p>

    <form @submit.prevent="enviarMensaje">
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
.container {
  max-width: 600px;
  margin: auto;
}
</style>

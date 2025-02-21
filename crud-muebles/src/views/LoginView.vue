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
            <h1 class="text-center">Login</h1>
            <form @submit.prevent="login">
                <div class="mb-3">
                    <label for="email" class="form-label">Correo electrónico</label>
                    <input v-model="email" type="email" class="form-control" id="email" required />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Contraseña</label>
                    <input v-model="password" type="password" class="form-control" id="password" required />
                </div>
                <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>
            </form>

            <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
    name: "LoginView",
    setup() {
        const email = ref("");
        const password = ref("");
        const error = ref(null);
        const router = useRouter();
        const auth = getAuth();

        const login = async () => {
            try {
                await signInWithEmailAndPassword(auth, email.value, password.value);
                router.push("/agregar"); // Redirigir a la vista de agregar mueble
            } catch (err) {
                error.value = "Credenciales incorrectas. Inténtalo de nuevo.";
            }
        };

        return { email, password, error, login };
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
  position: absolute;
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
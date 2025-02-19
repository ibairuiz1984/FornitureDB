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
    background-color: #C70039;
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
    border-bottom: 150px solid #FFC300;
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
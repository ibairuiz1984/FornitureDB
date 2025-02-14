<template>
    <div>
        <h1>Agregar Mueble</h1>
        <form @submit.prevent="agregarMueble">
            <input v-model="nombre" placeholder="Nombre del mueble" required>
            <input v-model="imagenUrl" placeholder="URL de la imagen" required>

            <select v-model="tag" required>
                <option disabled value="">Seleccione una categoría</option>
                <option v-for="categoria in categorias" :key="categoria" :value="categoria">
                    {{ categoria }}
                </option>
            </select>

            <textarea v-model="descripcion" placeholder="Descripción" required></textarea>
            <button type="submit">Agregar</button>
        </form>
    </div>
</template>

<script>
import { db, collection, addDoc } from "../firebase";

export default {
    data() {
        return {
            nombre: "",
            imagenUrl: "",
            tag: "",
            descripcion: "",
            categorias: ["armario", "banco", "cabecero", "cajonera", "comoda", "escritorio", "espejo", "estanteria", "mesa", "mesilla", "silla", "sofa", "taburete", "tabla", "tocador", "vitrina", "zapatero"]

        };
    },
    methods: {
        async agregarMueble() {
            await addDoc(collection(db, "muebles"), {
                nombre: this.nombre,
                imagenUrl: this.imagenUrl,
                tag: this.tag,
                descripcion: this.descripcion,
            });

            // Limpiar el formulario
            this.nombre = "";
            this.imagenUrl = "";
            this.tag = "";
            this.descripcion = "";

            // Volver a la página principal
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: auto;
}

input,
textarea,
select,
button {
    margin: 10px 0;
    padding: 10px;
}
</style>

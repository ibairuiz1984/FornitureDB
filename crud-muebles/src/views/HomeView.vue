<!-- Página principal con lista de muebles -->
<template>
    <div>
        <h1>Muebles Restaurados</h1>
        <router-link to="/agregar">
            <button>Agregar Mueble</button>
        </router-link>

        <div v-if="muebles.length === 0">No hay muebles disponibles.</div>

        <div class="muebles-grid">
            <div v-for="mueble in muebles" :key="mueble.id" class="mueble-card">
                <img :src="mueble.imagenUrl" alt="Imagen del mueble">
                <h3>{{ mueble.nombre }}</h3>
                <p><strong>Categoría:</strong> {{ mueble.tag }}</p>
                <p><strong>Descripción:</strong> {{ mueble.descripcion }}</p>
                <button @click="eliminarMueble(mueble.id)">Eliminar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { db, collection, onSnapshot, deleteDoc, doc } from "../firebase";

export default {
    data() {
        return {
            muebles: [],
        };
    },
    methods: {
        eliminarMueble(id) {
            if (confirm("¿Seguro que quieres eliminar este mueble?")) {
                deleteDoc(doc(db, "muebles", id));
            }
        },
    },
    mounted() {
        const mueblesRef = collection(db, "muebles");
        onSnapshot(mueblesRef, (snapshot) => {
            this.muebles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        });
    },
};
</script>

<style scoped>
.muebles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
    padding: 20px;
}

.mueble-card {
    border: 1px solid #ddd;
    padding: 15px;
    text-align: center;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
}
</style>

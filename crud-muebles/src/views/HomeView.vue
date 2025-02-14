<template>
    <div class="container mt-4">
        <h1 class="text-center">Muebles Restaurados</h1>
        <div v-if="muebles.length === 0" class="alert alert-warning text-center">No hay muebles disponibles.</div>

        <div class="row">
            <div v-for="mueble in muebles" :key="mueble.id" class="col-md-4 col-sm-6 mb-4">
                <div class="card h-100">
                    <img :src="mueble.imagenUrl" class="card-img-top" alt="Imagen del mueble">
                    <div class="card-body">
                        <h5 class="card-title">{{ mueble.nombre }}</h5>
                        <p class="card-text"><strong>Categoría:</strong> {{ mueble.tag }}</p>
                        <p class="card-text">{{ mueble.descripcion }}</p>
                        <button @click="eliminarMueble(mueble.id)" class="btn btn-danger">Eliminar</button>
                    </div>
                </div>
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
.card-img-top {
    max-height: 200px;
    object-fit: cover;
}
</style>

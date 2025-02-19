<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card border-secondary">
          <div class="card-header bg-light text-dark">
            <h3 class="mb-0">Agregar Mueble</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="agregarMueble">
              <div class="mb-3">
                <label class="form-label">Nombre del mueble</label>
                <input v-model="nombre" type="text" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">URL de la imagen</label>
                <input v-model="imagenUrl" type="text" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Categoría</label>
                <select v-model="tag" class="form-select" required>
                  <option disabled value="">Seleccione una categoría</option>
                  <option v-for="categoria in categorias" :key="categoria" :value="categoria">
                    {{ categoria }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Descripción</label>
                <textarea v-model="descripcion" class="form-control" rows="3" required></textarea>
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-secondary">Agregar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de previsualización de muebles -->
    <div class="mt-5">
      <h4 class="text-center">Muebles Guardados</h4>
      <div v-if="muebles.length === 0" class="alert alert-warning text-center">
        No hay muebles disponibles.
      </div>

      <div class="row">
        <div v-for="mueble in muebles" :key="mueble.id" class="col-md-3 col-sm-6 mb-3">
          <div class="card text-center">
            <img :src="mueble.imagenUrl" class="mueble-img" alt="Imagen del mueble" />
            <div class="card-body">
              <h6 class="card-title">{{ mueble.nombre }}</h6>
              <button @click="borrarMueble(mueble.id)" class="btn btn-sm btn-danger">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "@/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const nombre = ref("");
    const imagenUrl = ref("");
    const tag = ref("");
    const descripcion = ref("");
    const muebles = ref([]);
    const router = useRouter();

    const categorias = [
      "armario", "banco", "cabecero", "cajonera", "comoda",
      "escritorio", "espejo", "estanteria", "mesa", "mesilla",
      "silla", "sofa", "taburete", "tabla", "tocador", "vitrina", "zapatero",
    ];

    // Proteger la ruta: solo usuarios autenticados pueden entrar
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });

    // Cargar muebles desde Firestore
    const cargarMuebles = async () => {
      const querySnapshot = await getDocs(collection(db, "muebles"));
      muebles.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    };

    onMounted(cargarMuebles);

    // Agregar un mueble a Firestore
    const agregarMueble = async () => {
      try {
        await addDoc(collection(db, "muebles"), {
          nombre: nombre.value,
          imagenUrl: imagenUrl.value,
          tag: tag.value,
          descripcion: descripcion.value,
        });

        // Limpiar formulario
        nombre.value = "";
        imagenUrl.value = "";
        tag.value = "";
        descripcion.value = "";

        // Recargar lista
        cargarMuebles();
      } catch (error) {
        console.error("Error al agregar el mueble:", error);
      }
    };

    // Borrar un mueble de Firestore
    const borrarMueble = async (id) => {
      try {
        await deleteDoc(doc(db, "muebles", id));
        muebles.value = muebles.value.filter((mueble) => mueble.id !== id);
      } catch (error) {
        console.error("Error al eliminar el mueble:", error);
      }
    };

    return {
      nombre,
      imagenUrl,
      tag,
      descripcion,
      categorias,
      muebles,
      agregarMueble,
      borrarMueble,
    };
  },
};
</script>

<style scoped>
/* Estilo para imágenes más pequeñas */
.mueble-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}

.card {
  border: 1px solid #ccc;
}

.card-body {
  padding: 10px;
}
</style>

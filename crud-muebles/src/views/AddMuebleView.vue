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
                <input
                  v-model="nombre"
                  type="text"
                  class="form-control"
                  placeholder="Nombre del mueble"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">URL de la imagen</label>
                <input
                  v-model="imagenUrl"
                  type="text"
                  class="form-control"
                  placeholder="URL de la imagen"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Categoría</label>
                <select v-model="tag" class="form-select" required>
                  <option disabled value="">Seleccione una categoría</option>
                  <option
                    v-for="categoria in categorias"
                    :key="categoria"
                    :value="categoria"
                  >
                    {{ categoria }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Descripción</label>
                <textarea
                  v-model="descripcion"
                  class="form-control"
                  rows="3"
                  placeholder="Descripción"
                  required
                ></textarea>
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-secondary">Agregar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
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
      categorias: [
        "armario",
        "banco",
        "cabecero",
        "cajonera",
        "comoda",
        "escritorio",
        "espejo",
        "estanteria",
        "mesa",
        "mesilla",
        "silla",
        "sofa",
        "taburete",
        "tabla",
        "tocador",
        "vitrina",
        "zapatero",
      ],
    };
  },
  methods: {
    async agregarMueble() {
      try {
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
      } catch (error) {
        console.error("Error al agregar el mueble:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Estilos minimalistas: borde sutil y sin sombras fuertes */
.card {
  border: 1px solid #ccc;
  box-shadow: none;
}
.card-header {
  border-bottom: 1px solid #ccc;
}
</style>

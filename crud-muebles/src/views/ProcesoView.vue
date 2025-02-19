<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Proceso de Restauración</h1>
        <div class="row">
            <div class="col-md-6">
                <img :src="proceso03" class="img-fluid mb-4" alt="Restauración de muebles">
            </div>
            <div class="col-md-6">
                <p>
                    En nuestro taller, nos especializamos en la restauración y conservación de muebles y obras de arte.
                    Utilizamos técnicas tradicionales y materiales de alta calidad para asegurar que cada pieza recupere
                    su esplendor original.
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <p>
                    Cada proyecto comienza con una evaluación detallada del estado del mueble. Luego, planificamos el
                    proceso
                    de restauración, que puede incluir limpieza, reparación de estructuras, y aplicación de acabados.
                </p>
            </div>
            <div class="col-md-6">
                <img :src="proceso01" class="img-fluid mb-4" alt="Proceso de restauración">
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <img :src="proceso02" class="img-fluid mb-4" alt="Conservación de obras de arte">
            </div>
            <div class="col-md-6">
                <p>
                    Nuestro equipo de expertos trabaja con dedicación y cuidado para asegurar que cada pieza sea tratada
                    con
                    el respeto que merece. Nos enorgullece devolver la vida a muebles y obras de arte que tienen un
                    valor
                    sentimental y histórico.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProcesoView',
    data() {
        return {
            proceso01: require('@/assets/img/proceso01.jpg'),
            proceso02: require('@/assets/img/proceso02.jpg'),
            proceso03: require('@/assets/img/proceso03.jpg')
        };
    }
}
</script>

<style scoped>
.container {
    max-width: 900px;
}
</style>

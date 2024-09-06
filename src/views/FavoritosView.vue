<script setup>

import Modal from '@/components/Modal.vue'
import Receta from '@/components/Receta.vue'
import Spinner from '@/components/BotonCargando.vue'
import { useBebidasStore } from '@/stores/bebidas.js'

const store = useBebidasStore()

</script>

<template>
  <Modal v-if="store.mostrarModal"/>
  <Spinner v-if="store.mostrarSpinner"/>
  <div v-if="!store.mostrarSpinner && store.favoritos.length > 0">
    <h1 class="text-4xl font-extrabold">Favoritos</h1>
    <div class="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-4 mt-10 gap-10">
      <Receta
          v-for="receta in store.favoritos"
          :receta="receta"
          :key="receta.idDrink"
      />
    </div>
  </div>
  <div v-else>
    <h3 class="text-3xl font-extrabold">Aún no se añadieron favoritos</h3>
  </div>
</template>

<script setup>
  import { useBebidasStore } from '@/stores/bebidas.js'
  import Receta from '@/components/Receta.vue'
  import Modal from '@/components/Modal.vue'

  const store = useBebidasStore()
</script>

<template>
  <Modal v-if="store.mostrarModal"/>
  <div v-if="!store.mostrarSpinner && store.recetas.length > 0">
    <h1 class="text-4xl font-extrabold">Recetas</h1>
    <div class="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-4 mt-10 gap-10">
      <Receta
          v-for="receta in store.recetas"
          :receta="receta"
          :key="receta.idDrink"
      />
    </div>
  </div>
</template>

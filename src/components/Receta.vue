<script setup>
  import { useBebidasStore } from '@/stores/bebidas.js'

  defineProps({
    receta: {
      type: Object
    }
  })

  const store = useBebidasStore()
</script>

<template>
  <div class="max-w-sm bg-gray-100 border border-gray-100 rounded-lg shadow">
    <img class="rounded-t-lg" :src="receta.strDrinkThumb" :alt="'Imagen ' + receta.strDrink" />
    <div class="p-5">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 h-16 overflow-hidden">
        {{ receta.strDrink }}
      </h5>
      <button
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          @click="store.obtenerDetallesReceta(receta.idDrink)"
      >
        Ver receta
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
      </button>
    </div>
  </div>
</template>


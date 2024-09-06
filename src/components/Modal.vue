<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useBebidasStore } from '@/stores/bebidas.js'
  import Alerta from '@/components/Alerta.vue'

  const store = useBebidasStore()
  const ingredientes = ref([])

  const route = useRoute()
  const isHome = computed(() => {
    return route.name === 'inicio'
  })

  const agregarFavorito = () => {
    store.agregarFavorito(store.detallesReceta[0], route.name)
  }

  onMounted(() => {
    for (let i = 1; i <= 15; i++) {
      const ingrediente = store.detallesReceta[0][`strIngredient${i}`];
      if (ingrediente !== null) {
        ingredientes.value.push(ingrediente);
      }
    }
  })

</script>

<template>
  <div
      id="modelConfirm"
      :class="store.mostrarModal ? '' : 'hidden'"
      @click.self="store.cerrarModal"
      class="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 ">
    <div class="relative top-10 mx-auto shadow-xl rounded-md max-w-md">
      <div class="relative bg-white rounded-lg shadow">
        <div class="p-4 md:p-5">
          <img class="rounded-t-lg" :src="store.detallesReceta[0].strDrinkThumb" :alt="'Imagen ' + store.detallesReceta[0].strDrink" />
          <h3 class="my-5 text-2xl font-extrabold text-gray-900">{{ store.detallesReceta[0].strDrink }}</h3>
          <div class="meta mb-3">
            <span class="bg-gray-100 text-gray-900 text-xs font-medium me-2 px-2.5 py-0.5
          rounded border border-gray-400 mr-2">
              {{ store.detallesReceta[0].strCategory }}
          </span>
            <span class="bg-gray-100 text-gray-900 text-xs font-medium me-2 px-2.5 py-0.5
          rounded border border-gray-400 mr-2">
              {{ store.detallesReceta[0].strAlcoholic }}
          </span>
          </div>
          <div class="ingredientes mb-4">
            <h4 class="text-gray-900 text-xl font-semibold mb-2">Ingredientes:</h4>
            <ul class="max-w-md space-y-0 text-gray-900 list-disc list-inside">
              <li v-for="ingrediente in ingredientes">
                {{ ingrediente }}
              </li>
            </ul>
          </div>
          <div class="instrucciones mb-4">
            <h4 class="text-gray-900 text-xl font-semibold">Receta:</h4>
            <p class="mb-5 text-lg font-normal text-gray-900 pt-2">{{ store.detallesReceta[0].strInstructions }}</p>
          </div>
          <div v-if="!store.mostrarAlerta">
            <button
                data-modal-hide="popup-modal"
                type="button"
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4
              focus:outline-none focus:ring-red-300 dark:focus:ring-red-800
              font-medium rounded-lg text-sm inline-flex items-center px-5
              py-2.5 text-center"
                @click="agregarFavorito"
            >
              {{ isHome ? 'Añadir a favoritos' : 'Quitar de favoritos' }}
            </button>
            <button
                data-modal-hide="popup-modal"
                type="button"
                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900
              focus:outline-none bg-white rounded-lg border border-gray-200
              hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4
              focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800
              dark:text-gray-400 dark:border-gray-600 dark:hover:text-white
              dark:hover:bg-gray-700"
                @click="store.cerrarModal()"
            >
              Cerrar
            </button>
          </div>
          <Alerta
              v-else
              class="mt-5"
              :mensaje="store.mensajeAlerta"
              :color="'white'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

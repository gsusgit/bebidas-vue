  <script setup>
  import { computed, ref } from 'vue'
  import { RouterLink, useRoute } from 'vue-router'
  import { useBebidasStore } from '@/stores/bebidas.js'
  import Alerta from '@/components/Alerta.vue'
  import BotonCargando from '@/components/BotonCargando.vue'

  const route = useRoute()

  const isHome = computed(() => {
    return route.name === 'inicio'
  })

  const error = ref('')

  const store = useBebidasStore()

  const handleSubmit = () => {
    if (Object.values(store.terminosBusqueda).includes('')) {
      error.value = 'Por favor, rellene todos los campos'
      setTimeout(() => {
        error.value = ''
      }, 3000)
    } else {
      store.buscarRecetas()
    }
  }
</script>

<template>
  <header
      class="bg-slate-800"
      :class="{header : isHome}"
  >
    <div
        :class="[isHome ? 'py-16' : 'py-8']"
        class="mx-auto container px-5">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{name: 'inicio'}">
            <img
                class="w-16"
                src="/img/logo.svg"
                alt="Logo">
          </RouterLink>
        </div>
        <nav class="flex gap-4">
          <RouterLink
              :to="{name: 'inicio'}"
              class="text-white uppercase font-bold nav-link"
              exact-active-class="custom-active-link"
          >
            Recetas
          </RouterLink>
          <RouterLink
              :to="{name: 'favoritos'}"
              class="text-white uppercase font-bold nav-link"
              exact-active-class="custom-active-link"
          >
            Favoritos
          </RouterLink>
        </nav>
      </div>
      <form
          v-if="isHome"
          class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
          @submit.prevent="handleSubmit"
      >
        <div class="space-y-4">
          <label
              for="ingrediente"
              class="block text-white uppercase font-extrabold text-lg"
          >
            Nombre o ingredientes
          </label>
          <input
              id="ingrediente"
              type="text"
              class="p-3 w-full rounded-md focus:outline-none"
              placeholder="Nombre o ingrediente: ej. vodka, tequila, etc"
              v-model="store.terminosBusqueda.ingrediente"
          >
        </div>
        <div class="space-y-4">
          <label
              for="categoria"
              class="block text-white uppercase font-extrabold text-lg"
          >
            categoría
          </label>
          <select
              id="categoria"
              type="text"
              class="p-3 w-full rounded-md focus:outline-none"
              v-model="store.terminosBusqueda.categoria"
          >
            <option value="">Seleccionar</option>
            <option
                v-for="categoria in store.categorias"
                :key="categoria.strCategory"
                :value="categoria.strCategory"
            >
              {{ categoria.strCategory }}
            </option>
          </select>
        </div>
        <BotonCargando v-if="store.mostrarBotonCargando"/>
        <input v-else
            type="submit"
            class="p-3 bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full rounded-lg uppercase"
            value="Buscar recetas"/>
        <Alerta
            v-if="error !== ''"
            :mensaje="error"
            :color="'dark'"
        />
      </form>
    </div>
  </header>
</template>

<style>
.custom-active-link, .nav-link:hover {
  --tw-text-opacity: 1;
  color: rgb(249 115 22 / var(--tw-text-opacity));
}
.header {
  background-position: center;
  background-size: cover;
  background-image: url('/img/bg.jpg');
}
</style>

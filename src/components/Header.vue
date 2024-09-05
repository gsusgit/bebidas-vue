<script setup>
  import { computed } from 'vue'
  import { RouterLink, useRoute } from 'vue-router'
  import { useBebidasStore } from '@/stores/bebidas.js'

  const route = useRoute()

  const isHome = computed(() => {
    return route.name === 'inicio'
  })

  const store = useBebidasStore()
  console.log(store.categorias)
  // const { categorias } = useBebidasStore()
</script>

<template>
  <header
      class="bg-slate-800"
      :class="{header : isHome}"
  >
    <div class="mx-auto container px-5 py-16">
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
          >
            <option value="">Seleccionar</option>
          </select>
        </div>
        <input
            type="submit"
            class="p-3 bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full rounded-lg uppercase"
            value="Buscar cocktails"/>
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

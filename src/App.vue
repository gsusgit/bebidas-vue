<script setup>
import { RouterView, useRoute } from 'vue-router'
  import { useBebidasStore } from '@/stores/bebidas.js'
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
import { computed } from 'vue'

  const store = useBebidasStore()

  const route = useRoute()

  const isHome = computed(() => {
    return route.name === 'inicio'
  })
</script>

<template>
  <Header />
  <main v-if="isHome && store.recetas.length > 0 || !isHome" class="container mx-auto py-10">
    <RouterView />
  </main>
  <Footer />
</template>

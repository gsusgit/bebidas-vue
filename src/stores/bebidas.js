import { defineStore } from 'pinia'
import { ref, onMounted, reactive } from 'vue'
import ApiService from '@/services/ApiService.js'

export const useBebidasStore = defineStore('bebidas', () => {

    const categorias = ref([])
    const terminosBusqueda = reactive({
        ingrediente: '',
        categoria: ''
    })
    const recetas = ref([])

    onMounted(async function () {
        const {data: {drinks}} = await ApiService.obtenerCategorias()
        categorias.value = drinks
    })

    async function  buscarRecetas () {
        const {data: {drinks}} = await ApiService.buscarRecetas(terminosBusqueda)
        recetas.value = drinks
    }

    return {
        categorias,
        terminosBusqueda,
        buscarRecetas,
        recetas
    }

})

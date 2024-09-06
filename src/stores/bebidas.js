import { defineStore } from 'pinia'
import { ref, onMounted, reactive, computed, watch } from 'vue'
import ApiService from '@/services/ApiService.js'

export const useBebidasStore = defineStore('bebidas', () => {

    const categorias = ref([])
    const terminosBusqueda = reactive({
        ingrediente: '',
        categoria: ''
    })
    const recetas = ref([])
    const favoritos = ref([])
    const detallesReceta = ref([])
    const mostrarBotonCargando = ref(false)
    const sinResultados = ref(false)
    const mostrarModal = ref(false)
    const mostrarAlerta = ref(false)
    const mensajeAlerta = ref('')

    onMounted(async function () {
        const {data: {drinks}} = await ApiService.obtenerCategorias()
        categorias.value = drinks
    })

    async function buscarRecetas() {
        mostrarBotonCargando.value = true
        const {data: {drinks}} = await ApiService.buscarRecetas(terminosBusqueda)
        setTimeout(() => {
            mostrarBotonCargando.value = false
            recetas.value = drinks
        }, 1000)
    }

    async function obtenerDetallesReceta(id) {
        const {data: {drinks}} = await ApiService.detallesReceta(id)
        detallesReceta.value = drinks
        mostrarModal.value = true
    }

    function agregarFavorito(receta, ruta) {
        const buscarFavorito = favoritos.value.some(favorito => favorito.idDrink === receta.idDrink)
        if (ruta === 'inicio') {
            if(!buscarFavorito) {
                favoritos.value.push(receta)
                mensajeAlerta.value = 'Bebida añadida a favoritos'
            } else {
                mensajeAlerta.value = 'La bebida ya está en favoritos'
            }
        } else {
            favoritos.value = favoritos.value.filter(favorito => favorito.idDrink !== receta.idDrink)
            mensajeAlerta.value = 'Bebida eliminada de favoritos'
        }
        mostrarAlerta.value = true
        setTimeout(() => {
            mostrarAlerta.value = false
            if (ruta === 'favoritos') {
                cerrarModal()
            }
        }, 1500)
    }

    function cerrarModal() {
        mostrarModal.value = false
    }

    return {
        categorias,
        terminosBusqueda,
        buscarRecetas,
        recetas,
        mostrarBotonCargando,
        sinResultados,
        obtenerDetallesReceta,
        detallesReceta,
        mostrarModal,
        cerrarModal,
        agregarFavorito,
        favoritos,
        mostrarAlerta,
        mensajeAlerta
    }

})

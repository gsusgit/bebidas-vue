import api from '@/lib/axios.js'

export default {
    obtenerCategorias() {
        return api('/list.php?c=list')
    },
    buscarRecetas({categoria, ingrediente}) {
        return api(`filter.php?c=${categoria}&i=${ingrediente}`)
    }
}

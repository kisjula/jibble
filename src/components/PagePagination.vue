<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMovieStore } from '@/stores/movie'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const router = useRouter()
const route = useRoute()
const movieStore = useMovieStore()

const page: Ref<number> = ref(1)
const pageValue = computed({
    get(){
        return movieStore.meta.page || 1
    },
    set(value: number){
        page.value = value
    }
})

const navigateTo = (page: number) => {
    router.replace({ params: { page: page }, query: { search: route.query.search } })
}
const editPage = () => {
    if (page.value.toString() === route.params.page || isNaN(page.value) || page.value > movieStore.meta.total_pages) return
    navigateTo(page.value || 1)
}
</script>

<template lang="pug">
.pagination
    button.btn.btn-icon(@click="navigateTo(1)" :disabled="movieStore.meta.page <= 1" data-testid="pagination-first")
        font-awesome-icon(:icon="faChevronLeft")
        font-awesome-icon(:icon="faChevronLeft")
    button.btn.btn-icon(@click="navigateTo(movieStore.meta.page - 1)"  :disabled="movieStore.meta.page <= 1" data-testid="pagination-prev")
        font-awesome-icon(:icon="faChevronLeft")
    input.input(type="number" v-model="pageValue" @blur="editPage" @keydown.enter="editPage" data-testid="pagination-page")
    button.btn.btn-icon(@click="navigateTo(movieStore.meta.page + 1)" :disabled="movieStore.meta.total_pages <= movieStore.meta.page" data-testid="pagination-next") 
        font-awesome-icon(:icon="faChevronRight")
    button.btn.btn-icon(@click="navigateTo(movieStore.meta.total_pages)" :disabled="movieStore.meta.total_pages <= movieStore.meta.page"  data-testid="pagination-last")
        font-awesome-icon(:icon="faChevronRight")
        font-awesome-icon(:icon="faChevronRight")
</template>

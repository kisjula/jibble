<script setup lang="ts">
import { useMovieStore } from '@/stores/movie'
import { useRoute, useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const router = useRouter()
const route = useRoute()
const movieStore = useMovieStore()

const navigateTo = (page: number) => {
    router.replace({ params: { page: page }, query: { search: route.query.search } })
}
const editPage = (
    e: Event & {
        target: HTMLButtonElement
    },
) => {
    e.preventDefault()
    e.stopPropagation()
    if (
        isNaN(parseInt(e.target.textContent || '1')) ||
        e.target.textContent === route.params.page ||
        (!e.target.textContent && route.params.page === '1')
    )
        return
    navigateTo(parseInt(e.target.textContent || '1'))
}
</script>

<template lang="pug">
.pagination
    button.btn.btn-icon(@click="navigateTo(1)" :disabled="movieStore.meta.page <= 1" data-testid="pagination-first")
        font-awesome-icon(:icon="faChevronLeft")
        font-awesome-icon(:icon="faChevronLeft")
    button.btn.btn-icon(@click="navigateTo(movieStore.meta.page - 1)"  :disabled="movieStore.meta.page <= 1" data-testid="pagination-prev")
        font-awesome-icon(:icon="faChevronLeft")
    span(contenteditable @blur="editPage" @keydown.enter="editPage") {{movieStore.meta.page}}
    button.btn.btn-icon(@click="navigateTo(movieStore.meta.page + 1)" :disabled="movieStore.meta.total_pages <= movieStore.meta.page" data-testid="pagination-next") 
        font-awesome-icon(:icon="faChevronRight")
    button.btn.btn-icon(@click="navigateTo(movieStore.meta.total_pages)" :disabled="movieStore.meta.total_pages <= movieStore.meta.page"  data-testid="pagination-last")
        font-awesome-icon(:icon="faChevronRight")
        font-awesome-icon(:icon="faChevronRight")
</template>

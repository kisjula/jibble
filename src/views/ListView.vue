<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useMovieStore } from '@/stores/movie'
import { useRoute, useRouter } from "vue-router"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import MovieListItem from '@/components/MovieListItem.vue'
import PagePagination from '@/components/PagePagination.vue'

const route = useRoute();
const router = useRouter();
const movieStore = useMovieStore()


const search: Ref<string | null | undefined> = ref()
search.value = route.query.search?.toString()

movieStore.getList(search.value, route.params.page?.toString())

watch(route, (route) => {
    movieStore.getList(route.query.search?.toString(), route.params.page?.toString())
});

const onSearch = () => {
    if(route.query.search !== search.value?.toString())
        router.replace({params: {page: 1}, query: {search: search.value || undefined}})
}

const clearSearch = () => {
    search.value = undefined
    router.replace({params: {page: 1},  query: {search: undefined}})
}


</script>

<template lang="pug">
.list-view-wrapper
    h1 Browse movies
    .search-wrapper
        input.input(v-model="search" @keydown.enter="onSearch" placeholder="Search" data-testid="search-input")  
        button.btn.btn-icon(@click="onSearch" :disabled="!search" data-testid="search-button") 
            font-awesome-icon(:icon="faMagnifyingGlass")
        button.btn.btn-icon(@click="clearSearch" :disabled="!search && !route.query.search" data-testid="search-clear") 
            font-awesome-icon(:icon="faTimes")
    .list-view  
        movie-list-item(v-for="item in movieStore.list" :model="item" data-testid="movie-list-item" :key="`movieListItem-${item.imdbID}`")
    page-pagination
</template>

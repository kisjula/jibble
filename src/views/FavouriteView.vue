<script setup lang="ts">
import { useMovieStore } from '@/stores/movie'

import MovieListItem from '@/components/MovieListItem.vue'

const movieStore = useMovieStore()



</script>

<template lang="pug">
.list-view-wrapper
    h1 Favourite movies
    .list-view  
        movie-list-item(v-for="item in movieStore.favouriteList" :model="item" :key="`movieFavouriteListItem-${item.imdbID}`")
</template>

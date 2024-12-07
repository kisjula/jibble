<script setup lang="ts">
import { computed } from 'vue'
import type { Movie } from '@/interfaces/movie.interface'
import { useMovieStore } from '@/stores/movie'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

const movieStore = useMovieStore()

const props = defineProps<{
    model: Movie
}>();

const isFavourite = computed(() => !!movieStore.favouriteList.find((movie) => movie?.imdbID === props.model.imdbID))

const favouriteMovie = (e:Event) => {
    e.preventDefault()
    movieStore.favouriteMovie(props.model)
}
</script>

<template lang="pug">
a.movie-list-item(:href="`https://www.imdb.com/title/${model.imdbID}/`" :id="model.imdbID" target="_blank")
    .cover
        img(src="/movie.png")
    .content       
        label {{ model.Year }}
        h3 {{model.Title}}
        button.btn.btn-lg.btn-round.btn-icon(@click="favouriteMovie" data-testid="set-favourite")
            transition(name="fade" mode="out-in")
                font-awesome-icon(v-if="isFavourite" :icon="fasStar" data-testid="star-solid")
                font-awesome-icon(v-else :icon="farStar" data-testid="star-regular")
        

</template>

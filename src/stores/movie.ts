import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { MovieResult, Movie, Meta } from '@/interfaces/movie.interface'
import { useStorage } from '@vueuse/core'

export const useMovieStore = defineStore('movie', () => {
    const favouriteListData: Ref<Movie[]> = useStorage('favouriteList', [])
    const listData: Ref<Movie[]> = ref([])
    const metaData: Ref<Meta> = ref({
        page: 0,
        per_page: 0,
        total: 0,
        total_pages: 0,
    })

    const favouriteList = computed(() => favouriteListData.value)
    const list = computed(() => listData.value)
    const meta = computed(() => metaData.value)

    function favouriteMovie(model: Movie) {
        if (!model?.imdbID) return
        const index = favouriteListData.value.findIndex((movie) => movie.imdbID === model.imdbID)
        if (index === -1) favouriteListData.value.push(model)
        else favouriteListData.value.splice(index, 1)
    }

    async function getList(title?: string, page?: string) {
        const response: Response = await fetch(
            `https://jsonmock.hackerrank.com/api/movies/search/?page=${page || 1}${title ? `&Title=${title}` : ''}`,
            {
                headers: { 'Content-type': 'application/json' },
            },
        )
        const result: MovieResult = await response.json()
        listData.value = result.data
        metaData.value = {
            page: result.page,
            per_page: result.per_page,
            total: result.total,
            total_pages: result.total_pages,
        }
    }

    return { favouriteMovie, getList, favouriteList, list, meta }
})

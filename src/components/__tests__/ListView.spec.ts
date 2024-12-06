import { beforeEach, describe, it, expect, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { useMovieStore } from '@/stores/movie'
import router from '@/router'
import ListView from '@/views/ListView.vue'

describe('ListView', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })
    const searchInput = '[data-testid=search-input]'
    const search = '[data-testid=search-search]'
    const searchClear = '[data-testid=search-clear]'
    const movieListItem = '[data-testid=movie-list-item]'

    it('renders properly', async () => {
        const movieStore = useMovieStore()

        const wrapper = mount(ListView, {
            global: {
                plugins: [router],
            },
        })
        expect(wrapper.find(movieListItem).exists()).toBe(false)
        await movieStore.getList()
        expect(wrapper.find(movieListItem).exists()).toBe(true)

        expect(wrapper.find(search).attributes().disabled).toBe('')
        expect(wrapper.find(searchClear).attributes().disabled).toBe('')

        await wrapper.find(searchInput).setValue('search for test')

        expect(wrapper.find(search).attributes().disabled).toBe(undefined)
        expect(wrapper.find(searchClear).attributes().disabled).toBe(undefined)

        wrapper.find(search).trigger('click')
        await vi.dynamicImportSettled()

        expect(router.currentRoute.value.query.search).toBe('search for test')

        wrapper.find(searchClear).trigger('click')
        await vi.dynamicImportSettled()

        expect(router.currentRoute.value.query.search).toBe(undefined)

        expect(wrapper.find(search).attributes().disabled).toBe('')
        expect(wrapper.find(searchClear).attributes().disabled).toBe('')
    })
})

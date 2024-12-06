import { beforeEach, describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { useMovieStore } from '@/stores/movie'
import MovieListItem from '@/components/MovieListItem.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

describe('MovieListItem', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    const favouriteButton = '[data-testid=set-favourite]'
    const starRegular = '[data-testid=star-regular]'
    const starSolid = '[data-testid=star-solid]'

    it('renders properly', async () => {
        const movieStore = useMovieStore()

        const wrapper = mount(MovieListItem, {
            propsData: {
                model: {
                    Title: 'Cake Walk Series',
                    Year: 2016,
                    imdbID: 'tt5522850',
                },
            },
            global: {
                stubs: { FontAwesomeIcon },
            },
        })
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.find(favouriteButton).exists()).toBe(true)
        expect(wrapper.find(starRegular).exists()).toBe(true)
        expect(wrapper.find(starSolid).exists()).toBe(false)

        expect(wrapper.find('h3').text()).toBe(wrapper.props().model.Title)
        expect(wrapper.find('label').text()).toBe(wrapper.props().model.Year.toString())
        expect(wrapper.find('a').attributes().href).toContain(wrapper.props().model.imdbID)

        await wrapper.find(favouriteButton).trigger('click')
        expect(
            movieStore.favouriteList.find((el) => el.imdbID === wrapper.props().model.imdbID),
        ).toBe(wrapper.props().model)
        expect(wrapper.find(starRegular).exists()).toBe(false)
        expect(wrapper.find(starSolid).exists()).toBe(true)
    })
})

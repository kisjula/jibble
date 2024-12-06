import { beforeEach, describe, it, expect, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import router from '@/router'
import App from '@/App.vue'

describe('App', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    const navList = '[data-testid=nav-list]'
    const navFavourites = '[data-testid=nav-favourites]'

    it('renders properly', async () => {
        const wrapper = mount(App, {
            global: {
                plugins: [router],
            },
        })
        expect(wrapper.find(navList).exists()).toBe(true)
        expect(wrapper.find(navFavourites).exists()).toBe(true)

        await wrapper.find(navFavourites).trigger('click')
        await vi.dynamicImportSettled()
        expect(wrapper.vm.$route.path).toBe('/favourite')

        await wrapper.find(navList).trigger('click')
        await vi.dynamicImportSettled()
        expect(wrapper.vm.$route.path).toBe('/')
    })
})

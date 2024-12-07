import { useMovieStore } from '../../src/stores/movie'
import { createPinia, setActivePinia } from 'pinia'
import type { Meta } from '../../src/interfaces/movie.interface'

describe('Pagination test', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    const API = 'https://jsonmock.hackerrank.com/api/movies/search/'

    const searchInput = '[data-testid=search-input]'
    const searchButton = '[data-testid=search-button]'
    const searchClear = '[data-testid=search-clear]'

    it('passes', () => {
        cy.visit('/')

        cy.intercept('GET', `${API}?page=1`).as('getMovies')
        cy.wait(['@getMovies'])

        cy.get(searchInput).type('ironman')

        cy.get(searchButton)
            .click()
            .then(() => {
                cy.intercept('GET', `${API}?page=1&Title=ironman`).as('getIronman')
                cy.wait('@getIronman').its('response.statusCode').should('be.oneOf', [200, 304])
            })
    })
})

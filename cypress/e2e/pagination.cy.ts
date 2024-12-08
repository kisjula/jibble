import { useMovieStore } from '../../src/stores/movie'
import { createPinia, setActivePinia } from 'pinia'
import type { Meta } from '../../src/interfaces/movie.interface'

describe('Pagination test', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    const API = 'https://jsonmock.hackerrank.com/api/movies/search/'

    const PAGINATION_LIMIT = 7

    const toFirst = '[data-testid=pagination-first]'
    const toNext = '[data-testid=pagination-next]'
    const toPrev = '[data-testid=pagination-next]'
    const pageIndicator = '[data-testid=pagination-page]'
    it('passes', () => {
        let page = 1
        for (let i = 1; i <= PAGINATION_LIMIT; i++) {
            cy.intercept('GET', `${API}?page=${i}`).as(`getMovies${i}`)
        }

        cy.visit('/')

        cy.wait(['@getMovies1']).then(() => {
            cy.get(toFirst).should('exist')
            cy.get(toNext).should('exist')
            const nextPage = () => {
                cy.get(toNext)
                    .invoke('attr', 'disabled')
                    .then((disabled) => {
                        if (disabled === 'disabled' || page >= PAGINATION_LIMIT) {
                            if (disabled === 'disabled')
                                cy.get(toNext).should('have.attr', disabled)
                            cy.get(toFirst)
                                .click()
                                .then(() => {
                                    cy.wait([`@getMovies1`]).then(() => {
                                        cy.get(pageIndicator).should('have.value', 1)
                                    })
                                })
                        } else {
                            cy.get(toNext)
                                .click()
                                .then(() => {
                                    page++
                                    cy.wait([`@getMovies${page}`]).then(nextPage)
                                })
                        }
                    })
            }
            nextPage()
        })
    })
})

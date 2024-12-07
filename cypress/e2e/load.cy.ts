import { useMovieStore } from '../../src/stores/movie'
import { createPinia, setActivePinia } from 'pinia'
import type { Meta } from '../../src/interfaces/movie.interface'

describe('Pagination test', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    const API = 'https://jsonmock.hackerrank.com/api/movies/search/'
    const toList = '[data-testid=nav-list]'
    const toFavourites = '[data-testid=nav-favourites]'

    const movieListItem = '[data-testid=movie-list-item]'
    const favouriteButton = '[data-testid=set-favourite]'
    const starSolid = '[data-testid=star-solid]'
    const starRegular = '[data-testid=star-regular]'

    it('passes', () => {
        cy.intercept('GET', `${API}?page=1`).as('getMovies')

        cy.visit('/')

        cy.wait(['@getMovies'])
        cy.get(toFavourites).click()

        cy.contains('h1', 'Favourite movies')

        cy.get(toList).click()
        cy.wait(['@getMovies'])

        cy.contains('h1', 'Browse movies')

        cy.get(movieListItem).eq(0).find(starSolid).should('not.exist')
        cy.get(movieListItem).eq(0).find(starRegular).should('exist')
        cy.get(movieListItem).eq(0).find(favouriteButton).click()
        cy.get(movieListItem).eq(0).find(starSolid).should('exist')
        cy.get(movieListItem).eq(0).find(starRegular).should('not.exist')

        cy.reload()

        cy.get(movieListItem).eq(0).find(starSolid).should('exist')
        cy.get(movieListItem).eq(0).find(starRegular).should('not.exist')
    })
})

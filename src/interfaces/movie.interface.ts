interface MovieResult extends Meta {
    data: Movie[]
}

interface Meta {
    page: number
    per_page: number
    total: number
    total_pages: number
}

interface Movie {
    Title: string
    Year: number
    imdbID: string
}
export type { MovieResult, Movie, Meta }

const { Axios } = require('axios')


/**
 * The TMDB Class handles the communication with the TMDB API and provides methods for getting the required content.
 */
class Tmdb {

    constructor() {
        // Create an axios instance
        const API_KEY = process.env['TMDB_API_KEY']
        this.axios = new Axios({ 
            headers: { 
                Authorization: `Bearer ${API_KEY}`,
                Accept: 'application/json'
            }
        })
    }
    
    // TMDB URIs.
    static URI__SEARCH_MULTI = q => `https://api.themoviedb.org/3/search/multi?query=${q}`
    static URI__GET_DETAILS = (type, id) => `https://api.themoviedb.org/3/${type === 'tv' ? 'tv' : 'movie'}/${id}`

    /**
     * Method searches for tmdb contents given an expression.
     * @param q the expression query.
     * @returns tmdb array of movies/series.
     */
    async search(q) {
        // Searching anything using a query
        const multimedia = await this.axios.get(Tmdb.URI__SEARCH_MULTI(q))
        return JSON.parse(multimedia.data).results
    }
    
    /**
     * Method returns the detailed movies/series given an is array.
     * @param ids an id array of th user's favorite movies/series, and an array of possible bad ids.
     */
    async get_favorites(ids) {
        const movies = [], series = [], bad_ids = []
        for (const id of ids) {
            // Iterating and extracting the id literal & type for sorting.
            const [id_num, id_type] = id.split(':')
            const res = await this.axios.get(Tmdb.URI__GET_DETAILS(id_type, id_num))
            const data = JSON.parse(res.data)
            if (res.status === 200) {
                if (id_type === 'tv') {
                    series.push(data)
                }
                else {
                    movies.push(data)
                }
            }
            else {
                bad_ids.push(id)
            }
        }
        return { movies, series, bad_ids }
    }
}


module.exports.Tmdb = Tmdb
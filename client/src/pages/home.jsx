import { useState } from "react"
import { useApiContext } from "../hooks/api.hook"
// Components
import SearchBar from "../components/SearchBar"
import ContentInstance from '../components/ContentInstance'
// Configs
import { GET_SERVER_URL } from "../configs/url.config"


export default function Home() {

    // States
    const { apiCall } = useApiContext()
    const [data, setData] = useState({
        isLoading: false,
        finished: false,
        movies: [],
        series: []
    })

    // Handlers
    const onSearch = async q => {
        try {
            setData(s => ({...s, isLoading: true}))
            const res = await apiCall(GET_SERVER_URL(`tmdb/search/${q}`), 'GET')
            setData({
                isLoading: false,
                finished: true,
                movies: res.data.data.filter(d => d.media_type === 'movie'),
                series: res.data.data.filter(d => d.media_type !== 'movie'),
            })
        }
        catch (err) {}
    }
    const onItemClickHandler = async data => {
        // A click handler for every movie/series item
        try {
            console.log(data)
            await apiCall(GET_SERVER_URL(`tmdb/favorites/${data.id}/${data.media_type}`), 'PUT')
            alert(`"${data.title}" added to favorites.`)
        }
        catch (err) {
            alert('Error: unauthenticated user')
        }
    }

    return (
        <div className="Home">
            <h2 className="title">Search Movies and TV Series</h2>
            
            <SearchBar onSearch={onSearch} />

            { data.isLoading && <>
                <br />
                <img className="loading" src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="Loading.." /> 
            </> }

            {data.finished && <div className="details">

                <div className={`list ${data.movies.length % 2 === 0 ? '' : 'uneven'}`}>
                    <h3>Movies</h3>
                    { data.movies.map(m => <ContentInstance data={m} isMovie={true} onClick={onItemClickHandler} />) }
                </div>
                <div className={`list ${data.series.length % 2 === 0 ? '' : 'uneven'}`}>
                    <h3>TV Series</h3>
                    { data.series.map(s => <ContentInstance data={s} isMovie={false} onClick={onItemClickHandler} />) }
                </div>

            </div> }
        </div>
    )
}
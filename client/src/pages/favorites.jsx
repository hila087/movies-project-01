import { useEffect, useState } from "react"
import { useApiContext } from "../hooks/api.hook"
// Components
import ContentInstance from "../components/ContentInstance"
// Configs
import { GET_SERVER_URL } from "../configs/url.config"


export default function Favorites() {

    // States
    const { apiCall } = useApiContext()
    const [data, setData] = useState({
        isLoading: true,
        movies: [],
        series: [],
        viewDetails: null
    })
    // Handlers
    const loadFavorites = async () => {
        try {
            const res = await apiCall(GET_SERVER_URL('tmdb/favorites'), 'GET')
            setData({
                movies: res.data.data.movies,
                series: res.data.data.series,
                isLoading: false
            })
        }
        catch (err) {}
    }
    const onItemDeleteHandler = async (id, type) => {
        try {
            await apiCall(GET_SERVER_URL(`tmdb/favorites/${id}/${type}`), 'DELETE')
            if (type == 'movie') {
                setData(s => ({ ...s, movies: data.movies.filter(m => m.id !== id) }))
            }
            else {
                setData(s => ({ ...s, series: data.series.filter(s => s.id !== id)}))
            }
        }
        catch (err) {}
    }
    const onItemClickHandler = data => {
        setData(s => ({...s, viewDetails: data}))
    }

    // Load data on init
    useEffect(() => {
        loadFavorites()
    }, [])

    return (
        <div className="Favorite">
            
            <h2 className="title">Favorites</h2>

            { data.isLoading && 
                <img className="loading" src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="Loading.." /> }
            
            { !data.isLoading && <div className="details">
                <div className={`list ${data.series.length % 2 === 0 ? '' : 'uneven'}`}>
                    <h3>Movies</h3>
                    { data.movies.map(m => <ContentInstance data={m} isMovie={true} onDelete={onItemDeleteHandler} onClick={onItemClickHandler} />) }
                </div>
                <div className={`list ${data.series.length % 2 === 0 ? '' : 'uneven'}`}>
                    <h3>TV Series</h3>
                    { data.series.map(s => <ContentInstance data={s} isMovie={false} onDelete={onItemDeleteHandler} onClick={onItemClickHandler} />) }
                </div>
            </div> }

            {/* details viewer modal */}
            { !!data.viewDetails && <div className="item-viewer-wrapper">
                <div className="item-viewer">
                    <h3>{data.viewDetails.title ?? data.viewDetails.name}</h3>
                    <p><span>Plot:</span> {data.viewDetails.overview ?? 'Unavaliable'}</p>
                    <p><span>Directors:</span> {data.viewDetails.directors?.join(', ') ?? 'Unavaliable'}</p>
                    <p><span>Actors:</span> {data.viewDetails.actorList?.join(', ') ?? 'Unavaliable'}</p>
                    <p><span>Countries:</span> {data.viewDetails.countries?.join(', ') ?? 'Unavaliable'}</p>
                    <p><span>Year:</span> {data.viewDetails.year ?? 'Unavaliable'}</p>
                </div>

                <button className="quit" onClick={() => setData(s => ({...s, viewDetails: null}))} title="Quit">×</button>
            </div> }
        </div>
    )
}
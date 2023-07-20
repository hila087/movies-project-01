

/**
 * Component displayys an item representing a movie/series. 
 */
export default function ContentInstance({ data, isMovie, onClick, onDelete }) {
    // Handlers
    const onDeleteHandler = e => {
        e.stopPropagation()
        onDelete?.(data.id, isMovie ? 'movie' : 'tv')
    }
    console.log(data)

    return (
        <section className="content-instance" key={data.id} onClick={() => onClick({
            overview: data.overview,
            directors: isMovie ? [] : data.created_by?.map(a => a.name) ?? [],
            countries: data.production_countries?.map(c => c.iso_3166_1) ?? [],
            year: new Date(isMovie ? data.release_date : data.first_air_date).getFullYear(),
            id: data.id,
            media_type: isMovie ? 'movie' : 'tv',
            title: data.title ?? data.name
        })}>
            <img src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`} alt={data.title} onError={e => e.target.src = 'https://halfhitchbrewing.ca/wp-content/uploads/2019/03/no-image1.jpg'} />
            <p>{isMovie ? data.title : data.name}</p>

            {/* delete instance button */}
            {!!onDelete && <button className="delete" onClick={onDeleteHandler}>Delete</button>}
        </section>
    )
}
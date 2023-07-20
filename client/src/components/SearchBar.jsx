import { useState } from "react"


export default function SearchBar({ onSearch }) {

    // States
    const [data, setData] = useState({
        isSearching: false,
        q: ''
    })

    // Handlers
    const onChangeHandler = e => {
        setData(s => ({...s, q: e.target.value}))
    }
    const onKeyDownHandler = async e => {
        if (e.key === 'Enter') {
            onSearch(data.q)
            setData(s => ({...s, isSearching: false}))
        }
    }

    return (
        <div className="SearchBar">
            <button onClick={() => setData(s => ({...s, isSearching: !data.isSearching}))}>
                {data.isSearching ? 'Hide ' : ''}Search
            </button>

            { data.isSearching && <input type="text"
                    placeholder="Enter movie or TV series" 
                    onChange={onChangeHandler} 
                    onKeyDown={onKeyDownHandler} 
                    autoFocus={true} />
            }
        </div>
    )
}
import {useState, useEffect} from 'react'
import Movie from './Movie'

const API_URL = 
    "https://api.themoviedb.org/3/discover/movie?api_key=65e043c24785898be00b4abc12fcdaae&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

const CONFIG_URL =
    "https://api.themoviedb.org/3/configuration?api_key=65e043c24785898be00b4abc12fcdaae";

const fetchMovies = async (page) => {
    const res = await fetch(API_URL + `&page=${page}`)
    return await res.json();
}

const MoviesList = () => {
    const [movies, setMovies] = useState({});
    const [config, setConfig] = useState({});
    const [page, setPage] = useState(1)

    const getConfig = async () => {
        try {
            const res = await fetch(CONFIG_URL);
            const config = await res.json();
            setConfig(config)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const getMovies = async () => {
            try {
                const movies = await fetchMovies(page);
                setMovies(movies)
                console.log(movies);
            } catch (err) {
                console.log(err);
          }
        }
        getMovies();
    },[page])

    useEffect(() => {
        getConfig();
    }, [])


  return (
    <>
    <div className="text-2xl mb-4">
        <span className="mr-4">
            Page: <span className="text-red-500 font-bold">{page}</span>
        </span>
        {page >= 3 && (
          <button 
            onClick={() => setPage(1)}
            disabled={page <= 1}
            className="btn-primary">
              Page 1     
          </button>
        )}
        <button 
          onClick={() => setPage((x) => x - 1)}
          disabled={page <= 1}
          className="btn-primary">
            Prev     
        </button>
        <button 
          onClick={() => setPage((x) => x + 1)}
          disabled={page >= 500}
          className="btn-primary">
            Next     
        </button>
        {page < 500 && (
          <button 
            onClick={() => setPage(500)}
            disabled={page >= 499}
            className="btn-primary">
              Page 500     
          </button>
        )}
    </div>
    <div className="grid grid-cols-4 gap-4">
        { movies?.results && 
            movies.results.map((m) => <Movie key={m.id} item={m} config={config} />)}
    </div>
    </>
  )
}

export default MoviesList
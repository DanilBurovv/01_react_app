import {useState, useEffect} from 'react'
import Movie from './Movie'

const API_URL = 
    "https://api.themoviedb.org/3/discover/movie?api_key=65e043c24785898be00b4abc12fcdaae&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

const MoviesList = () => {
    const [movies, setMovies] = useState({});
    const [error, setError] = useState(null);

    const getMovies = async () => {
        setError(null)
        try {
            const res = await fetch(API_URL);
            const movies = await res.json();
            setMovies(movies)
        } catch (err) {
            setError(err.message)
            console.log(err);
        }
    }

    useEffect(() => {
        getMovies();
    }, [])


  return (
    <div className="grid grid-cols-4 gap-4">
        {error && <h1 className="text-3xl text-red-800 text-center">Error</h1> }
        {!error && 
            movies?.results && 
            movies.results.map((m) => <Movie key={m.id} item={m} />)}
    </div>
  )
}

export default MoviesList
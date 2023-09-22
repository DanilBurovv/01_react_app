import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const KEY = process.env.REACT_APP_MOVIE_KEY;
const GENRES_LIST_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=65e043c24785898be00b4abc12fcdaae&language=en-US`;

const HomePage = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchGenres() {
      setLoading(true);
      try {
        const res = await fetch(GENRES_LIST_URL);
        const { genres } = await res.json();
        setGenres(genres);
        console.log(genres);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchGenres();
  }, []);

  return (
    <>
      <h1 className="text-3xl text-center">Genres</h1>
      {loading && <FaSpinner className="animate-spin h-20 w-20" />}
      <div className="grid grid-cols-4 gap-4">
        {genres &&
          genres?.map((g) => (
            <Link
              key={g.id}
              to={`/movies/genres/${g.id}`}
              className="bg-cyan-600 text-white px-3 py-6 text-center"
            >
              {g.name}
            </Link>
          ))}
      </div>
    </>
  );
};

export default HomePage;

import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";

function getMovieUrl(movie_id) {
  return `https://api.themoviedb.org/3/movie/${movie_id}?api_key=65e043c24785898be00b4abc12fcdaae&language=en-US`;
}

async function fetchMovie(id) {
  const res = await fetch(getMovieUrl(id));
  return await res.json();
}

const MovieDetails = ({ config }) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function getMovie() {
      setLoading(true);
      try {
        const movie = await fetchMovie(id);
        setMovie(movie);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    getMovie();
  }, [id]);

  return (
    <>
      {loading && <FaSpinner className="animate-spin h-10 w-10 ml-3" />}
      <div className="grid grid-cols-[300px_1fr] gap-4">
        {config.images?.base_url && (
          <div className="px-4">
            <img
              className="w-full max-w-full shadow-md shadow-slate-600 mb-4"
              src={config?.images.base_url + "w500" + movie.poster_path}
              alt={movie.title + "poster"}
            />
          </div>
        )}
        <div>
          <h1 className="text-3xl mb-3">{movie.title}</h1>
          <p className="mb-3 max-w-2xl">{movie.overview}</p>
          <div className="flex mb-3">
            <p className="w-[100px] font-medium">Country: </p>
            {movie?.production_countries &&
              movie.production_countries.map((c, index, array) => (
                <div key={c.id}>
                  <p className="me-4">
                    {c.name}
                    {index !== array.length - 1 && <span>,</span>}
                  </p>
                </div>
              ))}
          </div>
          <div className="flex mb-3">
            <p className="w-[100px] font-medium">Company: </p>
            {movie?.production_companies &&
              movie.production_companies.map((c, index, array) => (
                <div key={c.id}>
                  <p className="me-4">
                    {c.name}
                    {index !== array.length - 1 && <span>,</span>}
                  </p>
                </div>
              ))}
          </div>
          <div className="flex mb-3">
            <p className="w-[100px] font-medium">Genre:</p>
            {movie?.genres &&
              movie.genres.map((g, index, array) => (
                <Link
                  key={g.id}
                  to={` /../../../genres/${g.id}`}
                  className="me-4 text-red-700 underline md:hover:no-underline cursor-pointer max-w-fit"
                >
                  {g.name}
                  {index !== array.length - 1 && <span>,</span>}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;

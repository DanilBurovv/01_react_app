import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../common/Pagination";
import Movie from "./Movie";
import { ArrToMap } from "../../utils";

const KEY = process.env.REACT_APP_MOVIE_KEY;
const GENRES_URL =
  "https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false";

const GENRES_LIST_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=65e043c24785898be00b4abc12fcdaae&language=en-US`;

const GenresList = ({ config }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [gName, setGName] = useState("");

  const { id } = useParams();

  useEffect(() => {
    async function fetchMovies() {
      if (!id) {
        return;
      }
      const URL = GENRES_URL + `&with_genres=${id}&page=${page}&api_key=${KEY}`;
      setLoading(true);
      try {
        const res = await fetch(URL);
        const movies = await res.json();
        setMovies(movies);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [page, id]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch(GENRES_LIST_URL);
        const { genres } = await res.json();
        const ob = ArrToMap(genres);
        setGName(ob[id].name);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchGenres();
  }, [id]);

  return (
    <>
      <Pagination page={page} setPage={setPage} loading={loading} />
      <h1 className="text-3xl text-center mb-4">Genre : {gName}</h1>
      <div className="grid grid-cols-4 gap-4">
        {movies?.results &&
          movies.results.map((m) => (
            <Movie key={id} config={config} item={m} />
          ))}
      </div>
    </>
  );
};

export default GenresList;

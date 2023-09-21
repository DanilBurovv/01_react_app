import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MovieList from "./MoviesList";
import MovieDetails from "./MovieDetails";

const KEY = process.env.REACT_APP_MOVIE_KEY;
const CONFIG_URL = `https://api.themoviedb.org/3/configuration?api_key=${KEY}`;

const MoviePage = () => {
  const [config, setConfig] = useState({});

  const getConfig = async () => {
    try {
      const res = await fetch(CONFIG_URL);
      const config = await res.json();
      setConfig(config);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getConfig();
  }, []);

  return (
    <>
      <Routes>
        <Route path="list" element={<MovieList config={config} />} />
        <Route path="detail/:id" element={<MovieDetails config={config} />} />
      </Routes>
    </>
  );
};

export default MoviePage;

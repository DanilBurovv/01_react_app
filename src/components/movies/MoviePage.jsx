import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MovieList from "./MoviesList";
import MovieDetails from "./MovieDetails";

const CONFIG_URL =
  "https://api.themoviedb.org/3/configuration?api_key=65e043c24785898be00b4abc12fcdaae";

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

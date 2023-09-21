import { Routes, Route } from "react-router-dom";
import MovieList from "./MoviesList";

const MoviePage = () => {
  return (
    <>
      <Routes>
        <Route path="list" element={<MovieList />} />
      </Routes>
    </>
  );
};

export default MoviePage;

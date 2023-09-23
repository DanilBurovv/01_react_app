import { Routes, Route } from "react-router-dom";
import MoviePage from "./components/movies/MoviePage";
import HomePage from "./components/home/HomePage";
import About from "./components/about/About";
import Nav from "./components/common/Nav";
import PageNotFound from "./components/common/PageNotFound";

function App() {
  return (
    <div className="container mx-auto min-h-screen px-6 bg-slate-300">
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/*" element={<MoviePage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
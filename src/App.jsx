import { useState, useEffect } from "react";
// import { Routes, Route, NavLink } from "react-router-dom";
import { createClient } from "contentful";
import NavBar from "./components/NavBar";
import MovieDetail from "./components/MovieDetail";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: spaceId,
  accessToken: accessToken,
});

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await client.getEntries({
          content_type: "movie",
        });
        //------------------------------------------------------------------------------------------

        console.log("First item structure:", response.items[0]);

        //------------------------------------------------------------------------------------------

        setMovies(response.items);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  //----------------------------RANDOM MOVIE FOR BACKGROUND---------------
  const getRandomMovie = () => {
    if (movies.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
  };

  //----------------------------RANDOM MOVIES FOR MINI POSTERS---------------

  const getRandomMovies = (count) => {
    const randomMovies = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      randomMovies.push(movies[randomIndex]);
    }
    return randomMovies;
  };

  //--------------------------------------------------------------------------

  return (
    <Router>
      <div className="position: relative bg-gray-900 min-h-screen ">
        <NavBar />

        <div className="flex justify-center">
          {getRandomMovie() && (
            <img
              className="self-center h-1/4 w-2/4"
              src={getRandomMovie().fields.backgroundImage.fields.file.url}
              alt=""
            />
          )}
        </div>

        <div className="main-selling-point text-center">
          <p className=" text-white text-4xl ">Track films you’ve watched.</p>
          <p className="text-white text-4xl">Save those you want to see.</p>
          <p className="text-white text-4xl">Tell your friends what’s good. </p>
        </div>

        <div className="flex justify-center">
          <button className=" bg-green-700 hover:bg-green-800 text-white font-bold p-3 m-9 rounded">
            Get Started - It's Free
          </button>
        </div>

        {!isLoading && (
          <div className="flex justify-center">
            {getRandomMovies(6).map((movie, index) => (
              <MoviePoster key={index} movie={movie} />
            ))}
          </div>
        )}

        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/" element={<MovieList movies={movies} />} />
        </Routes>
      </div>
    </Router>
  );
}

function MoviePoster({ movie }) {
  const navigate = useNavigate();

  const handlePosterClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <img
      className="w-40 h-auto m-2 rounded cursor-pointer"
      src={movie.fields.poster.fields.file.url}
      alt=""
      onClick={() => handlePosterClick(movie.sys.id)}
    />
  );
}

function MovieList({ movies }) {
  const navigate = useNavigate();

  const handlePosterClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="flex flex-wrap justify-center p-4">
      {movies.map((movie) => (
        <div
          key={movie.sys.id}
          className="m-4 cursor-pointer"
          onClick={() => handlePosterClick(movie.sys.id)}
        >
          <img
            src={movie.fields.poster.fields.file.url}
            alt={movie.fields.title}
            className="w-48 h-72 object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export default App;

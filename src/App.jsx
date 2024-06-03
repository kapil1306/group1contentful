import { useState, useEffect } from "react";
import { createClient } from "contentful";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

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
    <div className="position: relative bg-gray-900 min-h-screen ">
      <NavBar />

      <div className="flex justify-center">
        {getRandomMovie() && (
          <img
            className="main-background-image self-center h-1/4 w-2/4 "
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

      <p className="text-gray-500 font-bold text-center">
        The social network for film lovers.
      </p>
      <br />
      {!isLoading && (
        <div className="flex flex-wrap justify-center">
          {getRandomMovies(6).map((movie, index) => (
            <img
              key={index}
              className="random-movies w-40 h-auto m-2 rounded"
              src={movie.fields.poster.fields.file.url}
              alt=""
            />
          ))}
        </div>
      )}

      {/* <div className="flex justify-center">
          {isLoading ? (
            <p>Loading movies...</p>
          ) : (
            <ul>
              {movies.map((movie, index) => (
                <li key={index}>
                  <img
                    className=" shadow-md rounded-lg w-96 self-center m-14 p-14 "
                    src={movie.fields.poster.fields.file.url}
                  />
                  {movie.fields.title}
                </li>
              ))}
            </ul>
          )}
        </div> */}
      <Footer />
    </div>
  );
}

export default App;

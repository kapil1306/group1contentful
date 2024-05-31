import { useState, useEffect } from "react";
import { createClient } from "contentful";

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: spaceId,
  accessToken: accessToken,
});

function App() {
  const [movies, setMovies] = useState([]);

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
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const isLoading = movies.length === 0;

  return (
    <div>
      {isLoading ? (
        <p>Loading movies...</p>
      ) : (
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>
              <img
                className="shadow-md rounded-lg w-96"
                src={movie.fields.poster.fields.file.url}
              />
              {movie.fields.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

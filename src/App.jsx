import { useState, useEffect } from "react";
import { createClient } from "contentful";
// import ContentfulClient from "./ContentfulClient";

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
        const fetchedMovies = response.items.map((item) => ({
          title: item.fields.title,
          poster: item.fields.poster.fields.file.url,
        }));
        setMovies(fetchedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const isLoading = movies.length === 0;

  return (
    <div className="App">
      {isLoading ? (
        <p>Loading movies...</p>
      ) : (
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>
              <img
                src={movie.poster}
                alt={movie.title}
                style={{ width: "120px" }}
              />
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

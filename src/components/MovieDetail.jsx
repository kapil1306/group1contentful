import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createClient } from "contentful";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await client.getEntry(id);
        setMovie(response.fields);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  return (
    <div>
      <div
        className="bg-cover bg-center h-64 flex items-center justify-center"
        style={{ backgroundImage: `url(${movie.background.fields.file.url})` }}
      >
        <h1 className="text-white text-4xl font-bold bg-black bg-opacity-50 p-4">
          {movie.title}
        </h1>
      </div>
      <div className="p-4">
        <p className="mb-4">{movie.description}</p>
        <h2 className="text-2xl font-bold mb-2">Cast</h2>
        <ul className="list-disc list-inside">
          {movie.cast.map((actor) => (
            <li key={actor} className="mb-1">
              {actor}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center mt-4">
        <iframe
          width="560"
          height="315"
          src={movie.trailer}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full max-w-4xl"
        ></iframe>
      </div>
    </div>
  );
}

export default MovieDetail;

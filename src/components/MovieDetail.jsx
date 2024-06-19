import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createClient } from "contentful";

// const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
// const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

// const client = createClient({ space: spaceId, accessToken: accessToken });

function MovieDetail() {
  // const { movieId } = useParams();
  // const [movie, setMovie] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  // console.log(movieId)

  // useEffect(() => {
  //   const fetchMovie = async () => {
  //     try {
  //       const response = await client.getEntry(movieId);
  //       setMovie(response.fields);
  //     } catch (error) {
  //       console.error("Error fetching movie details:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchMovie();
  // }, []);
  // }, [movieId]);

  // if (isLoading || !movie) {
  //   return <p>{isLoading ? "Loading movie details..." : "Movie not found"}</p>;
  // }
  return (
    // <div className="movie-detail">
    //   {movie.fields.poster && (
    //     <img
    //       src={movie.fields.poster.fields.file.url + "?w=500&h=300&fit=fill"}
    //       alt={movie.fields.title}
    //       className="movie-detail__poster"
    //     />
    //   )}
    //   <h1 className="movie-detail__title">{movie.fields.title}</h1>
    //   <p className="movie-detail__release-date">
    //     Release Date: {new Date(movie.fields.releaseDate).toLocaleDateString()}
    //   </p>
    //   <p className="movie-detail__director">Directed by: {movie.fields.director}</p>
    //   <p className="movie-detail__genre">Genre: {movie.fields.genre.join(", ")} </p>
    //   <div className="movie-detail__rating">Rating: {movie.fields.rating}</div>
    //   <p className="movie-detail__description">{movie.fields.description}</p>
    // </div>
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export default MovieDetail;
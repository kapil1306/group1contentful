import { useState, useEffect } from "react";
import { createClient } from "contentful";

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: spaceId,
  accessToken: accessToken,
});

function MainListSection() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await client.getEntries({
          content_type: "movie",
        });

        // Shuffle movies array
        const shuffledMovies = response.items.sort(() => Math.random() - 0.5);

        setMovies(shuffledMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const isLoading = movies.length === 0;

  function renderStars(rating) {
    const stars = Math.round(rating);
    const starIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="green"
        className="size-5"
      >
        <path
          fillRule="evenodd"
          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
          clipRule="evenodd"
        />
      </svg>
    );

    return (
      <div className="flex">
        {Array(stars)
          .fill()
          .map((_, i) => (
            <span key={`star-${i}`}>{starIcon}</span>
          ))}
      </div>
    );
  }
  // Collect unique genres
  const uniqueGenres = new Set();
  movies.forEach((movie) => {
    movie.fields.genre.forEach((genre) => {
      uniqueGenres.add(genre);
    });
  });
  // Convert to array and sort alphabetically
  const sortedGenres = Array.from(uniqueGenres).sort();
  const uniqueRatings = new Set();

  //------------------------------------------
  return (
    <div className="pb-20 bg-neutral-900 flex justify-center">
      <section className="bg-neutral-900 flex flex-col gap-28 lg:flex-row w-auto justify-center">
        <main className="float-left w-full sm:w-[630px] mb-6 sm:mb-0 px-4 lg:px-0">
          <div className="border-b border-slate-400 pb-2">
            <h4 className=" float-left uppercase text-[12px] font-semi text-slate-400 tracking-wide -mt-[60px] pt-12 pb-2 tracking-[.15em] ">
              Popular movies this week
            </h4>
            <p className="float-right -mr[600px] uppercase text-[10px] font-semi text-slate-400 tracking-wide -mt-[60px] pt-12 pb-1 tracking-[.15em] cursor-pointer hover:text-sky-500  ">
              more
            </p>
          </div>

          <div className="float-left w-auto">
            {isLoading ? (
              <p>Loading movies...</p>
            ) : (
              <ul className="flex flex-col divide-y divide-slate-400">
                {movies.map((movie, index) => (
                  <li className="flex items-center pt-5 pb-10" key={index}>
                    <img
                      className="shadow-md rounded w-[76px] h-[111px] cursor-pointer border-[3px] border-green-600 border-opacity-0 hover:border-opacity-100"
                      src={movie.fields.poster.fields.file.url}
                    />
                    <div className="">
                      <div className="flow-root">
                        <h2 className=" float-left align-top font-serif text-slate-50 text-[25px] font-semibold pl-4 hover:text-sky-500 cursor-pointer shrink-0">
                          {movie.fields.title}
                        </h2>
                        <time className="float-left pl-4 uppercase text-[20px] font-light text-slate-400 tracking-wide pt-1 pb-2 tracking-[.15em] ">
                          {new Date(
                            movie.fields.releaseDate
                          ).toLocaleDateString(undefined, { year: "numeric" })}
                        </time>
                      </div>
                      <div className="line-clamp-3 uppercase text-[12px] font-semi text-slate-400 tracking-wide pl-4 pb-2 tracking-[.15em] ">
                        Directed by {movie.fields.director}
                      </div>
                      <div className=" text-[12px] font-semi text-slate-400 tracking-wide pl-4 pb-2 tracking-[.15em] ">
                        {movie.fields.genre.join(", ")}
                      </div>

                      <div className="flex">
                        <div className="flex flex-row pl-4">
                          {renderStars(movie.fields.rating)}
                        </div>
                        <div className="flex flex-row items-end uppercase pl-1 text-slate-400 text-[9px]">
                          Average rating
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>

        <aside className="w-full justify-center md: -mt-[80px] lg:mt-0 lg:w-[230px] mx-auto px-4">
          <div>
            <div className="border-b border-slate-400 pb-2 w-[220px]">
              <h4 className="float-left uppercase text-[12px] font-semi text-slate-400 tracking-wide pb-2 -mt-[12px] tracking-[.15em] ">
                Search by genre
              </h4>
              <p className="float-right uppercase text-[10px] font-semi text-slate-400 tracking-wide pb-1 -mt-[12px] tracking-[.15em] cursor-pointer hover:text-sky-500 ">
                more
              </p>
            </div>
            <div className="w-auto">
              <ul className="grid gap-2 grid-cols-3 grid-rows-5 mt-2 w-[220px]">
                {sortedGenres.map((genre, index) => (
                  <li
                    className="w-[70px] flex items-center justify-center pt-2 bg-slate-700 rounded cursor-pointer border-[3px] border-green-600 border-opacity-0 hover:border-opacity-100"
                    key={index}
                  >
                    <div className="flow-root">
                      <div className="text-[12px] font-semi text-slate-400 tracking-wide pb-2 tracking-[.15em] ">
                        {genre}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="border-b border-slate-400 pt-20 pb-2 w-[220px]">
              <h4 className="float-left uppercase text-[12px] font-semi text-slate-400 tracking-wide pb-2 -mt-[11px] tracking-[.15em] ">
                Search by rating
              </h4>
              <p className="float-right uppercase text-[10px] font-semi text-slate-400 tracking-wide pb-1 -mt-[11px] tracking-[.15em] cursor-pointer hover:text-sky-500 ">
                more
              </p>
            </div>
            <div className="w-[220px]">
              <ul className="grid gap-2 grid-cols-3 grid-rows-2 mt-2 w-[220px]">
                {movies.forEach((movie) => {
                  uniqueRatings.add(Math.round(movie.fields.rating));
                })}
                {Array.from(uniqueRatings)
                  .sort((a, b) => b - a) //sorts ratings in descending order
                  .map((rating, index) => (
                    <li
                      className="w-[70px] flex items-center justify-center pt-2 bg-slate-700 rounded cursor-pointer border-[3px] border-green-600 border-opacity-0 hover:border-opacity-100"
                      key={index}
                    >
                      <div className="flow-root">
                        <div className="text-[12px] font-semi text-slate-400 tracking-wide pb-2 tracking-[.15em] ">
                          {rating}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="green"
                            className="size-5 -mt-5 ml-2"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default MainListSection;

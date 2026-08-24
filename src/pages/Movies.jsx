import { useEffect, useState } from "react";

import { getAllMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const data = await getAllMovies(1);

        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Movies error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const loadMore = async () => {
    if (loading || page >= totalPages) {
      return;
    }

    try {
      setLoading(true);

      const nextPage = page + 1;

      const data = await getAllMovies(nextPage);

      setMovies((prevMovies) => [...prevMovies, ...(data.results || [])]);

      setPage(nextPage);
    } catch (error) {
      console.error("Load more error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && movies.length === 0) {
    return <Loader text="Loading movies..." />;
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">Movies</h1>

          <p className="mt-2 text-zinc-400">
            Explore popular movies from around the world.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <MovieCard
              key={`${movie.id}-${movie.release_date}`}
              movie={movie}
            />
          ))}
        </div>

        {loading && movies.length > 0 && (
          <div className="mt-10 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-800 border-t-red-500" />
          </div>
        )}

        {!loading && page < totalPages && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={loadMore}
              className="rounded-lg bg-red-500 px-7 py-3 font-semibold transition hover:bg-red-600"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </main>
  );
}


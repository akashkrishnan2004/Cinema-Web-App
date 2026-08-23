import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

import { searchMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Search movies
  const handleSearch = async (e) => {
    e.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      setPage(1);

      const data = await searchMovies(trimmedQuery, 1);

      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error("Search error:", error);

      setMovies([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Load more movies
  const loadMore = async () => {
    if (loading || page >= totalPages) {
      return;
    }

    try {
      setLoading(true);

      const nextPage = page + 1;

      const data = await searchMovies(query.trim(), nextPage);

      setMovies((prevMovies) => [...prevMovies, ...(data.results || [])]);

      setPage(nextPage);
    } catch (error) {
      console.error("Load more error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">Search Movies</h1>

          <p className="mt-2 text-zinc-400">
            Find your favorite movies on CineScope.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-10 flex w-full max-w-3xl">
          <div className="relative flex-1">
            <SearchIcon
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie..."
              className="w-full rounded-l-xl border border-zinc-700 bg-zinc-900 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-r-xl bg-red-500 px-6 font-semibold transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Search
          </button>
        </form>

        {/* Initial Loading */}
        {loading && movies.length === 0 && (
          <Loader text="Searching movies..." />
        )}

        {/* Search Results */}
        {!loading && movies.length > 0 && (
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Search Results</h2>

              <p className="text-sm text-zinc-500">
                Page {page} of {totalPages}
              </p>
            </div>

            {/* Movie Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {movies.map((movie) => (
                <MovieCard
                  key={`${movie.id}-${movie.release_date}`}
                  movie={movie}
                />
              ))}
            </div>

            {/* Loading More */}
            {loading && (
              <div className="mt-10 flex justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-800 border-t-red-500" />
              </div>
            )}

            {/* Load More */}
            {!loading && page < totalPages && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={loadMore}
                  className="rounded-lg bg-red-500 px-7 py-3 font-semibold text-white transition hover:bg-red-600"
                >
                  Load More
                </button>
              </div>
            )}

            {/* End of Results */}
            {!loading && page >= totalPages && (
              <p className="mt-10 text-center text-sm text-zinc-500">
                You've reached the end of the results.
              </p>
            )}
          </section>
        )}

        {/* No Results */}
        {!loading && searched && movies.length === 0 && (
          <div className="flex min-h-87.5 items-center justify-center">
            <div className="text-center">
              <SearchIcon size={55} className="mx-auto mb-5 text-zinc-700" />

              <h2 className="text-xl font-semibold">No movies found</h2>

              <p className="mt-2 text-zinc-500">
                Try searching with a different movie name.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Search;

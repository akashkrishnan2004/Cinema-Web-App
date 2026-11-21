import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";

import { searchMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

export default function Search() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Live Search Suggestions
  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    let active = true;

    const timer = setTimeout(async () => {
      try {
        setSuggestionLoading(true);

        const data = await searchMovies(trimmedQuery, 1);

        if (active) {
          setSuggestions((data.results || []).slice(0, 6));
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error("Suggestion error:", error);

        if (active) {
          setSuggestions([]);
        }
      } finally {
        if (active) {
          setSuggestionLoading(false);
        }
      }
    }, 400);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

  // Search Movies
  const performSearch = async (searchQuery) => {
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) return;

    try {
      setLoading(true);
      setSearched(true);
      setShowSuggestions(false);
      setSuggestions([]);
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

  // Search Form
  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(query);
  };

  // Click Suggestion - Direct Movie Navigation
  const handleSuggestionClick = (movie) => {
    setShowSuggestions(false);
    setSuggestions([]);

    navigate(`/movie/${movie.id}`);
  };

  // Load More Movies
  const loadMore = async () => {
    if (loading || page >= totalPages) return;

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
            Find your favorite movies on CinemaPeedika.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-10 flex w-full max-w-3xl">
          <div className="relative flex-1">
            {/* Search Icon */}
            <SearchIcon
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            {/* Search Input */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                if (suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setShowSuggestions(false);
                }
              }}
              placeholder="Search for a movie..."
              autoComplete="off"
              className="w-full rounded-l-xl border border-zinc-700 bg-zinc-900 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500"
            />

            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">
                {suggestionLoading && suggestions.length === 0 ? (
                  <p className="px-5 py-4 text-sm text-zinc-500">
                    Finding movies...
                  </p>
                ) : suggestions.length > 0 ? (
                  suggestions.map((movie) => (
                    <button
                      key={movie.id}
                      type="button"
                      onClick={() => handleSuggestionClick(movie)}
                      className="flex w-full items-center gap-4 border-b border-zinc-800/70 px-4 py-3 text-left transition hover:bg-zinc-900 last:border-none"
                    >
                      {/* Movie Poster */}
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                            : "/no-poster.png"
                        }
                        alt={movie.title}
                        className="h-16 w-11 shrink-0 rounded-md object-cover"
                      />

                      {/* Movie Details */}
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-medium text-white">
                          {movie.title}
                        </h3>

                        <p className="mt-1 text-xs text-zinc-500">
                          {movie.release_date
                            ? movie.release_date.slice(0, 4)
                            : "Release date unavailable"}
                        </p>
                      </div>

                      <SearchIcon
                        size={17}
                        className="shrink-0 text-zinc-500"
                      />
                    </button>
                  ))
                ) : (
                  <p className="px-5 py-4 text-sm text-zinc-500">
                    No matching movies found.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Search Button */}
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
                <MovieCard key={movie.id} movie={movie} />
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
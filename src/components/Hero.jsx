import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Info, Star } from "lucide-react";

import { getTrendingMovie } from "../services/tmdb";

export default function Hero() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchHeroMovie = async () => {
      try {
        const data = await getTrendingMovie();
        setMovie(data);
        // console.log(data);
      } catch (error) {
        console.error("Hero error:", error);
      }
    };

    fetchHeroMovie();
  }, []);

  if (!movie) {
    return <div className="h-[70vh] animate-pulse bg-zinc-900" />;
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      {/* Background */}
      {backdropUrl && (
        <img
          src={backdropUrl}
          alt={movie.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />

      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/20" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-center px-6 py-20">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-red-500">
            Trending Now
          </p>

          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            {movie.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-zinc-300">
            <span className="flex items-center gap-1 text-yellow-400">
              <Star size={17} fill="currentColor" />
              {movie.vote_average.toFixed(1)}
            </span>

            <span>
              {movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : "N/A"}
            </span>

            <span>Movie</span>
          </div>

          <p className="mt-5 line-clamp-3 text-sm leading-7 text-zinc-300 sm:text-base">
            {movie.overview}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {/* <button className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200">
              <Play size={18} fill="currentColor" />
              Watch Trailer
            </button> */}

            <Link
              to={`/movie/${movie.id}`}
              className="flex items-center gap-2 rounded-lg bg-zinc-700/80 px-5 py-3 font-semibold text-white transition hover:bg-zinc-600"
            >
              <Info size={18} />
              More Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

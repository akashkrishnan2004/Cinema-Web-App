// function MovieDetails() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-black">
//       <h1 className="text-5xl font-bold text-red-500">
//         MOVIE DETAILS PAGE
//       </h1>
//     </div>
//   );
// }

// export default MovieDetails;

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Clock, CalendarDays } from "lucide-react";

import { getMovieDetails } from "../services/tmdb";

import Loader from "../components/Loader";
import CastCard from "../components/CastCard";
import CrewCard from "../components/CrewCard";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        console.log("Movie ID:", id);

        const data = await getMovieDetails(id);

        console.log("Movie Data:", data);

        setMovie(data);
      } catch (error) {
        console.error("Movie details error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <Loader text="Loading movie details..." />;
  }

  if (!movie) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black">
        <p className="mb-5 text-xl text-white">Movie not found</p>

        <Link
          to="/"
          className="rounded-lg bg-red-500 px-5 py-3 font-semibold text-white hover:bg-red-600"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-poster.png";

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Background */}
      <section className="relative overflow-hidden">
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={movie.title}
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-black/30" />

        <div className="relative mx-auto max-w-7xl px-6 py-10">
          {/* Back Button */}
          <Link
            to="/search"
            className="mb-10 inline-flex items-center gap-2 text-zinc-300 transition hover:text-white"
          >
            <ArrowLeft size={20} />
            Back
          </Link>

          <div className="grid gap-8 md:grid-cols-[280px_1fr]">
            {/* Poster */}
            <div>
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full rounded-xl shadow-2xl"
              />
            </div>

            {/* Movie Information */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold md:text-5xl">{movie.title}</h1>

              {movie.tagline && (
                <p className="mt-3 italic text-zinc-400">"{movie.tagline}"</p>
              )}

              {/* Meta */}
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star size={18} fill="currentColor" />
                  {movie.vote_average.toFixed(1)}
                </span>

                <span className="flex items-center gap-1 text-zinc-400">
                  <CalendarDays size={17}/>
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : "N/A"}
                </span>

                {movie.runtime > 0 && (
                  <span className="flex items-center gap-1 text-zinc-400">
                    <Clock size={17} />
                    {movie.runtime} min
                  </span>
                )}
              </div>

              {/* Genres */}
              <div className="mt-5 flex flex-wrap gap-2">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <p className="mt-6 max-w-3xl leading-7 text-zinc-300">
                {movie.overview || "No overview available."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-5 text-2xl font-bold">Movie Information</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-zinc-900 p-5">
            <p className="text-sm text-zinc-500">Original Title</p>
            <p className="mt-2 font-semibold">{movie.original_title}</p>
          </div>

          <div className="rounded-xl bg-zinc-900 p-5">
            <p className="text-sm text-zinc-500">Language</p>
            <p className="mt-2 font-semibold uppercase">
              {movie.original_language}
            </p>
          </div>

          <div className="rounded-xl bg-zinc-900 p-5">
            <p className="text-sm text-zinc-500">Status</p>
            <p className="mt-2 font-semibold">{movie.status}</p>
          </div>

          <div className="rounded-xl bg-zinc-900 p-5">
            <p className="text-sm text-zinc-500">Budget</p>
            <p className="mt-2 font-semibold">
              {movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}
            </p>
          </div>
        </div>
      </section>

      {/* Cast */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Cast</h2>

          <p className="mt-1 text-sm text-zinc-500">Actors and characters</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {movie.credits?.cast?.slice(0, 12).map((person) => (
            <CastCard key={person.credit_id} person={person} />
          ))}
        </div>
      </section>

      {/* Crew */}
      {/* <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6">
            <h2 className="text-2xl font-bold">Crew</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {
                    movie.credits?.crews?.slice(0,12).map((person) => (
                        <CastCard key={person.credit_id} person={person} />
                    ))
                }
            </div>
        </div>
      </section> */}
      {/* Crew */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Crew</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Directors, writers and other key crew members
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {movie.credits?.crew
            ?.filter(
              (person, index, self) =>
                index ===
                self.findIndex(
                  (item) => item.id === person.id && item.job === person.job,
                ),
            )
            .slice(0, 12)
            .map((person) => (
              <CrewCard key={`${person.id}-${person.job}`} person={person} />
            ))}
        </div>
      </section>

      {/* Production Information */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Production Companies
        </h2>

        <div className="flex flex-wrap gap-4">
          {movie.production_companies?.map((company) => (
            <div
              key={company.id}
              className="flex min-h-25 min-w-45 flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-500 p-5"
            >
              {company.logo_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                  alt={company.name}
                  className="mb-3 max-h-12 max-w-35 object-contain"
                />
              ) : (
                <div className="mb-3 flex h-12 items-center text-sm text-zinc-500">
                  No Logo
                </div>
              )}

              <p className="text-center text-sm font-medium text-zinc-300">
                {company.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default MovieDetails;

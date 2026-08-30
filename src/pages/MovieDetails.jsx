import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Clock, CalendarDays } from "lucide-react";

import {
  getIndianCertification,
  getMovieDetails,
  getMovieTrailer,
  getMovieWatchProviders,
} from "../services/tmdb";

import Loader from "../components/Loader";
import CastCard from "../components/CastCard";
import CrewCard from "../components/CrewCard";
import ProductionCard from "../components/ProductionCard";
import OttProviderCard from "../components/OttProviderCard";

export default function MovieDetails() {
  const { id } = useParams();
  const USD_TO_INR = 95.7;

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [certification, setCertification] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);

        const data = await getMovieDetails(id);
        setMovie(data);

        const trailerData = await getMovieTrailer(id);
        // console.log(trailerData);
        setTrailer(trailerData);

        const providerData = await getMovieWatchProviders(id);
        setProviders(providerData.results?.IN || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchCertification = async () => {
      try {
        const certificationData = await getIndianCertification(id);
        setCertification(certificationData);
        // console.log(certificationData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCertification();
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
      {/* Hero Background Poster */}
      <section className="relative overflow-hidden">
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt={movie.title}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-black/30" />

        <div className="relative mx-auto max-w-7xl px-6 py-10">
          {/* Back Button */}
          <Link
            to="/"
            // className="mb-10 inline-flex items-center gap-2 text-zinc-300 transition hover:text-white"
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 shadow-lg shadow-red-500/10 backdrop-blur-xl transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/20 hover:text-red-300 hover:shadow-red-500/20"
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
                  <CalendarDays size={17} />
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

                {/* Film Certification */}
                {certification && (
                  <span
                    className={`rounded border px-2 py-1 text-sm font-semibold ${
                      certification === "A"
                        ? "border-red-500 bg-red-500/10 text-red-500"
                        : "border-zinc-600 text-zinc-300"
                    }`}
                  >
                    {certification}
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

          {/* <div className="rounded-xl bg-zinc-900 p-5">
            <p className="text-sm text-zinc-500">Budget</p>
            <p className="mt-2 font-semibold">
              {movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}
            </p>
          </div> */}

          <div className="rounded-xl bg-zinc-900 p-5">
            <p className="text-sm text-zinc-500">Budget</p>
            <p className="mt-2 font-semibold">
              {movie.budget
                ? `${Math.round(movie.budget * USD_TO_INR).toLocaleString("en-IN")} ₹`
                : "N/A"}
            </p>
            {/* <p>{movie.budget}</p> */}
          </div>

          {/* <div className="rounded-xl bg-zinc-900 p-5">
            <p className="text-sm text-zinc-500">Collection</p>
            <p className="mt-2 font-semibold">{movie.budget}</p>
          </div> */}

          <div className="rounded-xl bg-zinc-900 p-5">
            <p className="text-sm text-zinc-500">Box Office</p>
            <p className="mt-2 font-semibold">
              {movie.revenue
                ? `${Math.round(movie.revenue * USD_TO_INR).toLocaleString("en-IN")} ₹`
                : "N/A"}
            </p>
          </div>

          {/* Ott */}
          <div className="rounded-xl bg-zinc-900 p-5">
            <p className="text-sm text-zinc-500">OTT</p>
            {/* <p className="mt-2 font-semibold">
              {
                ottProvider.map((provider, index) => (
                  <p>{provider.name}</p>
                ))
              }
            </p> */}
          </div>
        </div>
      </section>

      {trailer && (
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Official Trailer</h2>

            <p className="mt-1 text-sm text-zinc-500">
              Watch the official trailer
            </p>
          </div>

          <div className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* Cast Card */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Cast</h2>

          <p className="mt-1 text-sm text-zinc-500">Actors and characters</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {movie.credits?.cast?.length > 0 ? (
            movie.credits.cast
              .slice(0, 12)
              .map((person) => (
                <CastCard
                  key={person.credit_id}
                  person={person}
                  cast={movie.credits.cast}
                  movieId={movie.id}
                />
              ))
          ) : (
            <p className="col-span-full py-5 text-zinc-500 hover:text-red-500">
              No cast information available.
            </p>
          )}
        </div>
      </section>

      {/* Crew Card */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Crew</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Directors, writers and other key crew members
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {movie.credit_id?.cast?.length > 0 ? (
            movie.credits?.crew
              ?.filter(
                (person, index, self) =>
                  index ===
                  self.findIndex(
                    (item) => item.id === person.id && item.job === person.job,
                  ),
              )
              .slice(0, 12)
              .map((person) => (
                <CrewCard
                  key={`${person.id}-${person.job}`}
                  person={person}
                  crew={movie.credits?.crew}
                  movieId={movie.id}
                />
              ))
          ) : (
            <p className="col-span-full py-5 text-zinc-500  hover:text-red-500">
              No crew information available.
            </p>
          )}
        </div>
      </section>

      {/* Ott Information */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-6 text-2xl font-bold">Where to Watch</h2>

        {/* Streaming */}
        {providers?.flatrate?.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-zinc-300">
              Streaming
            </h3>

            <div className="flex flex-wrap gap-4">
              {providers.flatrate.map((provider) => (
                <OttProviderCard
                  key={provider.provider_id}
                  provider={provider}
                />
              ))}
            </div>
          </div>
        )}

        {/* Rent */}
        {providers?.rent?.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-zinc-300">Rent</h3>

            <div className="flex flex-wrap gap-4">
              {providers.rent.map((provider) => (
                <OttProviderCard
                  key={provider.provider_id}
                  provider={provider}
                />
              ))}
            </div>
          </div>
        )}

        {/* Buy */}
        {providers?.buy?.length > 0 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-zinc-300">Buy</h3>

            <div className="flex flex-wrap gap-4">
              {providers.buy.map((provider) => (
                <OttProviderCard
                  key={provider.provider_id}
                  provider={provider}
                />
              ))}
            </div>
          </div>
        )}

        {!providers?.flatrate?.length &&
          !providers?.rent?.length &&
          !providers?.buy?.length && (
            <p className="text-zinc-500">
              No watch providers available in India.
            </p>
          )}
      </section>

      {/* Production Information */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-5 text-2xl font-bold">Production Companies</h2>
        <div className="flex flex-wrap gap-4">
          {movie.production_companies?.length > 0 ? (
            movie.production_companies.map((company) => (
              <ProductionCard
                key={company.id}
                company={company}
                movieId={movie.id}
              />
            ))
          ) : (
            <p className="text-zinc-500">No production companies available.</p>
          )}
        </div>
      </section>
    </main>
  );
}

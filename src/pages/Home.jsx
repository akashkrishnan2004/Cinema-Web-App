import { useEffect, useState } from "react";

import {
  getTrendingMovies,
  getPopularMovies,
  getUpcomingMovies,
  getIndianMovies,
  getMalayalamMovies,
} from "../services/tmdb";

import MovieSection from "../components/MovieSection";
import Hero from "../components/Hero";
import Loader from "../components/Loader";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [indianMovies, setIndianMovies] = useState([]);
  const [malayalamMovies, setMalayalamMovies] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trending, popular, upcoming, indian, malayalam] =
          await Promise.all([
            getTrendingMovies(),
            getPopularMovies(),
            getUpcomingMovies(),
            getIndianMovies(),
            getMalayalamMovies(),
          ]);

        setTrendingMovies(trending.results);
        setPopularMovies(popular.results);
        setUpcomingMovies(upcoming.results);
        setIndianMovies(indian.results);
        setMalayalamMovies(malayalam.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <Loader text="Loading CinemaPeedika..." />;
  }
  return (
    <main className="min-h-screen bg-black">
      <Hero />

      <div className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <MovieSection title="🔥 Trending" movies={trendingMovies} />

          <MovieSection title="⭐ Popular Movies" movies={popularMovies} />

          <MovieSection title="🆕 Upcoming Movies" movies={upcomingMovies} />

          <MovieSection title="🇮🇳 Indian Cinema" movies={indianMovies} />

          <MovieSection title="🎬 Malayalam Movies" movies={malayalamMovies} />
        </div>
      </div>
    </main>
  );
}


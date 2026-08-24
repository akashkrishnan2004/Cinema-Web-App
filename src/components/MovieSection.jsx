import MovieCard from "./MovieCard";
import SectionTitle from "./SectionTitle";

export default function MovieSection({ title, movies, link }) {
  return (
    <section className="mb-12">
      <SectionTitle title={title} link={link} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.slice(0, 6).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

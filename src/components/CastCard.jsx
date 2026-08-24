import { Link } from "react-router-dom";

export default function CastCard({ person, cast, movieId }) {
  const imageUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
    : "/no-profile.png";

  if (!person || !person.id) {
    console.warn("Castcard received invalid person:", person);
    return null;
  }

  console.log(person.id);
  // console.log(person.name);

  return (
    <Link
      to={`/person-details/${person.id}`}
      state={{ from: `/movie/${movieId}` }}
    >
      <div className="group overflow-hidden rounded-xl bg-zinc-900">
        <div className="aspect-2/3 overflow-hidden">
          <img
            src={imageUrl}
            alt={person.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-3">
          <h3 className="truncate font-semibold text-white">{person.name}</h3>

          <p className="mt-1 truncate text-sm text-zinc-500">
            {person.character || "Unknown Character"}
          </p>
        </div>
      </div>
    </Link>
  );
}

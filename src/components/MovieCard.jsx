// // import { Star } from "lucide-react";

// // export default function MovieCard({ movie }) {
// //   const imageUrl = movie.poster_path
// //     ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
// //     : "/no-poster.png";

// //   return (
// //     <div className="group overflow-hidden rounded-xl bg-zinc-900 transition duration-300 hover:-translate-y-2">
// //       <div className="relative aspect-2/3 overflow-hidden">
// //         <img
// //           src={imageUrl}
// //           alt={movie.title}
// //           className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
// //         />

// //         <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 to-transparent p-4 pt-12">
// //           <div className="flex items-center gap-1 text-sm text-yellow-400">
// //             <Star size={16} fill="currentColor" />
// //             <span>{movie.vote_average.toFixed(1)}</span>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="p-3">
// //         <h2 className="truncate text-base font-semibold text-white">
// //           {movie.title}
// //         </h2>

// //         <p className="mt-1 text-sm text-zinc-400">
// //           {movie.release_date
// //             ? new Date(movie.release_date).getFullYear()
// //             : "N/A"}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// import { Link } from "react-router-dom";
// import { Star } from "lucide-react";

// function MovieCard({ movie }) {
//   const imageUrl = movie.poster_path
//     ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//     : "/no-poster.png";

//   return (
//     // <Link
//     //   to={`/movie/${movie.id}`}
//     //   className="group block overflow-hidden rounded-xl bg-zinc-900 transition duration-300 hover:-translate-y-2"
//     // >
//     <Link
//       to={`/movie/${movie.movie_id}`}
//       className="group block overflow-hidden rounded-xl bg-zinc-900 transition duration-300 hover:-translate-y-2"
//     >
//       <div className="relative aspect-2/3 overflow-hidden">
//         <img
//           src={imageUrl}
//           alt={movie.title}
//           className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//         />

//         <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 to-transparent p-4 pt-12">
//           <div className="flex items-center gap-1 text-sm text-yellow-400">
//             <Star size={16} fill="currentColor" />
//             <span>{movie.vote_average.toFixed(1)}</span>
//           </div>
//         </div>
//       </div>

//       <div className="p-3">
//         <h2 className="truncate text-base font-semibold text-white">
//           {movie.title}
//         </h2>

//         <p className="mt-1 text-sm text-zinc-400">
//           {movie.release_date
//             ? new Date(movie.release_date).getFullYear()
//             : "N/A"}
//         </p>
//       </div>
//     </Link>
//   );
// }

// export default MovieCard;

import { Link } from "react-router-dom";
import { Star } from "lucide-react";

function MovieCard({ movie }) {
  if (!movie || !movie.id) {
    console.warn("MovieCard received invalid movie:", movie);
    return null;
  }

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-poster.png";

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block overflow-hidden rounded-xl bg-zinc-900 transition duration-300 hover:-translate-y-2"
    >
      <div className="relative aspect-2/3 overflow-hidden">
        <img
          src={imageUrl}
          alt={movie.title || "Movie"}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 to-transparent p-4 pt-12">
          <div className="flex items-center gap-1 text-sm text-yellow-400">
            <Star size={16} fill="currentColor" />
            <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
          </div>
        </div>
      </div>

      <div className="p-3">
        <h2 className="truncate text-base font-semibold text-white">
          {movie.title || "Unknown Movie"}
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          {movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : "N/A"}
        </p>
      </div>
    </Link>
  );
}

export default MovieCard;

import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductionCard({ company, movieId }) {
  const logo = company.logo_path
    ? `https://image.tmdb.org/t/p/w200${company.logo_path}`
    : null;

  // console.log(company.id);

  return (
    <Link
      to={`/production-details/${company.id}`}
      state={{
        company,
        from: `/movie/${movieId}`,
      }}
    >
      <div className="flex min-h-28 min-w-48 flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-500 p-4 transition hover:border-red-500/50 hover:bg-zinc-700">
        {logo ? (
          <img
            src={logo}
            alt={company.name}
            className="mb-3 h-10 max-w-30 object-contain"
          />
        ) : (
          <Building2 size={30} className="mb-3 text-zinc-900" />
        )}

        <p className="text-center text-sm font-medium text-zinc-300">
          {company.name}
        </p>

        {/* {company.origin_country && (
          <span className="mt-1 text-xs text-zinc-500">
            {company.origin_country}
          </span>
        )} */}
      </div>
    </Link>
  );
}

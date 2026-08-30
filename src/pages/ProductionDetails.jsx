import {
  ArrowLeft,
  Building2,
  Globe,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function ProductionDetails() {
  const { id } = useParams();
  const location = useLocation();

  const backPath = location.state?.from || "/";
  const company = location.state?.company;

  // console.log("Production ID:", id);
  // console.log("COMPANY:", company);

  // TMDB image URL
  const logoUrl = company?.logo_path
    ? `https://image.tmdb.org/t/p/w500${company.logo_path}`
    : null;

  // If user opens the URL directly without passing company state
  if (!company) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
            <Building2 className="text-red-500" size={32} />
          </div>

          <h1 className="text-2xl font-bold md:text-3xl">
            Production Company Not Found
          </h1>

          <p className="mt-3 text-sm text-zinc-500">
            The production company information is unavailable.
          </p>

          <Link
            to={backPath}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-400 backdrop-blur-xl transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/20 hover:text-red-300"
          >
            <ArrowLeft size={18} />
            Back to Movie
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      {/* HERO / PROFILE SECTION */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(220,38,38,0.12),transparent_35%)]" />

        <div className="absolute inset-0 bg-linear-to-b from-zinc-900/70 via-black/95 to-black" />

        {/* Decorative red glow */}
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-red-600/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
          {/* Back button */}
          <Link
            to={backPath}
            className="group mb-10 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 shadow-lg shadow-red-500/5 backdrop-blur-xl transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/20 hover:text-red-300 hover:shadow-red-500/10"
          >
            <ArrowLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Movie
          </Link>
          {/* COMPANY PROFILE */}
          <div className="grid items-center gap-10 md:grid-cols-[300px_1fr] md:gap-14">
            {/* Logo */}
            <div className="mx-auto w-full max-w-70">
              <div className="relative">
                {/* Glow */}
                <div className="absolute -inset-4 rounded-4xl bg-red-600/10 blur-2xl" />

                <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900  p-8 shadow-2xl hover:bg-zinc-800">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={company.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <Building2
                      size={80}
                      strokeWidth={1}
                      className="text-zinc-300"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Information */}
            <div>
              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-red-400">
                <Building2 size={14} />
                Production Company
              </div>

              {/* Company name */}
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                {company.name}
              </h1>

              {/* Company ID */}
              {/* <p className="mt-3 text-sm text-zinc-600">TMDB ID: {id}</p> */}

              {/* Information cards */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {/* Country */}
                {company.origin_country && (
                  <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 backdrop-blur-xl">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                      <Globe size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-zinc-500">Country</p>
                      <p className="mt-0.5 text-sm font-medium text-zinc-200">
                        {company.origin_country}
                      </p>
                    </div>
                  </div>
                )}

                {/* Headquarters */}
                {company.headquarters && (
                  <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 backdrop-blur-xl">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                      <MapPin size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-zinc-500">Headquarters</p>

                      <p className="mt-0.5 line-clamp-2 text-sm font-medium text-zinc-200">
                        {company.headquarters}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Website */}
              {/* <div className="flex items-center gap-2">
                <Globe size={17} className="text-red-500" />
                {company.homepage ? (
                  <a
                    href={company.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 transition hover:text-red-500"
                  >
                    Official Website
                  </a>
                ) : (
                  <p className="text-zinc-500">N/A</p>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS SECTION */}
      <section className="relative mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <div className="border-t border-zinc-900 pt-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
            {/* About */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-6 w-1 rounded-full bg-red-500" />

                <h2 className="text-2xl font-bold">About the Company</h2>
              </div>

              {company.description ? (
                <p className="max-w-4xl text-base leading-8 text-zinc-400">
                  {company.description}
                </p>
              ) : (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                  <p className="text-sm text-zinc-500">
                    No description is available for this production company.
                  </p>
                </div>
              )}
            </div>

            {/* Quick information */}
            <aside>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  Company Details
                </h3>

                <div className="space-y-5">
                  <div>
                    <p className="text-xs text-zinc-600">Company Name</p>
                    <p className="mt-1 text-sm text-zinc-200">{company.name}</p>
                  </div>

                  {/* <div>
                    <p className="text-xs text-zinc-600">TMDB ID</p>
                    <p className="mt-1 font-mono text-sm text-zinc-300">{id}</p>
                  </div> */}

                  {company.origin_country && (
                    <div>
                      <p className="text-xs text-zinc-600">Origin</p>
                      <p className="mt-1 text-sm text-zinc-200">
                        {company.origin_country}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

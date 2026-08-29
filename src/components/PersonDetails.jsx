import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  User,
  BriefcaseBusiness,
  Globe,
} from "lucide-react";

import { getPersonDetails } from "../services/tmdb";
import Loader from "./Loader";

export default function PersonDetails() {
  const { id } = useParams();
  console.log(id);

  const location = useLocation();

  const backPath = location.state?.from || "/";

  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);

        const data = await getPersonDetails(id);
        console.log(data);

        setPerson(data);
      } catch (error) {
        console.error("Failed to fetch person details:", error);
        setPerson(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  // Loading
  if (loading) {
    return <Loader text="Loading person details..." />;
  }

  // Person not found
  if (!person) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
        <User size={50} className="mb-5 text-zinc-600" />

        <h1 className="text-2xl font-bold">Person not found</h1>

        <p className="mt-2 text-zinc-500">
          We couldn't find the requested person.
        </p>

        <Link
          to="/"
          className="mt-6 rounded-lg bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const profileImage = person.profile_path
    ? `https://image.tmdb.org/t/p/h632${person.profile_path}`
    : "/no-poster.png";

  const formatBirthday = (date) => {
    if (!date) return "Unknown";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header / Profile Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-linear-to-b from-zinc-900/60 via-black to-black" />

        <div className="relative mx-auto max-w-7xl px-6 py-10">
          {/* Back Button to Current Movie Page */}
          <Link
            to={backPath}
            // className="mb-10 inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 shadow-lg shadow-red-500/10 backdrop-blur-xl transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/20 hover:text-red-300 hover:shadow-red-500/20"
          >
            <ArrowLeft size={20} />
            Back to Movie
          </Link>

          {/* Profile */}
          <div className="grid gap-10 md:grid-cols-[280px_1fr]">
            {/* Profile Image */}
            <div className="mx-auto w-full max-w-70">
              <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
                <img
                  src={profileImage}
                  alt={person.name}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>

            {/* Person Information */}
            <div className="flex flex-col justify-center">
              {/* Name */}
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                {person.name}
              </h1>

              {/* Known For */}
              {person.known_for_department && (
                <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
                  <BriefcaseBusiness size={16} className="text-red-500" />
                  {person.known_for_department}
                </div>
              )}

              {/* Basic Information */}
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-4 text-sm">
                {/* Birthday */}
                {
                  <div className="flex items-center gap-2 text-zinc-400">
                    <CalendarDays size={17} className="text-red-500" />
                    {person.birthday ? (
                      <div>
                        <span className="text-zinc-500">Born: </span>
                        <span className="text-zinc-200">
                          {formatBirthday(person.birthday)}
                        </span>
                      </div>
                    ) : (
                      <p className="text-zinc-500">N/A</p>
                    )}
                  </div>
                }

                {/* Place of Birth */}
                <div className="flex items-center gap-2 text-zinc-400">
                  <MapPin size={17} className="text-red-500" />
                  {person.place_of_birth ? (
                    <div>
                      <span className="text-zinc-500">Birthplace: </span>
                      <span className="text-zinc-200">
                        {person.place_of_birth}
                      </span>
                    </div>
                  ) : (
                    <p className="text-zinc-500">N/A</p>
                  )}
                </div>

                {/* Official Website */}
                <div className="flex items-center gap-2">
                  <Globe size={17} className="text-red-500" />
                  {person.homepage ? (
                    <a
                      href={person.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 transition hover:text-red-500"
                    >
                      Official Website
                    </a>
                  ) : (
                    <p className="text-zinc-500">N/A</p>
                  )}
                </div>
              </div>

              {/* Biography */}
              <div className="mt-8 max-w-5xl">
                <h2 className="text-xl font-semibold">Biography</h2>

                <p className="mt-3 leading-7 text-zinc-400">
                  {person.biography || "No biography available."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* <h2 className="mb-5 text-2xl font-bold">Personal Information</h2> */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Department */}
          {/* <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-500">Known For</p>

            <p className="mt-2 font-semibold text-white">
              {person.known_for_department || "N/A"}
            </p>
          </div> */}

          {/* Birthday */}
          {/* <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-500">Date of Birth</p>

            <p className="mt-2 font-semibold text-white">
              {formatBirthday(person.birthday)}
            </p>
          </div> */}

          {/* Place of Birth */}
          {/* <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-500">Place of Birth</p>

            <p className="mt-2 font-semibold text-white">
              {person.place_of_birth || "N/A"}
            </p>
          </div> */}
        </div>
      </section>
    </main>
  );
}

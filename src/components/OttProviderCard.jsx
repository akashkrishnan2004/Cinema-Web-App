export default function OttProviderCard({ provider }) {
  const logo = provider.logo_path
    ? `https://image.tmdb.org/t/p/w200${provider.logo_path}`
    : null;

  return (
    <div className="flex min-h-28 min-w-40 flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-all duration-300 hover:border-red-500/40 hover:bg-zinc-800">
      {logo ? (
        <img
          src={logo}
          alt={provider.provider_name}
          className="mb-3 h-10 max-w-24 object-contain"
        />
      ) : (
        <div className="mb-3 flex h-10 items-center text-sm text-zinc-500">
          No Logo
        </div>
      )}

      <p className="text-center text-sm font-medium text-zinc-300">
        {provider.provider_name}
      </p>
    </div>
  );
}

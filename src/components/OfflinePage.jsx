import { WifiOff, RefreshCw } from "lucide-react";

function OfflinePage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="flex max-w-md flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
          <WifiOff size={38} className="text-red-500" />
        </div>

        {/* Logo */}
        {/* <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-white">Cinema</span>
          <span className="text-red-500">Peedika</span>
        </h1> */}
        <img src="logo2.svg" alt="" className="h-16" />

        {/* Title */}
        <h2 className="mt-6 text-2xl font-bold">You're Offline</h2>

        {/* Description */}
        <p className="mt-3 leading-6 text-zinc-400">
          We couldn't connect to the internet. Please check your network
          connection and try again.
        </p>

        {/* Retry */}
        <button
          onClick={handleRetry}
          className="mt-7 flex items-center gap-2 rounded-lg bg-red-500 px-6 py-3 font-semibold transition hover:bg-red-600"
        >
          <RefreshCw size={18} />
          Try Again
        </button>
      </div>
    </div>
  );
}

export default OfflinePage;

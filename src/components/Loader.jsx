function Loader({ text = "Loading..." }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center">

        {/* Spinner */}
        <div className="relative mb-6 h-16 w-16 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
          <div className="absolute inset-0 rounded-full border-4 border-zinc-800" />

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-red-500" />
        </div>

        {/* Logo */}
        {/* <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-white">Cinema</span>
          <span className="text-red-500">Peedika</span>
        </h1> */}
        <img src="logo2.svg" alt="" className="h-16"/>

        {/* Loading Text */}
        <p className="mt-3 animate-pulse text-sm text-zinc-400">
          {text}
        </p>

      </div>
    </div>
  );
}

export default Loader;
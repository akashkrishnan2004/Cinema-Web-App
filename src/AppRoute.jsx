// export default function AppRoute() {
//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center">
//       <h1 className="text-5xl font-bold text-red-500">
//         CineScope
//       </h1>
//     </div>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";
import IndianMovies from "./pages/IndianMovies";
import Footer from "./components/footer";

import useOnline from "./hooks/useOnline";
import OfflinePage from "./components/OfflinePage";

import ScrollToTop from "./components/ScrollToTop";

export default function AppRoute() {
  const isOnline = useOnline();

  if (!isOnline) {
    return <OfflinePage />;
  }

  return (
    // <BrowserRouter>
    //   <ScrollToTop />

    //   <Navbar />

    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/movies" element={<Movies />} />
    //     <Route path="/indian-movies" element={<IndianMovies />} />
    //     <Route path="/search" element={<Search />} />
    //     <Route path="/movie/:id" element={<MovieDetails />} />
    //   </Routes>

    //   <Footer />
    // </BrowserRouter>
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-black">
        <ScrollToTop />

        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/indian-movies" element={<IndianMovies />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

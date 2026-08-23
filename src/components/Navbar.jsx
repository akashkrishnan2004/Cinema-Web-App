import { Link, NavLink } from "react-router-dom";
import { Search, Menu, X, Clapperboard } from "lucide-react";
import { useState } from "react";

import { links } from "../data/data";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `transition ${
      isActive ? "text-red-500" : "text-zinc-300 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight flex items-center justify-center"
        >
          {/* <span className="text-white">Cine</span>
          <span className="text-red-500">Scope</span> */}
          {/* <span>
            <Clapperboard size={35} className="text-red-500" />
          </span>
          <span className="text-white">Cinema</span>
          <span className="text-red-500">Peedika</span> */}
          <img src="logo2.svg" alt="logo" className="h-10" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink key={link.id} to={link.href} className={navLinkClass}>
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Search */}
        <Link
          to="/search"
          className="hidden items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-zinc-300 transition hover:border-zinc-500 hover:text-white md:flex"
        >
          <Search size={18} />
          <span>Search</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-zinc-800 bg-black px-6 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <NavLink key={link.id} to={link.href} className={navLinkClass}>
                {link.name}
              </NavLink>
            ))}

            {/* Search button */}
            <NavLink
              to="/search"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-zinc-300 hover:text-white"
            >
              <Search size={18} />
              Search
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

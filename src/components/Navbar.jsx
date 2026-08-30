import { Link, NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import { links } from "../data/data";

import FloatingNav from "./FloatingNav";

export default function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `transition ${
      isActive ? "text-red-500" : "text-zinc-300 hover:text-white"
    }`;

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-red-500 bg-black/65 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo - visible on ALL screen sizes */}
          <Link to="/" className="flex items-center justify-center">
            <img src="/logo2.svg" alt="Cinema Peedika" className="h-10" />
          </Link>

          {/* Desktop Navigation - hidden on mobile */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <NavLink key={link.id} to={link.href} className={navLinkClass}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Search - hidden on mobile */}
          <Link
            to="/search"
            className="hidden items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-zinc-300 transition hover:border-zinc-500 hover:text-white md:flex"
          >
            <Search size={18} />
            <span>Search</span>
          </Link>
        </nav>
      </header>

      {/* Mobile Floating Navbar */}
      <FloatingNav />
    </>
  );
}

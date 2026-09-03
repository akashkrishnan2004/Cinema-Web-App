import { ArrowUp, Check, Heart, Share2 } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { links } from "../data/data";
import { useState } from "react";

export default function Footer() {
  // Share the link
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "Cinema Peedika - Your World of Movies",
      text: "Explore, discover, and dive into the world of cinema. 🎬🍿",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const scrollTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <footer id="footer" className="relative bg-zinc-800 text-white pt-20 pb-10">
      {/* Top Wave Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-500 via-zinc-400 to-red-500"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-14">
          <div>
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight flex items-center"
            >
              {/* <span>
                <Clapperboard size={35} className="text-red-500" />
              </span>
              <span className="text-white">Cinema</span>
              <span className="text-red-500">Peedika</span> */}
              <img src="/logo2.svg" alt="logo" className="h-16" />
            </Link>

            <p className="mt-6 leading-8 text-gray-300">
              Your gateway to the world of cinema. Discover, explore, and enjoy.
              🎬🍿
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Quick Links</h3>

            {/* <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-red-500 transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul> */}

            <div className=" flex flex-col space-y-4">
              {links.map((link) => (
                <NavLink
                  key={link.id}
                  to={link.href}
                  className="text-gray-300 hover:text-red-500 transition"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Connect</h3>

            {/* <div className="flex gap-5">
              {socialLinks.map((items) => (
                <a
                  key={items.name}
                  href={items.href}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black transition flex items-center justify-center text-xl"
                >
                  {items.icon}
                </a>
              ))}
            </div> */}

            {/* <button
              onClick={scrollTop}
              className="mt-10 bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition flex items-center gap-2"
            >
              <ArrowUp />
              Back to Top
            </button> */}

            {/* Share the link */}
            <button
              onClick={handleShare}
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-red-500 px-6 py-3 text-white font-semibold shadow-lg hover:bg-red-600 hover:scale-105 transition-all duration-300"
            >
              {copied ? (
                <>
                  <Check />
                  Copied!
                </>
              ) : (
                <>
                  <Share2 />
                  Share
                </>
              )}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-center">
            © {new Date().getFullYear()} CinemaPeedika. All Rights Reserved.
          </p>

          <p className="flex items-center gap-2 text-gray-400 md:text-xs">
            Made by
            <span className=" text-red-500 md:text-xs ">
              <a
                href="https://akashkrishnan-portfolio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Akash Krishnan
              </a>
            </span>
            with
            <Heart size={15} color="#ff0000" />
          </p>
        </div>
      </div>
    </footer>
  );
}

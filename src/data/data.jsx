import { Home, Film, Search } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// NavBar.jsx
export const links = [
  {
    id: 0,
    name: "Home",
    href: "/",
    icon: <Home size={22} />,
  },
  {
    id: 1,
    name: "Cinema",
    href: "/movies",
    icon: <Film size={22} />,
  },
  {
    id: 2,
    name: "Indian Cinema",
    href: "/indian-movies",
    icon: <Film size={22} />,
  },
  // {
  //   id:3,
  //   name: "Malayalam Cinema",
  //   href: "/malayalam-movies"
  // }
];

// FloatingNav.jsx
export const floatNavItems = [
  {
    id: 0,
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    id: 1,
    icon: Film,
    label: "Cinema",
    href: "/movies",
  },
  {
    id: 2,
    icon: Film,
    label: "Indian Cinema",
    href: "/indian-movies",
  },
  {
    id: 3,
    icon: Search,
    label: "Search",
    href: "/search",
  },
];

// Footer.jsx
export const socialLinks = [
  {
    name: "Github",
    icon: <FaGithub />,
    href: "https://github.com/akashkrishnan2004",
  },
  {
    name: "Linkedin",
    icon: <FaLinkedin />,
    href: "https://linkedin.com/in/akash-krishnan2004",
  },
];

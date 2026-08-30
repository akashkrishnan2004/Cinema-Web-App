import { Bell, Bookmark, Film, Settings, User } from "lucide-react";
import Home from "../pages/Home";
import Search from "../pages/Search";

export const links = [
  {
    id: 0,
    name: "Home",
    href: "/",
    icon: <Home size={22} />,
  },
  {
    id: 1,
    name: "Movies",
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

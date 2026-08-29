import { Bell, Bookmark, Film, Settings, User } from "lucide-react";
import Home from "../pages/Home";
import Search from "../pages/Search";

export const links = [
  {
    id: 0,
    name: "Home",
    href: "/",
    icon: <Home size={22} />,
    // label: "Home",
  },
  {
    id: 1,
    name: "Movies",
    href: "/movies",
    icon: <Film size={22} />,
    // label: "Movies",
  },
  {
    id: 2,
    name: "Indian Cinema",
    href: "/indian-movies",
    icon: <Film size={22} />,
    // label: "Indian-Cinema",
  },
  // {
  //   id:3,
  //   name: "Malayalam Cinema",
  //   href: "/malayalam-movies"
  // }
];

  // export const items = [
  //   { id: 0, icon: <Home size={22} />, label: "Home" },
  //   { id: 1, icon: <Search size={22} />, label: "Search" },
  //   { id: 2, icon: <Bell size={22} />, label: "Alerts" },
  //   { id: 3, icon: <User size={22} />, label: "Profile" },
  //   { id: 4, icon: <Bookmark size={22} />, label: "Saved" },
  //   { id: 5, icon: <User size={22} />, label: "Profile" },
  //   { id: 6, icon: <Settings size={22} />, label: "Settings" },
  // ];
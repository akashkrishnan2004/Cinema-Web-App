import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Search, Film } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const FloatingNav = () => {
  const location = useLocation();

  const items = [
    {
      id: 0,
      icon: Home,
      label: "Home",
      href: "/",
    },
    {
      id: 1,
      icon: Film,
      label: "Indian Cinema",
      href: "/indian-movies",
    },
    {
      id: 2,
      icon: Search,
      label: "Search",
      href: "/search",
    },
  ];

  // Find active item based on current URL
  const activeIndex = items.findIndex(
    (item) => item.href === location.pathname,
  );

  const [active, setActive] = useState(activeIndex >= 0 ? activeIndex : 0);

  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
  });

  const containerRef = useRef(null);
  const btnRefs = useRef([]);

  useEffect(() => {
    if (activeIndex >= 0) {
      setActive(activeIndex);
    }
  }, [location.pathname, activeIndex]);

  useEffect(() => {
    const updateIndicator = () => {
      const btn = btnRefs.current[active];
      const container = containerRef.current;

      if (!btn || !container) return;

      const btnRect = btn.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      setIndicatorStyle({
        width: btnRect.width,
        left: btnRect.left - containerRect.left,
      });
    };

    updateIndicator();

    window.addEventListener("resize", updateIndicator);

    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [active]);

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 px-3 md:hidden">
      <div
        ref={containerRef}
        className="
          relative flex items-center justify-between
          overflow-hidden
          rounded-4xl
          border border-white/10
          bg-black/65
          px-1.5 py-1.5
          shadow-2xl shadow-black/40
          backdrop-blur-xl
          backdrop-saturate-150
        "
      >
        {/* Sliding Active Indicator */}
        <motion.div
          animate={indicatorStyle}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          className="
            pointer-events-none
            absolute bottom-1.5 top-1.5
            rounded-4xl
            border border-red-500/20
            bg-red-500/15
            shadow-[0_0_20px_rgba(239,68,68,0.12)]
          "
        />

        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = active === index;

          return (
            <Link
              key={item.id}
              to={item.href}
              ref={(el) => {
                btnRefs.current[index] = el;
              }}
              onClick={() => setActive(index)}
              className={`
                relative z-10
                flex flex-1
                flex-col items-center justify-center
                gap-0.5
                rounded-xl
                px-2 py-2
                transition-all duration-200
                ${isActive ? "text-red-500" : "text-zinc-400 hover:text-white"}
              `}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 2}
                className="transition-all duration-200"
              />

              <span
                className={`
                  text-[10px] font-medium
                  transition-all duration-200
                  ${isActive ? "text-red-400" : "text-zinc-500"}
                `}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FloatingNav;

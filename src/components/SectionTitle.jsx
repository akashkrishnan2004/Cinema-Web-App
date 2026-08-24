import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function SectionTitle({ title, link }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-white">
        {title}
      </h2>

      {link && (
        <Link
          to={link}
          className="flex items-center gap-1 text-sm text-zinc-400 transition hover:text-white"
        >
          View All
          <ChevronRight size={18} />
        </Link>
      )}
    </div>
  );
}

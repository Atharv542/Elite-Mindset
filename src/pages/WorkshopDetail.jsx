import { useParams, useNavigate } from "react-router-dom";
import { workshops } from "../data/workshops";
import { motion } from "framer-motion";
import { useEffect } from "react";

const icons = ["🧠", "🔥", "🎯", "⚡", "🏆", "📈"];

export default function WorkshopDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const workshop = workshops.find((w) => w.id === Number(id));
  if (!workshop) return null;

  const sections = Object.values(workshop.categories);

  // Always start from top when page opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-black px-6 py-24 overflow-hidden">

      {/* Ambient light */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[160px] opacity-10"
      />

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto mb-20 flex items-center gap-3 text-sm text-gray-400">
        <button
          onClick={() => navigate(-1)}
          className="hover:scale-105 transition cursor-pointer"
        >
          ← Back
        </button>
        <span>/</span>
        <span className="text-white">{workshop.title}</span>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-40">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          {workshop.title}
        </h1>
        <p className="text-gray-400 text-lg">{workshop.tagline}</p>
      </div>

      {/* Progress Rail */}
      <div className="absolute left-1/2 -translate-x-[520px] top-[320px] bottom-[200px] hidden lg:block">
        <div className="w-px h-full bg-gradient-to-b from-gray-500/80 via-gray-500/60 to-gray-500/40" />
      </div>

      {/* Sections */}
      {sections.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="sticky top-24 mb-52"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="
              max-w-4xl mx-auto
              rounded-3xl p-14
              backdrop-blur
              bg-gradient-to-br from-white/10 to-white/5
              border border-white/10
              shadow-xl
            "
          >
            {/* Section number + icon */}
            <div className="flex items-center gap-6 mb-8">
              <span className="text-5xl font-bold text-gray-400">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/*<span className="text-3xl">{icons[i]}</span>*/}
            </div>

            {/* Subtitle */}
            <span className="text-white/80 text-sm uppercase tracking-widest">
              {s.subtitle}
            </span>

            {/* Title */} 
            <h2 className="text-3xl md:text-4xl text-white mt-4 mb-6">
              {s.title}
            </h2>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed text-lg max-w-3xl">
              {s.description}
            </p>
          </motion.div>
        </motion.div>
      ))}

      {/* Bottom CTA */}
      <div className="text-center mt-32">
        <button
          onClick={() => navigate(-1)}
          className="px-10 cursor-pointer py-4 rounded-full  text-white bg-gradient-to-r from-gray-600 to-slate-600  transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
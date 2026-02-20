import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { workshops } from "../data/workshops";
import bgImage from "../assets/stone-texture.jpg";
import { useNavigate } from "react-router-dom";

export default function WorkshopScroller() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const controls = useAnimation();
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [60, 0]);

  const cardGradients = [
    "from-blue-900/40 to-blue-800/20",
    "from-blue-800/40 to-blue-700/20",
    "from-cyan-900/40 to-blue-800/20",
    "from-indigo-900/40 to-blue-800/20",
    "from-sky-900/40 to-blue-700/20",
    "from-blue-900/40 to-cyan-800/20",
  ];

  const workshopCards = [...workshops, ...workshops];

  // Auto scrolling animation
  useEffect(() => {
    if (!isHovering) {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          ease: "linear",
          duration: 35,
          repeat: Infinity,
        },
      });
    } else {
      controls.stop();
    }
  }, [isHovering, controls]);

  return (
    <section
      ref={sectionRef}
      id="workshops"
      className="relative py-32 overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/90 via-neutral-900/85 to-black/90" />

      <div className="relative z-10">

        {/* Heading */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center mb-20 px-6"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              The Elite Mindset Framework
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Mindset • Resilience • Skills • Behaviors • Outcomes • Accountability
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={controls}
            className="flex w-max gap-10 px-10"
          >
            {workshopCards.map((workshop, index) => (
              <motion.div
                key={`${workshop.id}-${index}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileHover={{
                  scale: 1.05,
                  y: -12,
                  boxShadow: "0 25px 60px rgba(59,130,246,0.25)",
                }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`
                  relative group flex-shrink-0 w-[360px] h-[280px] rounded-2xl p-10
                  text-left border border-blue-500/10 cursor-pointer
                  transition-all duration-300 overflow-hidden
                  bg-gradient-to-br ${cardGradients[index % cardGradients.length]}
                `}
              >
                {/* Number */}
                <span className="text-6xl font-bold text-blue-500/40 block mb-6">
                  {String(workshop.id).padStart(2, "0")}
                </span>

                {/* Title */}
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {workshop.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed max-w-[260px]">
                  {workshop.tagline}
                </p>

                {/* Explore CTA */}
                <div
                  onClick={() => navigate(`/workshop/${workshop.id}`)}
                  className="
                    absolute bottom-6 left-10 flex items-center gap-2 text-cyan-400 text-sm font-semibold
                    opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-300 cursor-pointer
                  "
                >
                  Explore
                  <motion.span
                    animate={{ x: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    →
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
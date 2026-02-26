import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { workshops } from "../data/workshops";
import bgImage from "../assets/stone-texture.jpg";
import { useNavigate } from "react-router-dom";

const accentColors = [
  "hsl(0, 0%, 85%)",   // light silver
  "hsl(0, 0%, 75%)",   // soft gray
  "hsl(0, 0%, 65%)",   // medium gray
  "hsl(0, 0%, 55%)",   // deep gray
  "hsl(0, 0%, 45%)",   // charcoal gray
  "hsl(0, 0%, 35%)",   // dark graphite
];

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

  const workshopCards = [...workshops, ...workshops];

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
    } else controls.stop();
  }, [isHovering, controls]);

  return (
    <section
      ref={sectionRef}
      id="workshops"
      className="relative py-32 overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "110%",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10">
        {/* Heading */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center mb-20 px-6"
        >
         

          <h2 className="text-5xl md:text-6xl font-bold mb-5 text-white mt-4">
            Our Six Core Principles
          </h2>

          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Mindset · Resilience · Skills · Behaviors · Outcomes · Accountability
          </p>

          <div className="h-px w-48 bg-white/20 mx-auto mt-8" />
        </motion.div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

          <motion.div animate={controls} className="flex w-max gap-8 px-10">
            {workshopCards.map((workshop, index) => {
              const color = accentColors[index % accentColors.length];

              return (
                <motion.div
                  key={`${workshop.id}-${index}`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
               
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  onClick={() => navigate(`/workshop/${workshop.id}`)}
                  className="relative group flex-shrink-0 w-[380px] h-[210px] rounded-2xl cursor-pointer overflow-hidden 
                  bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/25 transition-all duration-500"
                >
                  {/* Accent line */}
                  <div
                    className="absolute top-0 left-8 right-8 h-[2px]"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    }}
                  />

                  {/* Glow orbs */}
                  <div
                    className="absolute -top-20 -right-20 w-48 h-48 blur-3xl opacity-20"
                    style={{ background: color }}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-10 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: color }}
                      />
                      <div
                        className="h-px w-12"
                        style={{ background: color }}
                      />
                    </div>

                    <h3 className="text-2xl font-semibold text-white mb-4">
                      {workshop.title}
                    </h3>

                    <p className="text-white/70 text-sm flex-1">
                      {workshop.tagline}
                    </p>

                    <div
                      className="flex items-center gap-2 text-sm font-semibold opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 mt-3 mb-1 transition-all duration-300 text-gray-400"
                      
                    >
                      Explore
                      <motion.span
                        animate={{ x: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
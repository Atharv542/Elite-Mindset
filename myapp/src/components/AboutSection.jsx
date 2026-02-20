import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import stoneTexture from "../assets/stone-texture.jpg";

const founders = [
  {
    name: "Jazz Ferguson",
    role: "NBA Basketball Player",
    bio: "Jazz Ferguson, a successful professional basketball player with 15 years elite experience across four continents.",
    image: "Screenshot 2026-02-20 112733.png",
  },
  {
    name: "Mark Colbourne MBE",
    role: "Paralympic Cycling Champion",
    bio: "Mark Colbourne MBE, former world and paralympic gold medalist from the London 2012 Paralympic games.",
    image: "/Screenshot 2026-02-19 233622.png",
  },
];

const stats = [
  { value: "200+", label: "Schools Partnered" },
  { value: "5,000+", label: "Students Coached" },
  { value: "15+", label: "Years Experience" },
  { value: "98%", label: "Satisfaction Rate" },
];

const AnimatedCounter = ({ value, label, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
        {value}
      </div>
      <div className="text-gray-400 text-xs uppercase tracking-widest">
        {label}
      </div>
    </motion.div>
  );
};

export default function AboutSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black overflow-hidden"
    >
      {/* Texture Layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${stoneTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08, // subtle texture only
        }}
      />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 max-w-6xl mx-auto px-6"
      >
        {/* Heading */}
        <div className="text-center mb-24">
          <span className="text-cyan-400 text-sm uppercase tracking-widest mb-4 block">
            Who We Are
          </span>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About the Program
          </h2>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            The Elite Mindset Program is a premium development program designed for teenagers and young adults who want to grow with confidence,improve resilience and find thier purpose.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-28">
          {stats.map((stat, i) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
              delay={i * 0.15}
            />
          ))}
        </div>

        {/* Mission */}
        <div className="rounded-2xl p-12 bg-neutral-900 border border-cyan-500/20 shadow-2xl mb-32 text-center">
          <span className="text-6xl block mb-4">🎯</span>
          <h3 className="text-4xl font-bold text-white mb-4">
            Our Mission
          </h3>
          <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
            The 30 session program is age-appropriate, values-driven and designed to support young people through key development stages. The rpogram operated through a membership model with after-school based workshops.
          </p>
        </div>

        {/* Founders */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm uppercase tracking-widest mb-3 block">
            Leadership
          </span>
          <h3 className="text-4xl font-bold text-white">
            Meet the Founders
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, x: i === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="rounded-2xl p-12 bg-neutral-900 border border-cyan-500/20 shadow-2xl text-center"
            >
              <div className="w-40 h-40 mx-auto mb-6 rounded-full border border-cyan-500/40 overflow-hidden">
  <img
    src={f.image}
    alt={f.name}
    className="w-full h-full object-cover"
  />
</div>

              <h4 className="text-xl font-bold text-white mb-1">
                {f.name}
              </h4>
              <p className="text-cyan-400 text-sm mb-4">
                {f.role}
              </p>

              <p className="text-gray-300 text-sm leading-relaxed">
                {f.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
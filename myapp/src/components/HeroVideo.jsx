import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import introVideo from "../assets/intro-video.mp4";
import heroBg from "../assets/hero-bg.jpg";

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const yTransform = useTransform(scrollY, [0, 500], [0, 100]);
  const scaleTransform = useTransform(scrollY, [0, 500], [1, 0.95]);
  const opacityTransform = useTransform(scrollY, [0, 500], [1, 0.8]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden sticky top-0"
      style={{
        y: yTransform,
        scale: scaleTransform,
        opacity: opacityTransform,
      }}
      whileHover={{ scale: 0.97 }}
      transition={{ duration: 0.6 }}
    >
      {/* Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={heroBg}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={introVideo} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Ambient cyan blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-cyan-500 rounded-full opacity-10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.05, 1, 1.05] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-1/2 -left-1/4 w-80 h-80 bg-cyan-400 rounded-full opacity-10 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center z-10 px-6"
        >
          <motion.div variants={childVariants} className="mb-6">
            <span className="inline-block text-cyan-400 text-sm font-semibold uppercase tracking-widest">
              Elite Mindset Coaching
            </span>
          </motion.div>

          <motion.h1
            variants={childVariants}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-tight"
          >
            Transform
            <br />
            <motion.span
              className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Your Future
            </motion.span>
          </motion.h1>

          <motion.p
            variants={childVariants}
            className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
          >
            Master the mindset, resilience, and skills to achieve
            <motion.span
              className="text-cyan-400 font-semibold ml-1"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              extraordinary results
            </motion.span>
          </motion.p>

          <motion.div
  variants={childVariants}
  className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
>
  <motion.button
    onClick={() => {
      document
        .getElementById("workshops")
        ?.scrollIntoView({ behavior: "smooth" });
    }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-8 py-4 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/40"
  >
    Explore Workshops
  </motion.button>
</motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cyan-400"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
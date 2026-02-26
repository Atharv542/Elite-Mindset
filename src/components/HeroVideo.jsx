import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import introVideo from "../assets/intro-video1.mp4";
import heroBg from "../assets/hero-bg.png";

export default function HeroSection() {
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  // ⏳ Delay video start
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Background Image */}
      <motion.img
        src={heroBg}
        alt="Hero Background"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Video fades in after delay */}
      <motion.video
        ref={videoRef}
        muted
        loop
        playsInline
        initial={{ opacity: 0 }}
        animate={{ opacity: showVideo ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={introVideo} type="video/mp4" />
      </motion.video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center z-10 px-6">
        <div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-tight"
          >
            TRANSFORM
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1 }}
            >
              YOUR FUTURE
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
          >
            Master the mindset, resilience, and skills to achieve extraordinary results
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById("workshops")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="
                bg-gradient-to-r from-zinc-600 to-zinc-800
                hover:from-zinc-500 hover:to-zinc-700
                text-white
                text-xl
                font-bold
                py-4
                px-8
                rounded-full
                shadow-xl shadow-black/50
                transition-all duration-300 cursor-pointer
              "
            >
              Explore Workshops
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 text-2xl"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          ↓
        </motion.div>
      </motion.div>

    </section>
  );
}
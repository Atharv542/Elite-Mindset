import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import stoneTexture from "../assets/stone-texture.jpg";

export default function ContactSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [80, 0]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    package: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        package: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-32 overflow-hidden"
      style={{
        backgroundImage: `url(${stoneTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/90 via-neutral-900/85 to-black/90" />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 max-w-2xl mx-auto px-6"
      >
        {/* Header */}
        <div className="mb-16 text-center">
          

          <h2 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-4">
            CONNECT WITH US
          </h2>

          <p className="text-2xl text-gray-300">
            Start your journey today
          </p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-neutral-900/80 backdrop-blur rounded-3xl p-8 md:p-12 space-y-6 border border-gray-400"
        >
          {[
            { label: "Full Name", name: "name", type: "text", placeholder: "Your name" },
            { label: "Email", name: "email", type: "email", placeholder: "your@email.com" },
            { label: "Phone", name: "phone", type: "tel", placeholder: "Your phone number" },
          ].map((f) => (
            <motion.div key={f.name} variants={item}>
              <label className="block text-sm font-semibold text-white mb-3 uppercase tracking-wide">
                {f.label}
              </label>
              <input
                name={f.name}
                type={f.type}
                value={formData[f.name]}
                onChange={handleChange}
                required
                placeholder={f.placeholder}
                className="w-full bg-black/50 text-white rounded-xl px-4 py-3 border border-gray-400 transition-all placeholder-gray-500"
              />
            </motion.div>
          ))}

          {/* Package */}
          <motion.div variants={item}>
            <label className="block text-sm font-semibold text-white mb-3 uppercase tracking-wide">
              Our Services
            </label>
            <select
              name="package"
              value={formData.package}
              onChange={handleChange}
              required
              className="w-full bg-black/50 text-white rounded-xl px-4 py-3 border border-gray-400 transition-all"
            >
              <option value="">Tell me more about</option>
              <option value="partnership">ECA Membership – 9,000 AED (30 workshops)</option>
              <option value="individual">1 to 1 Coaching – 48,000 AED (24 sessions)</option>
            </select>
          </motion.div>

          {/* Message */}
          {/*<motion.div variants={item}>
            <label className="block text-sm font-semibold text-white mb-3 uppercase tracking-wide">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
              className="w-full bg-black/50 text-white rounded-xl px-4 py-3 border border-gray-700 focus:border-cyan-400 focus:outline-none transition-all resize-none placeholder-gray-500"
              placeholder="Tell us about your goals..."
            />
          </motion.div>*/}

          <motion.button
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
      className="
  w-full
  bg-gradient-to-r from-zinc-600 to-zinc-800
  hover:from-zinc-500 hover:to-zinc-700
  text-white
  text-xl
  font-bold
  py-4
  rounded-full
  shadow-xl shadow-black/50
  transition-all duration-300
  cursor-pointer
"
          >
            {submitted ? "Message Sent!" : "Send Message"}
          </motion.button>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-gray-400 text-lg font-semibold"
            >
              Thank you! We'll be in touch soon.
            </motion.div>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
}
"use client";

import { motion, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        ease: [0.165, 0.84, 0.44, 1],
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.165, 0.84, 0.44, 1],
      },
    },
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.165, 0.84, 0.44, 1],
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center relative">
      {/* Subtle gradient orb background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.8), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.02]"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.8), transparent 70%)",
          }}
        />
      </div>

      <div className="container-xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status badge */}
          <motion.div variants={badgeVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide border border-white/10 bg-white/[0.03]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-white/60">Available for work</span>
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="hero-title">
              <span className="text-white/90">SHYAM SAI TEJA</span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-xl mb-8">
            <p className="hero-subtitle text-foreground-secondary">
              Software engineer & design enthusiast at{" "}
              <span className="text-white/80 font-normal">IIT Madras</span>,
              building products that are both functional and aesthetically
              pleasing.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium bg-white text-black hover:bg-white/90 transition-colors duration-200"
            >
              View Work
            </a>
            <a
              href="#across-the-web"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all duration-200"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: [0.645, 0.045, 0.355, 1],
          }}
        >
          <ChevronDown className="h-5 w-5 text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}

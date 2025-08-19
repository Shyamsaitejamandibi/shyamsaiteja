"use client";

import { motion, Variants } from "framer-motion";
import { useMobile } from "@/hooks/use-mobile";

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center">
      <div className="container-xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="mb-16">
            <h1 className="hero-title text-foreground/80 whitespace-normal">
              SHYAM SAI TEJA
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-2xl">
            <p className="hero-subtitle text-foreground-secondary">
              I&apos;m a software engineer with a passion for building products
              that are both functional and aesthetically pleasing.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

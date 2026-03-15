"use client";

import { motion, Variants } from "framer-motion";

const techStack = [
  { name: "TypeScript", color: "#3178C6" },
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "React Native", color: "#61DAFB" },
  { name: "Node.js", color: "#339933" },
  { name: "Python", color: "#3776AB" },
  { name: "Golang", color: "#00ADD8" },
  { name: "Rust", color: "#CE422B" },
  { name: "Figma", color: "#F24E1E" },
  { name: "PostgreSQL", color: "#4169E1" },
];

export function AboutSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
        ease: [0.165, 0.84, 0.44, 1],
      },
    },
  };

  const titleVariants: Variants = {
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

  return (
    <section id="about" className="section-spacing">
      <div className="container-xl">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="section-title mb-16"
        >
          About
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-8"
          >
            <div className="glass-card p-6 md:p-8">
              <p className="body-text text-white/60 mb-6">
                Designer and builder shaping fluid, engaging digital experiences
                across platforms and products. Currently studying B.Tech at{" "}
                <span className="text-white/80 font-medium">IIT Madras</span>.
              </p>

              <p className="body-text text-white/60">
                Currently at{" "}
                <a
                  href="https://hex.inc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200"
                >
                  HEX
                </a>{" "}
                and building playful tools at{" "}
                <a
                  href="https://smallchess.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200"
                >
                  SMALLCHESS
                </a>
                . Open to work if you&apos;re building something cool.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-8"
          >
            <div className="glass-card p-6 md:p-8">
              <p className="body-text text-white/60 mb-6">
                I believe in creating work that not only looks good but also
                solves real problems and delivers exceptional user experiences.
              </p>

              <p className="body-text text-white/60">
                When I&apos;m not designing or vibe-coding, I enjoy playing
                basketball, DJ&apos;ing, and creating fun side projects.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16"
        >
          <motion.p
            variants={itemVariants}
            className="meta-text text-white/30 mb-6 uppercase tracking-widest text-xs"
          >
            Technologies
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2"
          >
            {techStack.map((tech) => (
              <span
                key={tech.name}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-white/[0.06] bg-white/[0.02] text-white/50 hover:text-white/70 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-200"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: tech.color, opacity: 0.7 }}
                />
                {tech.name}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

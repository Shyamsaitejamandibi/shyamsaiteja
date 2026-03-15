"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 0,
    title: "Interactive Quotes",
    category: "Web Design",
    tags: ["React", "Design"],
    year: "2025",
    description:
      "A visually captivating quotes platform featuring dynamic color palettes and refined typography. Users can highlight passages, share personalized quote cards, and explore curated collections.",
    link: "https://reveriee.vercel.app",
  },
  {
    id: 2,
    title: "Caged Bird",
    category: "Web App",
    tags: ["Next.js", "Game"],
    year: "2025",
    description:
      "A narrative puzzle experience with minimalist aesthetics and challenging gameplay. Players solve increasingly complex riddles to progress through a touching story of freedom.",
    link: "https://cagedbird.vercel.app",
  },
  {
    id: 3,
    title: "WordLadderWar",
    category: "Game Development",
    tags: ["Multiplayer", "TypeScript"],
    year: "2025",
    description:
      "A fast-paced word transformation game with real-time multiplayer, custom dictionaries, and an elegant interface that makes wordplay addictive.",
    link: "https://word-ladder-war.vercel.app/",
  },
  {
    id: 4,
    title: "Volvo Mobile UX",
    category: "UX/UI Design",
    tags: ["Figma", "Mobile"],
    year: "2024",
    description:
      "A comprehensive mobile interface redesign connecting drivers with their vehicles. Focuses on contextual awareness and seamless integration with Volvo's ecosystem.",
    link: "https://dribbble.com/shots/24589230-Enhanced-Mobile-Experience-for-Volvo",
  },
  {
    id: 5,
    title: "Weather App",
    category: "Web App",
    tags: ["React", "API"],
    year: "2024",
    description:
      "A visually striking weather application with location-based forecasting and atmospheric data visualization. Features animated transitions and responsive design.",
    link: "https://weather-app-opal-nine-24.vercel.app",
  },
];

const tagColors: Record<string, string> = {
  React: "bg-sky-500/10 text-sky-400/80 border-sky-500/20",
  Design: "bg-pink-500/10 text-pink-400/80 border-pink-500/20",
  AI: "bg-violet-500/10 text-violet-400/80 border-violet-500/20",
  Blockchain: "bg-amber-500/10 text-amber-400/80 border-amber-500/20",
  "Next.js": "bg-white/5 text-white/60 border-white/10",
  Game: "bg-emerald-500/10 text-emerald-400/80 border-emerald-500/20",
  Multiplayer: "bg-orange-500/10 text-orange-400/80 border-orange-500/20",
  TypeScript: "bg-blue-500/10 text-blue-400/80 border-blue-500/20",
  Figma: "bg-purple-500/10 text-purple-400/80 border-purple-500/20",
  Mobile: "bg-teal-500/10 text-teal-400/80 border-teal-500/20",
  API: "bg-indigo-500/10 text-indigo-400/80 border-indigo-500/20",
};

export function WorkSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
    <section id="work" className="section-spacing">
      <div className="container-xl">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="section-title mb-16"
        >
          Selected Work
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-7 border-t border-white/[0.06] transition-all duration-300"
                style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
              >
                <div className="flex items-start md:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="project-title text-white/75 group-hover:text-white transition-colors duration-250">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="h-4 w-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-250 shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[10px] px-2 py-0.5 rounded-full border font-medium tracking-wide ${tagColors[tag] || "bg-white/5 text-white/50 border-white/10"}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="meta-text text-white/30 shrink-0">
                    {project.year}
                  </div>
                </div>

                {/* Project description on hover */}
                <div
                  className="max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-400"
                  style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
                >
                  <p className="project-description text-white/40 max-w-2xl pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    {project.description}
                  </p>
                </div>
              </a>
            </motion.div>
          ))}
          <motion.div
            variants={itemVariants}
            className="border-t border-white/[0.06] mt-0"
          />
        </motion.div>
      </div>
    </section>
  );
}

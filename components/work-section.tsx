"use client";

import { motion, Variants } from "framer-motion";

const projects = [
  {
    id: 0,
    title: "Interactive Quotes",
    category: "Web Design",
    year: "2025",
    description:
      "A visually captivating quotes platform featuring dynamic color palettes and refined typography. Users can highlight passages, share personalized quote cards, and explore curated collections through intuitive interactions.",
    link: "https://reveriee.vercel.app",
  },
  {
    id: 1,
    title: "cAI",
    category: "AI/ML",
    year: "2025",
    description:
      "An intelligent contract analysis tool that leverages machine learning to identify vulnerabilities in blockchain code. Helps developers build more secure and efficient smart contracts.",
    link: "https://smartcai.framer.website",
  },
  {
    id: 2,
    title: "Caged Bird",
    category: "Web App",
    year: "2025",
    description:
      "A narrative puzzle experience with minimalist aesthetics and challenging gameplay. Players solve increasingly complex riddles to progress through a touching story of freedom.",
    link: "https://cagedbird.vercel.app",
  },
  {
    id: 3,
    title: "WordLadderWar",
    category: "Game Development",
    year: "2025",
    description:
      "A fast-paced word transformation game that challenges linguistic creativity. Features real-time multiplayer, custom dictionaries, and an elegant interface that makes wordplay addictive.",
    link: "https://word-ladder-war.vercel.app/",
  },
  {
    id: 4,
    title: "Enhanced Mobile Experience for Volvo",
    category: "UX/UI Design",
    year: "2024",
    description:
      "A comprehensive mobile interface redesign that connects drivers with their vehicles. Focuses on contextual awareness, personalized settings, and seamless integration with Volvo's ecosystem.",
    link: "https://dribbble.com/shots/24589230-Enhanced-Mobile-Experience-for-Volvo",
  },
  {
    id: 5,
    title: "Weather App",
    category: "Web App",
    year: "2024",
    description:
      "A visually striking weather application with location-based forecasting and atmospheric data visualization. Features animated transitions and a responsive design that adapts to all devices.",
    link: "https://weather-app-opal-nine-24.vercel.app",
  },
];

export function WorkSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0],
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
    <section id="work" className="section-spacing">
      <div className="container-xl">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="section-title mb-24"
        >
          Selected Work
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-8 border-t border-foreground/10 transition-all duration-500 ease-out"
              >
                <div className="flex items-center justify-between">
                  <h3 className="project-title text-foreground/80 group-hover:text-foreground transition-colors duration-500 ease-out">
                    {project.title}
                  </h3>
                  <div className="meta-text text-foreground-secondary">
                    {project.year}
                  </div>
                </div>

                {/* Project description that appears on hover */}
                <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 ease-out">
                  <p className="project-description text-foreground-secondary max-w-2xl pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 ease-out">
                    {project.description}
                  </p>
                </div>
              </a>
            </motion.div>
          ))}
          <motion.div
            variants={itemVariants}
            className="border-t border-foreground/10 mt-0"
          ></motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, GitFork, ExternalLink } from "lucide-react";

interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

export function GitHubReposSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github/repos")
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.165, 0.84, 0.44, 1] },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.165, 0.84, 0.44, 1] },
    },
  };

  return (
    <div className="section-spacing">
      <div className="container-xl">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="section-title mb-16"
        >
          Open Source
        </motion.h2>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-foreground/20 border-t-foreground/60 rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="py-16 text-center">
            <p className="body-text text-foreground/40">
              Unable to load repositories.
            </p>
          </div>
        )}

        {!loading && !error && repos.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {repos.map((repo) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                className="group glass-card p-6 transition-all duration-250 hover-lift hover-glow block"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white/90 font-semibold text-base tracking-tight group-hover:text-white transition-colors duration-200">
                    {repo.name}
                  </h3>
                  <ExternalLink className="h-3.5 w-3.5 text-white/20 group-hover:text-white/50 transition-colors duration-200 shrink-0 mt-1" />
                </div>

                {repo.description && (
                  <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2">
                    {repo.description}
                  </p>
                )}

                <div className="flex items-center gap-4 mt-auto">
                  {repo.primaryLanguage && (
                    <span className="flex items-center gap-1.5 text-xs text-white/40">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor: repo.primaryLanguage.color,
                        }}
                      />
                      {repo.primaryLanguage.name}
                    </span>
                  )}
                  {repo.stargazerCount > 0 && (
                    <span className="flex items-center gap-1 text-xs text-white/40">
                      <Star className="h-3 w-3" />
                      {repo.stargazerCount}
                    </span>
                  )}
                  {repo.forkCount > 0 && (
                    <span className="flex items-center gap-1 text-xs text-white/40">
                      <GitFork className="h-3 w-3" />
                      {repo.forkCount}
                    </span>
                  )}
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

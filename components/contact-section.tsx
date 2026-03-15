"use client";

import { motion, Variants } from "framer-motion";
import { Copy, ExternalLink, Check } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("tejashyamsai@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

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
        duration: 0.5,
        ease: [0.165, 0.84, 0.44, 1],
      },
    },
  };

  const links = [
    {
      label: "Email",
      value: "tejashyamsai@gmail.com",
      href: "mailto:tejashyamsai@gmail.com",
      isEmail: true,
    },
    {
      label: "GitHub",
      value: "Shyamsaitejamandibi",
      href: "https://github.com/Shyamsaitejamandibi",
    },
    {
      label: "LinkedIn",
      value: "shyam-sai-teja",
      href: "https://www.linkedin.com/in/shyam-sai-teja-235054253",
    },
    {
      label: "X / Twitter",
      value: "@Shyamsaitej",
      href: "https://x.com/Shyamsaitej",
    },
    {
      label: "Peerlist",
      value: "shyamsaiteja",
      href: "https://peerlist.io/shyamsaiteja",
    },
  ];

  return (
    <section id="across-the-web" className="section-spacing pb-20">
      <div className="container-xl">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="section-title mb-16"
        >
          Across the Web
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-2xl"
        >
          {links.map((link) => (
            <motion.div
              key={link.label}
              variants={itemVariants}
              className="border-b border-white/[0.06] py-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="contact-label text-white/35">{link.label}</span>
                <div className="flex items-center gap-2">
                  {link.isEmail ? (
                    <>
                      <a
                        href={link.href}
                        className="contact-text text-white/70 hover:text-white transition-colors duration-200"
                        onClick={(e) => {
                          if (window.innerWidth < 768) {
                            e.preventDefault();
                            copyEmail();
                          }
                        }}
                      >
                        {link.value}
                      </a>
                      <button
                        onClick={copyEmail}
                        className="text-white/25 hover:text-white/60 transition-colors duration-200 p-1"
                        aria-label="Copy email address"
                      >
                        {emailCopied ? (
                          <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              type: "spring",
                              duration: 0.3,
                              bounce: 0.2,
                            }}
                          >
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                          </motion.div>
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                      {emailCopied && (
                        <motion.span
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-xs text-emerald-400/70"
                        >
                          Copied!
                        </motion.span>
                      )}
                    </>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-text text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2"
                    >
                      {link.value}
                      <ExternalLink className="h-3 w-3 opacity-30 group-hover:opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

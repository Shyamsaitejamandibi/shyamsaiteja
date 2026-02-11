"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

// --- Types ---

interface GitHubContributionDay {
  contributionCount: number;
  date: string;
  color: string;
  weekday: number;
}

interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[];
}

interface GitHubData {
  totalContributions: number;
  weeks: GitHubContributionWeek[];
}

interface HackatimeLanguage {
  name: string;
  total_seconds: number;
  percent: number;
  text: string;
  color?: string;
}

interface HackatimeData {
  total_seconds: number;
  daily_average: number;
  languages: HackatimeLanguage[];
  human_readable_total?: string;
  human_readable_daily_average?: string;
  human_readable_range?: string;
  streak?: number;
  start?: string;
}

// --- Constants & Helpers ---

const RANGE_OPTIONS = [
  { value: "last_7_days", label: "7 Days" },
  { value: "last_30_days", label: "30 Days" },
  { value: "last_6_months", label: "6 Months" },
  { value: "last_year", label: "1 Year" },
];

const LANGUAGE_COLORS = [
  "#39d353", // green
  "#58a6ff", // blue
  "#d2a8ff", // purple
  "#f78166", // orange
  "#ffd700", // gold
  "#ff7eb6", // pink
  "#79c0ff", // light blue
  "#7ee787", // light green
];

const GITHUB_LEVEL_COLORS = [
  "rgba(255, 255, 255, 0.04)", // level 0 — empty
  "#0e4429", // level 1
  "#006d32", // level 2
  "#26a641", // level 3
  "#39d353", // level 4
];

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getGitHubLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours >= 1) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function formatHours(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  if (hours >= 1000) return `${(hours / 1000).toFixed(1)}k`;
  return hours.toLocaleString();
}

function computeGitHubStreaks(weeks: GitHubContributionWeek[]) {
  const allDays = weeks.flatMap((w) => w.contributionDays);
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  for (const day of allDays) {
    if (day.contributionCount > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  for (let i = allDays.length - 1; i >= 0; i--) {
    if (allDays[i].contributionCount > 0) {
      currentStreak++;
    } else {
      break;
    }
  }
  return { currentStreak, longestStreak };
}

function getMonthLabels(weeks: GitHubContributionWeek[]) {
  const labels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return;
    const month = new Date(firstDay.date + "T00:00:00").getMonth();
    if (month !== lastMonth) {
      labels.push({ label: MONTH_LABELS[month], col: i });
      lastMonth = month;
    }
  });
  return labels;
}

// --- Component ---

export function DeveloperActivitySection() {
  // State
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [hackatimeData, setHackatimeData] = useState<HackatimeData | null>(
    null,
  );

  const [loadingGithub, setLoadingGithub] = useState(true);
  const [loadingHackatime, setLoadingHackatime] = useState(true);

  const [errorGithub, setErrorGithub] = useState(false);
  const [errorHackatime, setErrorHackatime] = useState(false);

  const [activeRange, setActiveRange] = useState("last_year");
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  // Fetch GitHub Data
  useEffect(() => {
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((d) => {
        setGithubData(d);
        setLoadingGithub(false);
      })
      .catch(() => {
        setErrorGithub(true);
        setLoadingGithub(false);
      });
  }, []);

  // Fetch Hackatime Data
  const fetchHackatime = useCallback((range: string) => {
    setLoadingHackatime(true);
    setErrorHackatime(false);
    setHackatimeData(null); // Optional: clear data while loading new range? Or keep stale? Keeping stale might be better UX, but let's follow original pattern for now.

    fetch(`/api/hackatime?range=${range}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((d) => {
        setHackatimeData(d);
        setLoadingHackatime(false);
      })
      .catch(() => {
        setErrorHackatime(true);
        setLoadingHackatime(false);
      });
  }, []);

  useEffect(() => {
    fetchHackatime(activeRange);
  }, [activeRange, fetchHackatime]);

  // Event Handlers
  const handleRangeChange = (range: string) => {
    if (range === activeRange) return;
    setActiveRange(range);
  };

  const handleCellHover = useCallback(
    (day: GitHubContributionDay, e: React.MouseEvent) => {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const parentRect = (e.target as HTMLElement)
        .closest(".github-graph-container")!
        .getBoundingClientRect();
      setTooltip({
        text: `${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""} on ${formatDate(day.date)}`,
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top - 8,
      });
    },
    [],
  );

  const handleCellLeave = useCallback(() => setTooltip(null), []);

  // Derived Data
  const githubStreaks = githubData
    ? computeGitHubStreaks(githubData.weeks)
    : null;
  const monthLabels = githubData ? getMonthLabels(githubData.weeks) : [];

  const topLanguages =
    hackatimeData?.languages
      ?.filter((l) => l.name !== "Other" && l.total_seconds > 0)
      .slice(0, 6) ?? [];
  const maxLangPercent = topLanguages.length > 0 ? topLanguages[0].percent : 1;

  // Animations
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  return (
    <div className="section-spacing">
      <div className="container-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.h2
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="section-title mb-0"
          >
            Developer Activity
          </motion.h2>

          {/* Range Filter Pills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap gap-2"
          >
            {RANGE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleRangeChange(option.value)}
                className="px-4 py-1.5 rounded-full meta-text text-xs transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor:
                    activeRange === option.value
                      ? "rgba(255, 255, 255, 0.12)"
                      : "rgba(255, 255, 255, 0.04)",
                  color:
                    activeRange === option.value
                      ? "rgba(255, 255, 255, 0.9)"
                      : "rgba(255, 255, 255, 0.4)",
                  border:
                    activeRange === option.value
                      ? "1px solid rgba(255, 255, 255, 0.2)"
                      : "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
        >
          {/* LEFT COLUMN: GitHub Activity (Graph + Stats) */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* Unified Stats Row (GitHub Focus) */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {/* 1. Total Contributions */}
              <div>
                <p className="meta-text text-foreground/40 mb-1">
                  Contributions (Year)
                </p>
                <p className="text-xl sm:text-2xl font-semibold text-foreground">
                  {loadingGithub
                    ? "..."
                    : githubData
                      ? githubData.totalContributions.toLocaleString()
                      : "—"}
                </p>
              </div>
              {/* 2. Current Streak */}
              <div>
                <p className="meta-text text-foreground/40 mb-1">
                  Current Streak
                </p>
                <p className="text-xl sm:text-2xl font-semibold text-foreground">
                  {loadingGithub
                    ? "..."
                    : githubStreaks
                      ? `${githubStreaks.currentStreak} `
                      : "— "}
                  <span className="text-sm font-normal text-foreground/40">
                    days
                  </span>
                </p>
              </div>
              {/* 3. Longest Streak */}
              <div>
                <p className="meta-text text-foreground/40 mb-1">
                  Longest Streak
                </p>
                <p className="text-xl sm:text-2xl font-semibold text-foreground">
                  {loadingGithub
                    ? "..."
                    : githubStreaks
                      ? `${githubStreaks.longestStreak} `
                      : "— "}
                  <span className="text-sm font-normal text-foreground/40">
                    days
                  </span>
                </p>
              </div>
            </motion.div>

            {/* GitHub Graph */}
            <motion.div variants={itemVariants}>
              {loadingGithub && (
                <div className="flex items-center justify-center py-10">
                  <div className="w-6 h-6 border-2 border-foreground/20 border-t-foreground/60 rounded-full animate-spin" />
                </div>
              )}
              {errorGithub && (
                <div className="py-10 text-center">
                  <p className="body-text text-foreground/40">
                    Unable to load GitHub activity.
                  </p>
                </div>
              )}
              {!loadingGithub && !errorGithub && githubData && (
                <div className="github-graph-container relative overflow-x-auto pb-4 custom-scrollbar">
                  {/* Tooltip */}
                  {tooltip && (
                    <div
                      className="absolute pointer-events-none z-20 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap"
                      style={{
                        left: tooltip.x,
                        top: tooltip.y,
                        transform: "translate(-50%, -100%)",
                        backgroundColor: "rgba(30, 30, 32, 0.95)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.85)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                      }}
                    >
                      {tooltip.text}
                    </div>
                  )}

                  {/* Month labels */}
                  <div className="flex mb-2 ml-[28px]" style={{ gap: 0 }}>
                    {monthLabels.map((m, i) => {
                      const nextCol =
                        i < monthLabels.length - 1
                          ? monthLabels[i + 1].col
                          : githubData.weeks.length;
                      const span = nextCol - m.col;
                      return (
                        <span
                          key={`${m.label}-${m.col}`}
                          className="meta-text text-foreground/30 text-[10px]"
                          style={{ width: `${span * 14}px`, flexShrink: 0 }}
                        >
                          {m.label}
                        </span>
                      );
                    })}
                  </div>

                  <div className="flex gap-0">
                    {/* Day labels */}
                    <div
                      className="flex flex-col justify-between pr-2 shrink-0"
                      style={{ height: `${7 * 14 - 2}px` }}
                    >
                      {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                        <span
                          key={i}
                          className="meta-text text-foreground/30 text-[10px] leading-[12px] h-[12px] flex items-center"
                        >
                          {d}
                        </span>
                      ))}
                    </div>

                    {/* Grid */}
                    <div className="flex" style={{ gap: "2px" }}>
                      {githubData.weeks.map((week, wi) => (
                        <div
                          key={wi}
                          className="flex flex-col"
                          style={{ gap: "2px" }}
                        >
                          {week.contributionDays.map((day, di) => (
                            <div
                              key={`${wi}-${di}`}
                              className="rounded-[2px] transition-all duration-150 cursor-pointer hover:ring-1 hover:ring-foreground/30"
                              style={{
                                width: "12px",
                                height: "12px",
                                backgroundColor:
                                  GITHUB_LEVEL_COLORS[
                                    getGitHubLevel(day.contributionCount)
                                  ],
                              }}
                              onMouseEnter={(e) => handleCellHover(day, e)}
                              onMouseLeave={handleCellLeave}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-end gap-2 mt-4 pr-1">
                    <span className="meta-text text-foreground/30 text-[10px] mr-1">
                      Less
                    </span>
                    {GITHUB_LEVEL_COLORS.map((color, i) => (
                      <div
                        key={i}
                        className="rounded-[2px]"
                        style={{
                          width: "12px",
                          height: "12px",
                          backgroundColor: color,
                        }}
                      />
                    ))}
                    <span className="meta-text text-foreground/30 text-[10px] ml-1">
                      More
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Hackatime Stats & Languages */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            {/* Hackatime Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-6"
            >
              <div>
                <p className="meta-text text-foreground/40 mb-1">Coding Time</p>
                <p className="text-xl sm:text-2xl font-semibold text-foreground">
                  {loadingHackatime
                    ? "..."
                    : hackatimeData
                      ? hackatimeData.human_readable_total || (
                          <>
                            {formatHours(hackatimeData.total_seconds)}{" "}
                            <span className="text-sm font-normal text-foreground/40">
                              hrs
                            </span>
                          </>
                        )
                      : "—"}
                </p>
              </div>
              <div>
                <p className="meta-text text-foreground/40 mb-1">
                  Daily Average
                </p>
                <p className="text-xl sm:text-2xl font-semibold text-foreground">
                  {loadingHackatime
                    ? "..."
                    : hackatimeData
                      ? hackatimeData.human_readable_daily_average ||
                        formatTime(hackatimeData.daily_average || 0)
                      : "—"}
                </p>
              </div>
            </motion.div>

            {/* Language Bars */}
            <motion.div variants={itemVariants} className="flex-1">
              {loadingHackatime && (
                <div className="flex items-center justify-center h-full min-h-[200px]">
                  <div className="w-6 h-6 border-2 border-foreground/20 border-t-foreground/60 rounded-full animate-spin" />
                </div>
              )}
              {errorHackatime && (
                <div className="py-10 text-center">
                  <p className="body-text text-foreground/40">
                    Unable to load coding stats.
                  </p>
                </div>
              )}

              {!loadingHackatime &&
                !errorHackatime &&
                topLanguages.length > 0 && (
                  <div className="space-y-5">
                    {topLanguages.map((lang, i) => (
                      <div key={lang.name}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="body-text text-foreground/80 text-sm">
                            {lang.name}
                          </span>
                          <span className="meta-text text-foreground/40 text-xs">
                            {lang.text || formatTime(lang.total_seconds)} ·{" "}
                            {lang.percent.toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden bg-white/5">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.8,
                              delay: 0.2 + i * 0.05,
                              ease: [0.25, 0.1, 0.25, 1.0],
                            }}
                            className="h-full rounded-full"
                            style={{
                              width: `${(lang.percent / maxLangPercent) * 100}%`,
                              backgroundColor:
                                lang.color ||
                                LANGUAGE_COLORS[i % LANGUAGE_COLORS.length],
                              transformOrigin: "left",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

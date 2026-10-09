import React from "react";
import { motion } from "framer-motion";

import Button from "./Button";

/* ─── Data (edit here) ───────────────────────────────────────────── */
// 🔗 Replace with the real links when available.
// If a URL is null, the matching button renders as a clearly-marked placeholder.
const TRUSTLOCK_URL: string | null = "https://trust-lock-seven.vercel.app/";
const EAG_HACKATHON_URL: string | null =
  "https://x.com/EthAppsGuild/status/2085565733388591363?s=20";

/* ─── Types ──────────────────────────────────────────────────────── */
export interface HackathonAchievementProps {
  place?: string;
  placeEmoji?: string;
  title?: string;
  meta?: string;
  description?: string;
  features?: { title: string; description: string }[];
  technologies?: string[];
  statement?: string;
  projectUrl?: string | null;
  hackathonUrl?: string | null;
}

/* ─── Animation Variants ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Small Pieces ───────────────────────────────────────────────── */
// Minimal Ethereum-diamond glyph (Web3 accent).
const EthDiamond = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M16 2l10 14.5L16 30 6 16.5 16 2zm0 4.3L10.1 16.5 16 19.8l5.9-3.3L16 6.3z" />
  </svg>
);

// Subtle hexagon lattice — a quiet "blockchain" texture.
const hexagonPattern = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='28' height='49' viewBox='0 0 28 49' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f43f5e' fill-opacity='0.07' fill-rule='evenodd'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/svg%3E")`,
};


/* ─── Placeholder link pill ──────────────────────────────────────── */
const PlaceholderPill = ({ label }: { label: string }) => (
  <span
    title="Placeholder — add the real link in HackathonAchievement.tsx"
    className="inline-flex items-center gap-3 rounded-full border-2 border-dashed border-dark-200 dark:border-dark-700 px-8 py-3 text-sm font-semibold text-dark-400 dark:text-dark-500 cursor-not-allowed select-none"
  >
    {label}
    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-dark-100 dark:bg-dark-800 text-dark-500 dark:text-dark-400">
      Coming soon
    </span>
  </span>
);

/* ─── Component ──────────────────────────────────────────────────── */
const EAG_ACHIEVEMENT: Partial<HackathonAchievementProps> = {
  place: "2nd Place",
  placeEmoji: "🥈",
  title: "EAG Hackathon 2026",
  meta: "Hackathon · 2026",
  description:
    "TrustLock is an Ethereum-powered escrow platform that makes peer-to-peer transactions safer — funds stay locked in smart contracts until both parties' agreed conditions are met.",
  features: [
    {
      title: "SafeRent",
      description: "Protect rental deposits until move-in conditions are met",
    },
    {
      title: "Verified Delivery",
      description: "Release payment once an online purchase is verified",
    },
    {
      title: "Freelance Escrow",
      description: "Milestone-based payments for freelancer projects",
    },
    {
      title: "Arbitration Portal",
      description: "Transparent dispute resolution for either party",
    },
  ],
  technologies: [
    "React",
    "TypeScript",
    "Solidity",
    "Ethereum",
    "ethers.js",
    "Hardhat",
  ],
  statement:
    "Built and presented TrustLock, an Ethereum-powered escrow platform designed to make peer-to-peer transactions safer and more transparent.",
  projectUrl: TRUSTLOCK_URL,
  hackathonUrl: EAG_HACKATHON_URL,
};

const HACKHIVE_ACHIEVEMENT: Partial<HackathonAchievementProps> = {
  place: "Top 10",
  placeEmoji: "🏅",
  title: "HackHive 2.0 Hackathon (DASA)",
  meta: "Hackathon · 2026",
  description:
    "A top 10 finish at HackHive 2.0, a developer-focused hackathon organised by DASA. We built and presented a WeWire-powered project within a tight timeframe, iterating on smart-contract logic, wallet flows, and the pitch under live judging.",
  features: [
    {
      title: "WeWire-powered escrow",
      description: "Built the transactional rails that secure escrow payments",
    },
    {
      title: "Wallet integration",
      description: "Connected MetaMask and Sepolia for a smooth user checkout flow",
    },
    {
      title: "Fast iteration",
      description: "Scoped the idea, built a demo, and refined the pitch under pressure",
    },
    {
      title: "Team delivery",
      description: "Collaborated, split ownership, and shipped something coherent end to end",
    },
  ],
  technologies: [
    "React",
    "TypeScript",
    "WeWire",
    "Sandbox",
    "BaaS",
    "Stablecoins",
  ],
  statement:
    "We built and presented a WeWire-powered project at HackHive 2.0, finishing in the top 10 and pushing our smart-contract and wallet-integration skills further under real hackathon pressure.",
  projectUrl: "https://trustlockhq.vercel.app/",
  hackathonUrl: null,
};

const HackathonAchievement: React.FC<HackathonAchievementProps> = () => {
  return (
    <section className="section-padding bg-dark-50 dark:bg-dark-950/80">
      <div className="container-custom">
        {/* ── Section header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 font-black mb-6">
            Recognition
          </p>
          <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">
            Achievements<span className="text-primary-500">.</span>
          </h2>
          <p className="text-lg text-dark-500 dark:text-dark-400 font-light mb-16 max-w-xl">
            Milestones that pushed me into blockchain development.
          </p>
        </motion.div>

        {/* ── Achievements grid ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 lg:gap-14">
          {[
            HACKHIVE_ACHIEVEMENT,
            EAG_ACHIEVEMENT,
          ].map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Single achievement card (reused for EAG and HackHive) ─────── */
const AchievementCard: React.FC<{ achievement: Partial<HackathonAchievementProps>; index: number }> = ({
  achievement,
  index,
}) => {
  const {
    place = "Achievement",
    placeEmoji = "🏆",
    title = "Project",
    meta = "",
    description =
      "A milestone worth remembering.",
    technologies = [],
    projectUrl = null,
    hackathonUrl = null,
  } = achievement;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 * index }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-3xl border border-dark-100 dark:border-dark-800 bg-white dark:bg-dark-900/60 hover:border-secondary-500/40 hover:shadow-2xl hover:shadow-secondary-500/10 transition-all duration-500"
    >
      {/* Gradient top accent */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500" />

      {/* Watermark */}
      <span
        aria-hidden="true"
        className="absolute -bottom-6 -right-2 text-[8rem] md:text-[10rem] font-black leading-none text-dark-900/[0.04] dark:text-white/[0.04] select-none pointer-events-none"
      >
        0x
      </span>

      <div className="relative flex flex-col gap-10 p-8 md:p-12">
        {/* ── Badge / trophy column ── */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative flex flex-col items-center justify-center text-center"
        >
          {/* Hexagon texture */}
          <div
            className="absolute inset-0 opacity-60 dark:opacity-40 pointer-events-none"
            style={hexagonPattern}
          />

          {/* Glow */}
          <div className="absolute w-44 h-44 rounded-full bg-gradient-to-br from-secondary-500/25 to-primary-500/25 blur-2xl group-hover:from-secondary-500/35 group-hover:to-primary-500/35 transition-all duration-700" />

          {/* Medal */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-white dark:bg-dark-950 border border-dark-100 dark:border-dark-800 shadow-2xl shadow-dark-900/10 flex flex-col items-center justify-center mb-6"
          >
            <div className="absolute inset-1.5 rounded-full border-2 border-dashed border-secondary-500/40" />
            <span className="text-4xl md:text-5xl leading-none" aria-hidden="true">
              {placeEmoji}
            </span>
          </motion.div>

          {/* Chips under the medal */}
          <div className="relative flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white dark:bg-dark-950 border border-dark-100 dark:border-dark-800 text-dark-600 dark:text-dark-300">
              <EthDiamond className="w-3.5 h-3.5 text-secondary-500" />
              {(index === 0 ? "WeWire-powered" : "Ethereum-powered")}
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">
              {(index === 0 ? meta : "Hackathon · 2026")}
            </span>
          </div>
        </motion.div>

        {/* ── Content column ── */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="w-full"
          >
            <h3 className="text-3xl md:text-5xl font-black text-dark-900 dark:text-white tracking-tighter mb-3">
              {title}
            </h3>
            <p className="text-primary-600 dark:text-primary-400 font-semibold text-lg mb-6">
              {place} · {meta}
            </p>
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={1}
            className="text-dark-600 dark:text-dark-400 text-lg font-light leading-relaxed mb-8"
          >
            {description}
          </motion.p>

          {/* Tech stack */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={3}
            className="mb-8"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-dark-400 dark:text-dark-600 font-black mb-3">
              Built with
            </p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>


          {/* Actions */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={5}
            className="flex flex-wrap justify-center lg:justify-start gap-4 w-full"
          >
            {projectUrl ? (
              <Button
                variant="primary"
                href={projectUrl}
                target="_blank"
                className="rounded-full px-8 py-3"
              >
                View Project
              </Button>
            ) : (
              <PlaceholderPill label="View Project" />
            )}
            {hackathonUrl ? (
              <Button
                variant="outline"
                href={hackathonUrl}
                target="_blank"
                className="rounded-full px-8 py-3"
              >
                View Hackathon
              </Button>
            ) : (
              <PlaceholderPill label="View Hackathon" />
            )}
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};

export default HackathonAchievement;

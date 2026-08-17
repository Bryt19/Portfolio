import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  FolderGit2,
  GitCommit,
  Github,
  Star,
  Users,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import Button from "./Button";

const GITHUB_USERNAME = "Bryt19";
const PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
// Owner-verified total commits (GitHub's public search API undercounts).
const COMMITS_TOTAL = 1200;

interface ContributionDay {
  date: string;
  level: number;
  count: number;
}

interface GitHubData {
  user: {
    name: string;
    login: string;
    avatarUrl: string;
    url: string;
    bio: string;
    location: string;
    followers: number;
    following: number;
    publicRepos: number;
  } | null;
  stats: {
    repos: number;
    stars: number;
    forks: number;
    commits: number;
    followers: number | null;
    following: number | null;
  };
  contributions: { total: number | null; days: ContributionDay[] };
  generatedAt?: string;
}

/* ---------- helpers ---------- */

const LEVEL_COLORS: Record<"light" | "dark", string[]> = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#1b1f23", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

function timeAgo(iso: string | null): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function formatDay(date: string): string {
  const d = new Date(`${date}T00:00:00`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/* ---------- animated counter (matches Home's pattern) ---------- */

const Counter = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration: 1.8, ease: "easeOut" });
      return controls.stop;
    }
  }, [count, to, isInView]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix && <span className="text-primary-500">{suffix}</span>}
    </span>
  );
};

/* ---------- contribution graph ---------- */

const ContributionGraph = ({ days }: { days: ContributionDay[] }) => {
  const { isDark } = useTheme();
  const colors = LEVEL_COLORS[isDark ? "dark" : "light"];
  const cellSize = 11;
  const gap = 3;
  const numCols = Math.max(1, Math.ceil(days.length / 7));

  const [hover, setHover] = useState<{
    x: number;
    y: number;
    date: string;
    count: number;
    level: number;
  } | null>(null);

  const monthLabels = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const map = new Map<number, string>();
    days.forEach((d, i) => {
      const col = Math.floor(i / 7);
      if (d.date.endsWith("-01") && !map.has(col)) {
        map.set(col, months[parseInt(d.date.slice(5, 7), 10) - 1]);
      }
    });
    if (!map.has(0) && days.length > 0) {
      map.set(0, months[parseInt(days[0].date.slice(5, 7), 10) - 1]);
    }
    return Array.from(map.entries());
  }, [days]);

  if (!days.length) {
    return (
      <p className="text-dark-500 dark:text-dark-400 text-sm font-light">
        The contribution graph loads on the deployed site.
      </p>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-max">
          {/* Month labels */}
          <div
            className="relative h-4 mb-1"
            style={{ width: numCols * cellSize + (numCols - 1) * gap }}
          >
            {monthLabels.map(([col, label]) => (
              <span
                key={col}
                className="absolute top-0 text-[9px] font-bold uppercase tracking-wider text-dark-400 dark:text-dark-500"
                style={{ left: col * (cellSize + gap) }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex">
            {/* Weekday labels */}
            <div
              className="grid grid-rows-7 gap-[3px] mr-2 text-[9px] font-bold uppercase text-dark-400 dark:text-dark-500"
              style={{ gridTemplateRows: `repeat(7, ${cellSize}px)` }}
            >
              {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                <span key={i} className="leading-[11px]">
                  {d}
                </span>
              ))}
            </div>

            {/* Cells */}
            <div
              className="grid grid-flow-col gap-[3px]"
              style={{ gridTemplateRows: `repeat(7, ${cellSize}px)`, gridAutoColumns: `${cellSize}px` }}
            >
              {days.map((d, i) => (
                <div
                  key={i}
                  role="gridcell"
                  aria-label={`${d.count} contributions on ${formatDay(d.date)}`}
                  onMouseEnter={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    setHover({ x: r.left + r.width / 2, y: r.top, date: d.date, count: d.count, level: d.level });
                  }}
                  onMouseLeave={() => setHover(null)}
                  className="rounded-[2px] cursor-pointer transition-transform duration-150 hover:scale-150"
                  style={{ backgroundColor: colors[d.level] }}
                />
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 justify-end">
            <span className="text-[9px] font-bold uppercase tracking-wider text-dark-400 dark:text-dark-500">Less</span>
            {colors.map((c, i) => (
              <span key={i} className="w-[11px] h-[11px] rounded-[2px]" style={{ backgroundColor: c }} />
            ))}
            <span className="text-[9px] font-bold uppercase tracking-wider text-dark-400 dark:text-dark-500">More</span>
          </div>
        </div>
      </div>

      {/* Floating tooltip */}
      {hover && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{ left: hover.x, top: hover.y, transform: "translate(-50%, calc(-100% - 12px))" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="whitespace-nowrap bg-dark-900 dark:bg-white text-white dark:text-dark-900 text-[10px] font-black uppercase tracking-widest px-3 py-2 shadow-xl"
          >
            {hover.count > 0 ? `${hover.count} contribution${hover.count === 1 ? "" : "s"}` : "No contributions"}
            <span className="opacity-60"> · {formatDay(hover.date)}</span>
          </motion.div>
        </div>
      )}
    </div>
  );
};

/* ---------- dev-only fallback (direct GitHub API calls) ---------- */

function buildClientData(user: any, repos: any[]): GitHubData {
  const ownRepos = (repos || []).filter((r: any) => !r.fork);

  return {
    user: user
      ? {
          name: user.name || user.login,
          login: user.login,
          avatarUrl: user.avatar_url,
          url: user.html_url,
          bio: user.bio,
          location: user.location,
          followers: user.followers,
          following: user.following,
          publicRepos: user.public_repos,
        }
      : null,
    stats: {
      repos: ownRepos.length,
      stars: ownRepos.reduce((s: number, r: any) => s + (r.stargazers_count || 0), 0),
      forks: ownRepos.reduce((s: number, r: any) => s + (r.forks_count || 0), 0),
      commits: COMMITS_TOTAL,
      followers: user?.followers ?? null,
      following: user?.following ?? null,
    },
    contributions: { total: null, days: [] },
  };
}

/* ---------- main section ---------- */

const GitHubSection: React.FC = () => {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/github");
      if (res.ok && (res.headers.get("content-type") || "").includes("application/json")) {
        const json = await res.json();
        // Only accept payloads with real user data. If the proxy's GitHub call
        // failed (e.g. rate limit) it returns user: null, which would render
        // followers as 0 instead of surfacing the problem.
        if (json && json.user) {
          setData(json);
          setLoading(false);
          return;
        }
      }
      throw new Error("proxy unavailable");
    } catch {
      // Dev / offline fallback: api.github.com sends CORS headers, so we can
      // assemble the same data directly. The contribution graph fragment does
      // not, so it only appears on the deployed site.
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        ]);
        // A non-2xx here is usually the unauthenticated rate limit. Throw so the
        // error state renders instead of silently showing followers as 0.
        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API unavailable");
        const user = await userRes.json();
        const repos = await reposRes.json();
        if (!user?.login) throw new Error("GitHub API returned invalid data");
        setData(buildClientData(user, repos));
      } catch {
        setError("Couldn't reach GitHub right now. Try again in a moment.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const stats: { icon: React.ElementType; label: string; value: number; suffix?: string }[] = data
    ? [
        { icon: Users, label: "Followers", value: data.stats.followers ?? 0 },
        { icon: Star, label: "Stars", value: data.stats.stars, suffix: "+" },
        { icon: FolderGit2, label: "Repositories", value: data.stats.repos, suffix: "+" },
        { icon: GitCommit, label: "Total Commits", value: data.stats.commits, suffix: "+" },
      ]
    : [];

  return (
    <section className="section-padding bg-white dark:bg-dark-950 border-b-2 border-dark-200 dark:border-dark-700 overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h2 className="text-xs uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 font-bold mb-4">
              GitHub
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-dark-900 dark:text-white leading-none tracking-tighter mb-8">
              Code in the <span className="text-dark-400 dark:text-dark-600">open.</span>
            </h3>
            <p className="text-dark-600 dark:text-dark-400 text-lg font-light leading-relaxed max-w-xl">
              Live stats, activity and contributions pulled straight from GitHub — proof that the
              code behind this site keeps shipping.
            </p>
          </motion.div>

          {data?.user && (
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
              href={data.user.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 border-2 border-dark-200 dark:border-dark-700 hover:border-primary-500 transition-colors p-5 pr-6 max-w-xs shrink-0"
            >
              <img
                src={data.user.avatarUrl}
                alt={data.user.name}
                loading="lazy"
                className="w-14 h-14 rounded-full grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div>
                <p className="text-lg font-black text-dark-900 dark:text-white leading-tight">{data.user.name}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-primary-500">@{data.user.login}</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-dark-400 dark:text-dark-600 group-hover:text-primary-500 transition-colors ml-2" />
            </motion.a>
          )}
        </div>

        {/* States */}
        {loading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <div className="mx-auto w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
            <p className="mt-6 text-sm font-black uppercase tracking-widest text-dark-500 dark:text-dark-400">
              Pulling from GitHub...
            </p>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-2 border-dashed border-dark-300 dark:border-dark-700 text-center py-24 px-6"
          >
            <Github className="w-12 h-12 text-dark-300 dark:text-dark-600 mx-auto mb-6" />
            <h4 className="text-2xl font-black text-dark-900 dark:text-white mb-3">GitHub data unavailable</h4>
            <p className="text-dark-500 dark:text-dark-400 font-light mb-8">{error}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" onClick={loadData} className="border-dark-900 dark:border-white text-dark-900 dark:text-white hover:bg-dark-900 dark:hover:bg-white hover:text-white dark:hover:text-dark-900 rounded-none">
                Try Again
              </Button>
              <Button variant="outline" href={PROFILE_URL} target="_blank" className="border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white rounded-none">
                View Profile
              </Button>
            </div>
          </motion.div>
        ) : (
          data && (
            <>
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 border-t-2 border-dark-200 dark:border-dark-700 pt-12 mb-20"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <stat.icon className="w-4 h-4 text-primary-500" />
                      <span className="text-[10px] uppercase tracking-[0.3em] text-dark-400 dark:text-dark-500 font-bold">
                        {stat.label}
                      </span>
                    </div>
                    <div className="text-4xl md:text-5xl font-black text-dark-900 dark:text-white tracking-tighter">
                      <Counter to={stat.value} suffix={stat.suffix} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contribution graph */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="border-2 border-dark-200 dark:border-dark-700 p-6 md:p-10"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 font-bold mb-2">
                      Contribution Graph
                    </h4>
                    <p className="text-2xl md:text-3xl font-black text-dark-900 dark:text-white tracking-tighter">
                      {data.contributions.total !== null ? (
                        <>
                          <span className="text-primary-500">{data.contributions.total.toLocaleString()}</span>{" "}
                          contributions in the last year
                        </>
                      ) : (
                        "Last 12 months of commits"
                      )}
                    </p>
                  </div>
                  {data.generatedAt && (
                    <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-dark-400 dark:text-dark-500">
                      <CalendarDays className="w-3.5 h-3.5" />
                      Updated {timeAgo(data.generatedAt)}
                    </span>
                  )}
                </div>

                <ContributionGraph days={data.contributions.days} />

                {data.contributions.days.length > 0 && (
                  <p className="text-[10px] font-bold uppercase tracking-widest text-dark-400 dark:text-dark-500 mt-4">
                    Hover a square to see the day's activity.
                  </p>
                )}
              </motion.div>

            </>
          )
        )}
      </div>
    </section>
  );
};

export default GitHubSection;

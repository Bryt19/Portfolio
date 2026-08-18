// Serverless proxy that aggregates public GitHub data for the portfolio's
// GitHub section. Keeps API keys off the client and avoids CORS issues
// (the contribution graph fragment does not send CORS headers).
//
// Optional env vars:
//   GITHUB_USERNAME - default "Bryt19"
//   GITHUB_TOKEN    - a personal access token (public read scope) to raise
//                     the rate limit from 60 to 5,000 requests/hour.

const GITHUB_USER = process.env.GITHUB_USERNAME || "Bryt19";
const TOKEN = process.env.GITHUB_TOKEN || "";
const GH_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "bright-akoto-portfolio",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

async function ghJson(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers: GH_HEADERS });
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${path}`);
  return res.json();
}

const safe = (fn) =>
  fn().catch((err) => {
    console.error("[api/github]", err.message);
    return null;
  });

// GitHub's own profile fragment (https://github.com/users/<user>/contributions)
// renders the yearly graph as <td> cells carrying data-date / data-level plus
// <tool-tip> elements with the exact counts. Parse it into a clean array.
async function fetchContributions() {
  const res = await fetch(`https://github.com/users/${GITHUB_USER}/contributions`);
  if (!res.ok) return { total: null, days: [] };
  const html = await res.text();

  const totalMatch = html.match(/([\d,]+)\s+contributions?\s+in the last year/i);
  const total = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ""), 10) : null;

  // tooltip id -> text, e.g. "14 contributions on September 7th."
  const tips = {};
  const tipRe = /<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;
  let m;
  while ((m = tipRe.exec(html))) tips[m[1]] = m[2].trim();

  const days = [];
  const dayRe = /<td[^>]*data-date="([\d-]+)"[^>]*>/g;
  while ((m = dayRe.exec(html))) {
    const el = m[0];
    const date = m[1];
    const level = parseInt((el.match(/data-level="(\d)"/) || [])[1] ?? "0", 10);
    const id = (el.match(/id="([^"]+)"/) || [])[1] || "";
    const tip = tips[id] || "";
    const countMatch = tip.match(/(\d+)\s+contributions?/);
    days.push({
      date,
      level,
      count: countMatch ? parseInt(countMatch[1], 10) : 0,
    });
  }
  return { total, days };
}

// Map the public events feed to a small, readable activity timeline.
async function fetchEvents() {
  const events = await ghJson(`/users/${GITHUB_USER}/events/public?per_page=30`);
  const feed = [];
  for (const ev of events) {
    const repo = ev.repo?.name || "";
    const repoUrl = `https://github.com/${repo}`;
    let text = "";
    switch (ev.type) {
      case "PushEvent": {
        const msgs = (ev.payload?.commits || [])
          .slice(0, 2)
          .map((c) => (c.message || "").split("\n")[0])
          .filter(Boolean);
        text = msgs.length ? msgs.join(" · ") : `Pushed to ${repo}`;
        break;
      }
      case "CreateEvent":
        text =
          ev.payload?.ref_type === "repository"
            ? `Created repository ${repo}`
            : `Created ${ev.payload?.ref_type} ${ev.payload?.ref || ""} on ${repo}`.trim();
        break;
      case "DeleteEvent":
        text = `Deleted ${ev.payload?.ref_type} ${ev.payload?.ref || ""} on ${repo}`.trim();
        break;
      case "ForkEvent":
        text = `Forked ${repo}`;
        break;
      case "WatchEvent":
        text = `Starred ${repo}`;
        break;
      case "IssuesEvent":
        text = ev.payload?.issue?.title
          ? `${ev.payload?.action || "opened"} issue "${ev.payload.issue.title}" on ${repo}`
          : `${ev.payload?.action || "opened"} an issue on ${repo}`;
        break;
      case "PullRequestEvent":
        text = ev.payload?.pull_request?.title
          ? `${ev.payload?.action || "opened"} PR "${ev.payload.pull_request.title}" on ${repo}`
          : `${ev.payload?.action || "opened"} a PR on ${repo}`;
        break;
      case "ReleaseEvent":
        text = `Released ${ev.payload?.release?.tag_name || ""} on ${repo}`.trim();
        break;
      case "PublicEvent":
        text = `Open-sourced ${repo}`;
        break;
      default:
        continue;
    }
    // Collapse consecutive pushes to the same repo into one timeline entry.
    const last = feed[feed.length - 1];
    if (ev.type === "PushEvent" && last && last.repo === repo && last.type === "PushEvent") {
      continue;
    }
    feed.push({ id: ev.id, type: ev.type, text, repo, repoUrl, date: ev.created_at });
    if (feed.length >= 8) break;
  }
  return feed;
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const [user, repos, contributions, feed] = await Promise.all([
    safe(() => ghJson(`/users/${GITHUB_USER}`)),
    safe(() => ghJson(`/users/${GITHUB_USER}/repos?per_page=100&sort=updated`)),
    safe(fetchContributions),
    safe(fetchEvents),
  ]);

  // Count only repos the user actually authored (exclude forks).
  const ownRepos = (repos || []).filter((r) => !r.fork);

  // Most-used languages: aggregate each repo's primary language.
  const languageCounts = {};
  for (const r of ownRepos) {
    if (r.language) languageCounts[r.language] = (languageCounts[r.language] || 0) + 1;
  }
  const totalLang = Object.values(languageCounts).reduce((a, b) => a + b, 0) || 1;
  const languages = Object.entries(languageCounts)
    .map(([name, count]) => ({
      name,
      count,
      percent: Math.round((count / totalLang) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const recentRepos = [...ownRepos]
    .sort((a, b) => new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0))
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      url: r.html_url,
      pushedAt: r.pushed_at,
    }));

  const payload = {
    user: user
      ? {
          name: user.name || user.login,
          login: user.login,
          avatarUrl: user.avatar_url,
          url: user.html_url,
          bio: user.bio,
          location: user.location,
          following: user.following,
          publicRepos: user.public_repos,
        }
      : null,
    stats: {
      repos: ownRepos.length,
      stars: ownRepos.reduce((s, r) => s + (r.stargazers_count || 0), 0),
      forks: ownRepos.reduce((s, r) => s + (r.forks_count || 0), 0),
      // Owner-verified total: GitHub's public search API undercounts. Override via GITHUB_COMMITS.
      commits: parseInt(process.env.GITHUB_COMMITS || "1200", 10),
      following: user?.following ?? null,
    },
    languages,
    recentRepos,
    contributions,
    feed: feed || [],
    generatedAt: new Date().toISOString(),
  };

  // Cache on Vercel's CDN so GitHub's rate limits are barely touched.
  // Only cache complete payloads: if the user fetch failed (e.g. rate limit)
  // don't cache a zeroed-out response and serve it to every visitor.
  res.setHeader(
    "Cache-Control",
    user ? "public, s-maxage=1800, stale-while-revalidate=86400" : "no-store"
  );
  return res.status(200).json(payload);
}

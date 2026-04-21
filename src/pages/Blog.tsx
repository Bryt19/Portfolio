import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Search, X } from "lucide-react";
import Button from "../components/Button";
import { BlogPost } from "../types";

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>(() => {
    // Get category from URL params on initial load
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    return category || "all";
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>([]);
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [subscribeStatus, setSubscribeStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [subscribeMessage, setSubscribeMessage] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const staticPosts: BlogPost[] = [
    {
      id: "1",
      title: "Building Scalable React Applications with TypeScript",
      excerpt:
        "Learn how to structure and scale React applications using TypeScript, proper state management, and modern development practices.",
      content: "Full article content here...",
      publishedAt: "2024-01-15",
      readTime: "8 min read",
      tags: ["React", "TypeScript", "Web Development"],
      image: "/api/placeholder/600/300",
    },
    {
      id: "2",
      title: "The Complete Guide to CSS Grid and Flexbox",
      excerpt:
        "Master modern CSS layout techniques with this comprehensive guide covering Grid and Flexbox fundamentals and advanced patterns.",
      content: "Full article content here...",
      publishedAt: "2024-01-10",
      readTime: "12 min read",
      tags: ["CSS", "Layout", "Web Design"],
      image: "/api/placeholder/600/300",
    },
    {
      id: "3",
      title: "Node.js Performance Optimization Techniques",
      excerpt:
        "Discover proven strategies to optimize Node.js applications for better performance, scalability, and user experience.",
      content: "Full article content here...",
      publishedAt: "2024-01-05",
      readTime: "10 min read",
      tags: ["Node.js", "Performance", "Backend"],
      image: "/api/placeholder/600/300",
    },
    {
      id: "4",
      title: "Design Systems: Building Consistent UI Components",
      excerpt:
        "Learn how to create and maintain design systems that ensure consistency across your applications and improve developer experience.",
      content: "Full article content here...",
      publishedAt: "2023-12-28",
      readTime: "15 min read",
      tags: ["Design Systems", "UI/UX", "Frontend"],
      image: "/api/placeholder/600/300",
    },
    {
      id: "5",
      title: "Getting Started with Docker for Web Developers",
      excerpt:
        "A beginner-friendly guide to containerizing web applications with Docker, including best practices and common pitfalls.",
      content: "Full article content here...",
      publishedAt: "2023-12-20",
      readTime: "6 min read",
      tags: ["Docker", "DevOps", "Deployment"],
      image: "/api/placeholder/600/300",
    },
    {
      id: "6",
      title: "Modern JavaScript ES6+ Features You Should Know",
      excerpt:
        "Explore essential ES6+ JavaScript features that every developer should master for writing cleaner, more efficient code.",
      content: "Full article content here...",
      publishedAt: "2023-12-15",
      readTime: "9 min read",
      tags: ["JavaScript", "ES6", "Programming"],
      image: "/api/placeholder/600/300",
    },
  ];

  // Use fetched posts when available; otherwise fall back to static seed posts
  const blogPosts: BlogPost[] = fetchedPosts.length
    ? fetchedPosts
    : staticPosts;

  // Restrict categories to a concise set
  const desiredCategories = [
    "Frontend",
    "Backend",
    "Cybersecurity",
    "Programming",
    "Tech News",
  ] as const;

  type DesiredCategory = (typeof desiredCategories)[number];

  // Map a post's tags to the configured high-level categories
  const mapPostToCategories = (post: BlogPost): DesiredCategory[] => {
    const tagSet = new Set(post.tags.map((t) => t.toLowerCase()));

    const categories: DesiredCategory[] = [];

    // Frontend
    if (
      [
        "react",
        "typescript",
        "css",
        "layout",
        "ui/ux",
        "frontend",
        "design systems",
        "web design",
      ].some((k) => tagSet.has(k))
    ) {
      categories.push("Frontend");
    }

    // Backend
    if (
      [
        "node.js",
        "backend",
        "performance",
        "docker",
        "devops",
        "deployment",
        "database",
      ].some((k) => tagSet.has(k))
    ) {
      categories.push("Backend");
    }

    // Cybersecurity
    if (
      [
        "cybersecurity",
        "security",
        "hacking",
        "malware",
        "data protection",
        "privacy",
      ].some((k) => tagSet.has(k))
    ) {
      categories.push("Cybersecurity");
    }

    // Programming
    if (
      [
        "programming",
        "javascript",
        "es6",
        "typescript",
        "python",
        "java",
        "c++",
        "c#",
        "go",
        "rust",
        "swift",
        "kotlin",
        "php",
        "ruby",
        "coding",
        "software development",
        "algorithm",
        "data structure",
      ].some((k) => tagSet.has(k))
    ) {
      categories.push("Programming");
    }

    // Tech News
    if (["news", "tech news", "trends"].some((k) => tagSet.has(k))) {
      categories.push("Tech News");
    }

    return categories;
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const postCategories = mapPostToCategories(post);
    const matchesTag =
      selectedTag === "all" ||
      postCategories.includes(selectedTag as DesiredCategory);
    return matchesSearch && matchesTag;
  });

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedTag(category);
    const url = new URL(window.location.href);
    if (category === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", category);
    }
    window.history.replaceState({}, "", url.toString());
  };

  // Handle newsletter subscribe (basic client-side validation + feedback)
  const handleSubscribe = () => {
    const email = newsletterEmail.trim();
    // Simple email regex
    const isValid = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
    if (!isValid) {
      setSubscribeStatus("error");
      setSubscribeMessage("Please enter a valid email address.");
      return;
    }
    // Simulate success (replace with real API call if available)
    setSubscribeStatus("success");
    setSubscribeMessage("Thanks! You're subscribed.");
    setNewsletterEmail("");
    // Auto-clear success after a short delay
    window.setTimeout(() => {
      setSubscribeStatus("idle");
      setSubscribeMessage("");
    }, 3000);
  };

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  // Build query based on selected category and search term
  const queryTerm = useMemo(() => {
    if (searchTerm.trim()) return searchTerm.trim();
    switch (selectedTag) {
      case "Frontend":
        return "frontend development";
      case "Backend":
        return "backend development";
      case "Cybersecurity":
        return "cybersecurity";
      case "Programming":
        return "programming";
      case "Tech News":
        return "technology";
      default:
        return "technology";
    }
  }, [selectedTag, searchTerm]);

  const newsApiKey = import.meta.env.VITE_NEWSAPI_KEY as string | undefined;
  const apitubeKey = import.meta.env.VITE_APITUBE_API_KEY as string | undefined;
  const currentApiKey = import.meta.env.VITE_CURRENTAPI_KEY as string | undefined;
  const polygonApiKey = import.meta.env.VITE_POLYGON_API_KEY as string | undefined;

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {

        // Debug which keys are present (do NOT log actual keys)
        console.log("[Blog] API keys presence:", {
          newsApi: Boolean(newsApiKey),
          apitube: Boolean(apitubeKey),
          polygon: Boolean(polygonApiKey),
          currentApi: Boolean(currentApiKey),
          queryTerm,
          selectedTag,
        });

        if (newsApiKey) {
          // Prefer NewsAPI if available
          const params = new URLSearchParams({
            q: queryTerm,
            language: "en",
            pageSize: "12",
            sortBy: "publishedAt",
            apiKey: newsApiKey,
          });
          const res = await fetch(
            `https://newsapi.org/v2/everything?${params.toString()}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            const text = await res.text().catch(() => "");
            console.warn("[Blog] NewsAPI error (falling back)", res.status, text);
            // If it's a 426 or any other non-ok response, we check if other keys exist to fallback
            if (apitubeKey || polygonApiKey || currentApiKey) {
               // Continue to next fallback
            } else {
              throw new Error(`Failed to fetch news from NewsAPI (${res.status})`);
            }
          } else {
            const data = await res.json();
            const articles: any[] = data.articles || [];
            console.log(`[Blog] NewsAPI returned ${articles.length} articles`);
            const mapped: BlogPost[] = articles.map((a: any, idx: number) => {
              const title: string = a.title || "Untitled";
              const description: string = a.description || a.content || "";
              const publishedAt: string =
                a.publishedAt || new Date().toISOString();
              const image: string | undefined = a.urlToImage;
              const content: string = a.content || description;
              const words = (content || description)
                .split(/\s+/)
                .filter(Boolean).length;
              const minutes = Math.max(1, Math.ceil(words / 200));
              const derivedTags: string[] = [];
              const lower = (title + " " + description).toLowerCase();
              if (/(react|vue|angular|css|frontend|ui|ux)/.test(lower))
                derivedTags.push("Frontend");
              if (/(node|docker|devops|server|database|backend)/.test(lower))
                derivedTags.push("Backend");
              if (
                /(cybersecurity|security|hacking|malware|data protection|privacy)/.test(
                  lower
                )
              )
                derivedTags.push("Cybersecurity");
              if (
                /(programming|javascript|typescript|es6|python|java|c\+\+|c#|go|rust|swift|kotlin|php|ruby|coding|software development|algorithm|data structure)/.test(
                  lower
                )
              )
                derivedTags.push("Programming");
              if (/(tech news|technology|trends|ai|industry)/.test(lower))
                derivedTags.push("Tech News");
              return {
                id: `${a.source?.id || a.url || Date.now()}-${idx}`,
                title,
                excerpt: description,
                content,
                publishedAt,
                readTime: `${minutes} min read`,
                tags: derivedTags.length ? derivedTags : ["Tech News"],
                image,
              };
            });
            setFetchedPosts(mapped);
            setLoading(false);
            return; // Exit successful fetch
          }
        }

        if (apitubeKey) {
          // Fallback to APITube
          const params = new URLSearchParams({
            title: queryTerm,
            "language.code": "en",
            limit: "12",
          });
          const res = await fetch(
            `https://api.apitube.io/v1/news/everything?${params.toString()}`,
            {
              headers: { "X-API-Key": apitubeKey },
              signal: controller.signal,
            }
          );
          if (!res.ok) {
            const text = await res.text().catch(() => "");
            console.warn("[Blog] APITube error (falling back)", res.status, text);
            if (polygonApiKey || currentApiKey) {
               // Continue
            } else {
              throw new Error(`Failed to fetch news from APITube (${res.status})`);
            }
          } else {
            const data = await res.json();
            const articles: any[] = data.articles || data.data || [];
            console.log(`[Blog] APITube returned ${articles.length} articles`);
            const mapped: BlogPost[] = articles.map((a, idx) => {
              const title: string = a.title || a.headline || "Untitled";
              const description: string =
                a.description || a.summary || a.excerpt || "";
              const publishedAt: string =
                a.published_at ||
                a.publishedAt ||
                a.date ||
                new Date().toISOString();
              const image: string | undefined =
                a.image_url || a.image || a.thumbnail;
              const content: string = a.content || description;
              const words = (content || description)
                .split(/\s+/)
                .filter(Boolean).length;
              const minutes = Math.max(1, Math.ceil(words / 200));
              const derivedTags: string[] = [];
              const lower = (title + " " + description).toLowerCase();
              if (/(react|vue|angular|css|frontend|ui|ux)/.test(lower))
                derivedTags.push("Frontend");
              if (/(node|docker|devops|server|database|backend)/.test(lower))
                derivedTags.push("Backend");
              if (
                /(cybersecurity|security|hacking|malware|data protection|privacy)/.test(
                  lower
                )
              )
                derivedTags.push("Cybersecurity");
              if (
                /(programming|javascript|typescript|es6|python|java|c\+\+|c#|go|rust|swift|kotlin|php|ruby|coding|software development|algorithm|data structure)/.test(
                  lower
                )
              )
                derivedTags.push("Programming");
              if (/(tech news|technology|trends|ai|industry)/.test(lower))
                derivedTags.push("Tech News");
              return {
                id:
                  a.id?.toString?.() ||
                  a._id?.toString?.() ||
                  `${Date.now()}-${idx}`,
                title,
                excerpt: description,
                content,
                publishedAt,
                readTime: `${minutes} min read`,
                tags: derivedTags.length ? derivedTags : ["Web Development"],
                image,
              };
            });
            setFetchedPosts(mapped);
            setLoading(false);
            return;
          }
        }

        if (polygonApiKey) {
          // Third fallback to Polygon.io
          const params = new URLSearchParams({
            q: queryTerm,
            limit: "12",
            apikey: polygonApiKey,
          });
          const res = await fetch(
            `https://api.polygon.io/v1/reference/news?${params.toString()}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            const text = await res.text().catch(() => "");
            console.warn("[Blog] Polygon error (falling back)", res.status, text);
            if (currentApiKey) {
               // Continue
            } else {
              throw new Error(`Failed to fetch news from Polygon (${res.status})`);
            }
          } else {
            const data = await res.json();
            const articles: any[] = data.results || [];
            console.log(`[Blog] Polygon returned ${articles.length} articles`);
            const mapped: BlogPost[] = articles.map((a: any, idx: number) => {
              const title: string = a.title || "Untitled";
              const description: string = a.description || a.content || "";
              const publishedAt: string =
                a.published_utc || new Date().toISOString();
              const image: string | undefined = a.image_url;
              const content: string = a.content || description;
              const words = (content || description)
                .split(/\s+/)
                .filter(Boolean).length;
              const minutes = Math.max(1, Math.ceil(words / 200));
              const derivedTags: string[] = [];
              const lower = (title + " " + description).toLowerCase();
              if (/(react|vue|angular|css|frontend|ui|ux)/.test(lower))
                derivedTags.push("Frontend");
              if (/(node|docker|devops|server|database|backend)/.test(lower))
                derivedTags.push("Backend");
              if (
                /(cybersecurity|security|hacking|malware|data protection|privacy)/.test(
                  lower
                )
              )
                derivedTags.push("Cybersecurity");
              if (
                /(programming|javascript|typescript|es6|python|java|c\+\+|c#|go|rust|swift|kotlin|php|ruby|coding|software development|algorithm|data structure)/.test(
                  lower
                )
              )
                derivedTags.push("Programming");
              if (/(tech news|technology|trends|ai|industry)/.test(lower))
                derivedTags.push("Tech News");
              return {
                id: `${a.id || a.article_url || Date.now()}-${idx}`,
                title,
                excerpt: description,
                content,
                publishedAt,
                readTime: `${minutes} min read`,
                tags: derivedTags.length ? derivedTags : ["Tech News"],
                image,
              };
            });
            setFetchedPosts(mapped);
            setLoading(false);
            return;
          }
        }

        if (currentApiKey) {
          // Final fallback to CurrentAPI
          const params = new URLSearchParams({
            q: queryTerm,
            lang: "en",
            limit: "12",
          });
          const res = await fetch(
            `https://api.currentapi.services/v1/news?${params.toString()}`,
            {
              headers: { "X-API-Key": currentApiKey },
              signal: controller.signal,
            }
          );
          if (!res.ok) {
            const text = await res.text().catch(() => "");
            console.error("[Blog] CurrentAPI error", res.status, text);
            throw new Error(`Failed to fetch news from CurrentAPI (${res.status})`);
          }
          const data = await res.json();
          const articles: any[] = data.articles || data.data || [];
          console.log(`[Blog] CurrentAPI returned ${articles.length} articles`);
          const mapped: BlogPost[] = articles.map((a, idx) => {
            const title: string = a.title || a.headline || "Untitled";
            const description: string =
              a.description || a.summary || a.excerpt || "";
            const publishedAt: string =
              a.published_at ||
              a.publishedAt ||
              a.date ||
              new Date().toISOString();
            const image: string | undefined =
              a.image_url || a.image || a.thumbnail;
            const content: string = a.content || description;
            const words = (content || description)
              .split(/\s+/)
              .filter(Boolean).length;
            const minutes = Math.max(1, Math.ceil(words / 200));
            const derivedTags: string[] = [];
            const lower = (title + " " + description).toLowerCase();
            if (/(react|vue|angular|css|frontend|ui|ux)/.test(lower))
              derivedTags.push("Frontend");
            if (/(node|docker|devops|server|database|backend)/.test(lower))
              derivedTags.push("Backend");
            if (
              /(cybersecurity|security|hacking|malware|data protection|privacy)/.test(
                lower
              )
            )
              derivedTags.push("Cybersecurity");
            if (
              /(programming|javascript|typescript|es6|python|java|c\+\+|c#|go|rust|swift|kotlin|php|ruby|coding|software development|algorithm|data structure)/.test(
                lower
              )
            )
              derivedTags.push("Programming");
            if (/(tech news|technology|trends|ai|industry)/.test(lower))
              derivedTags.push("Tech News");
            return {
              id:
                a.id?.toString?.() ||
                a._id?.toString?.() ||
                `${Date.now()}-${idx}`,
              title,
              excerpt: description,
              content,
              publishedAt,
              readTime: `${minutes} min read`,
              tags: derivedTags.length ? derivedTags : ["Tech News"],
              image,
            };
          });
          setFetchedPosts(mapped);
          setLoading(false);
          return;
        }

        // Final catch if no keys worked or were present
        if (!newsApiKey && !apitubeKey && !polygonApiKey && !currentApiKey) {
           throw new Error("No News API keys configured.");
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          let msg = err.message || "Failed to load news";
          if (msg.includes("426")) {
            msg = "NewsAPI restricted on production (Free tier). Falling back...";
          }
          setError(msg);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    return () => controller.abort();
  }, [queryTerm]);



  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      {/* Hero Section */}
      <section className="pt-40 pb-20 border-b border-dark-100 dark:border-dark-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <h1 className="text-7xl md:text-9xl font-black text-dark-900 dark:text-white leading-none tracking-tighter mb-12">
              The <br />
              <span className="text-primary-500">Journal.</span>
            </h1>
            <p className="text-xl md:text-3xl text-dark-600 dark:text-dark-400 font-light leading-snug max-w-3xl">
              Thoughts, tutorials, and insights about web development, design, and technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 border-b border-dark-100 dark:border-dark-800">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`text-sm uppercase tracking-widest font-black transition-colors ${
                  selectedTag === "all" ? "text-primary-500 underline underline-offset-8" : "text-dark-400 hover:text-dark-900 dark:hover:text-white"
                }`}
              >
                All Posts
              </button>
              {desiredCategories.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleCategoryChange(tag)}
                  className={`text-sm uppercase tracking-widest font-black transition-colors ${
                    selectedTag === tag ? "text-primary-500 underline underline-offset-8" : "text-dark-400 hover:text-dark-900 dark:hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
              <input
                type="text"
                placeholder="SEARCH ARTICLES"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-b border-dark-100 dark:border-dark-800 pl-6 py-2 text-base md:text-sm uppercase tracking-widest font-black focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="mx-auto w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-dark-600 dark:text-dark-300">
                Loading latest articles...
              </p>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <h3 className="text-xl font-semibold text-dark-900 dark:text-white mb-2">
                Failed to load news
              </h3>
              <p className="text-dark-600 dark:text-dark-300">{error}</p>
            </motion.div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col h-full bg-white dark:bg-dark-900 border border-dark-100 dark:border-dark-800 hover:border-primary-500 transition-colors"
                >
                  {/* Post Image */}
                  <div className="aspect-video bg-dark-100 dark:bg-dark-800 overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        onError={(e) => {
                          (
                            e.currentTarget as HTMLImageElement
                          ).style.display = "none";
                          const parent = (e.currentTarget as HTMLImageElement)
                            .parentElement;
                          if (parent) {
                            parent.className =
                              "aspect-video bg-dark-100 dark:bg-dark-800 flex items-center justify-center";
                            parent.innerHTML =
                              "<div class='text-4xl'>📝</div>";
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-dark-100 dark:bg-dark-800 flex items-center justify-center">
                        <div className="text-4xl">📝</div>
                      </div>
                    )}
                  </div>

                  {/* Post Content */}
                  <div className="p-8 flex flex-col flex-1">
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center text-xs font-black uppercase tracking-widest text-dark-400 mb-4 gap-4">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-2" />
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-2" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-black text-dark-900 dark:text-white mb-4 group-hover:text-primary-500 transition-colors duration-200 leading-tight">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-dark-600 dark:text-dark-300 mb-8 text-sm leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 text-xs font-black uppercase tracking-widest"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePostClick(post)}
                      className="w-full rounded-none border-dark-900 dark:border-white text-dark-900 dark:text-white hover:bg-dark-900 hover:text-white dark:hover:bg-white dark:hover:text-dark-900 transition-colors font-black uppercase tracking-widest py-4"
                    >
                      Read Article
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Search className="w-16 h-16 text-dark-300 dark:text-dark-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-dark-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-dark-600 dark:text-dark-300">
                Try adjusting your search terms or filter criteria.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 md:py-40 bg-dark-50 dark:bg-dark-900 border-t border-dark-100 dark:border-dark-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 text-dark-900 dark:text-white">
              Stay Updated
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-400 font-light mb-12">
              Subscribe to my newsletter and never miss a new article or tutorial. No spam, just high-quality content.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 max-w-2xl">
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-transparent border-b-2 py-4 text-xl font-black focus:outline-none transition-colors border-dark-100 dark:border-dark-800 focus:border-primary-500 uppercase tracking-widest placeholder:text-dark-400"
              />
              <Button
                variant="primary"
                className="rounded-full px-12 py-3 whitespace-nowrap"
                onClick={handleSubscribe}
              >
                Subscribe
              </Button>
            </div>
            {subscribeStatus !== "idle" && (
              <p
                className={`mt-6 text-sm font-black uppercase tracking-widest ${
                  subscribeStatus === "success"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {subscribeMessage}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-dark-900 border border-dark-100 dark:border-dark-800 rounded-none max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-8 border-b border-dark-100 dark:border-dark-800">
                  <h2 className="text-3xl font-black text-dark-900 dark:text-white leading-tight uppercase tracking-tighter pr-8">
                    {selectedPost.title}
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="p-4 hover:bg-dark-50 dark:hover:bg-dark-800 transition-colors absolute top-4 right-4"
                  >
                    <X className="w-6 h-6 text-dark-900 dark:text-white" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                  {/* Post Image */}
                  {selectedPost.image && (
                    <div className="aspect-video bg-dark-100 dark:bg-dark-800">
                      <img
                        src={selectedPost.image}
                        alt={selectedPost.title}
                        className="w-full h-full object-cover grayscale"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display =
                            "none";
                        }}
                      />
                    </div>
                  )}

                  <div className="p-8 md:p-12">
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center text-xs font-black uppercase tracking-widest text-dark-400 mb-8 gap-6 border-b border-dark-100 dark:border-dark-800 pb-8">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(selectedPost.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {selectedPost.readTime}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-12">
                        {selectedPost.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-4 py-2 bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 text-xs font-black uppercase tracking-widest"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>

                  {/* Content */}
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
                      {selectedPost.excerpt}
                    </p>
                    {selectedPost.content &&
                      selectedPost.content !==
                        "Full article content here..." && (
                        <div className="text-dark-600 dark:text-dark-300 leading-relaxed">
                          {selectedPost.content}
                        </div>
                      )}
                  </div>

                  {/* Action Button */}
                  <div className="mt-12 pt-8 border-t border-dark-100 dark:border-dark-800">
                    <Button
                      variant="primary"
                      className="rounded-full px-10 py-5 group uppercase font-black tracking-widest text-sm"
                      onClick={() => setSelectedPost(null)}
                    >
                      Close Article
                      <X className="ml-2 w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;

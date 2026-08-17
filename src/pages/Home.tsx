import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { ArrowRight, Download, ExternalLink } from "lucide-react";
import Button from "../components/Button";
import GitHubSection from "../components/GitHubSection";
import { MinimalistHero } from "../components/ui/minimalist-hero";

const AnimatedCounter = ({ from, to, suffixClassName = "", suffix = "" }: { from: number, to: number, suffixClassName?: string, suffix?: string }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [count, to, isInView]);

  return (
    <span ref={ref} className="flex items-center justify-center sm:justify-start">
      <motion.span>{rounded}</motion.span>
      <span className={suffixClassName}>{suffix}</span>
    </span>
  );
};

const Home: React.FC = () => {

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/cv/Resume.pdf";
    link.download = "Bright_Akoto_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      {/* Hero Section */}
      <MinimalistHero
        titleH1="Bright Akoto | Frontend Developer & Software Engineer"
        mainText={<>I'm <span className="font-bold text-dark-900 dark:text-white">Bright Akoto</span>, a developer focused on blending modern performance with a warm, intuitive user experience. Delivering digital products that feel as good as they work.</>}
        readMoreLink="/about"
        imageSrc="/img/11.webp"
        imageWidth={1024}
        imageHeight={1536}
        imageAlt="Bright Akoto - Profile"
        overlayText={{
          part1: 'less is',
          part2: 'more.',
        }}
        locationText="Accra, Ghana"
      />

      {/* Quick Stats Section */}
      <section className="py-20 border-y-2 border-dark-200 dark:border-dark-700">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
            {[
              { number: 30, suffix: "+", label: "Projects Completed" },
              { number: 3, suffix: "+", label: "Years Experience" },
              { number: 20, suffix: "+", label: "Happy Clients" },
              { number: 100, suffix: "%", label: "Success Rate" },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl md:text-6xl font-black text-dark-900 dark:text-white mb-2 tracking-tighter">
                  <AnimatedCounter from={0} to={stat.number} suffix={stat.suffix} suffixClassName="text-primary-500" />
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-dark-400 dark:text-dark-500 font-bold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Skills Preview */}
      <section className="section-padding overflow-hidden border-b-2 border-dark-200 dark:border-dark-700">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-3xl">
              <h2 className="text-xs uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 font-bold mb-4">The Craft</h2>
              <h3 className="text-4xl md:text-6xl font-black text-dark-900 dark:text-white leading-none tracking-tighter">
                Designing for <br />
                <span className="text-dark-400 dark:text-dark-600">people, not just machines.</span>
              </h3>
            </div>
            <p className="text-dark-600 dark:text-dark-400 max-w-sm text-lg font-light leading-relaxed">
              Technical rigor blended with deep empathy to create software that feels natural.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
            {[
              {
                title: "Frontend Development",
                description: "Crafting beautiful, responsive, and intuitive interfaces using modern React ecosystems.",
                step: "01"
              },
              {
                title: "Web Development",
                description: "Building fast, scalable, and secure full-stack applications with a focus on performance.",
                step: "02"
              },
              {
                title: "SEO Optimization",
                description: "Optimizing digital products for search engines to ensure maximum visibility and organic growth.",
                step: "03"
              },
              {
                title: "System Architecture",
                description: "Planning and implementing robust foundations for long-term scalability and efficiency.",
                step: "04"
              },
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group border-t border-dark-100 dark:border-dark-800 pt-8"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-sm font-bold text-primary-500">{skill.step}</span>
                  <h4 className="text-3xl font-black text-dark-900 dark:text-white group-hover:text-primary-500 transition-colors duration-300">{skill.title}</h4>
                </div>
                <p className="text-dark-500 dark:text-dark-400 text-lg leading-relaxed font-light">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How I Build */}
      <section className="section-padding border-b-2 border-dark-200 dark:border-dark-700">
        <div className="container-custom">
          <div className="max-w-3xl mb-20">
            <h2 className="text-xs uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 font-bold mb-4">
              The Process
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-dark-900 dark:text-white leading-none tracking-tighter mb-8">
              How I <span className="text-dark-400 dark:text-dark-600">build.</span>
            </h3>
            <p className="text-dark-600 dark:text-dark-400 text-lg font-light leading-relaxed max-w-xl">
              A calm, deliberate process — understand the problem before
              touching the code, and keep iterating after it ships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-10 gap-y-20">
            {[
              {
                title: "Understand",
                description: "Understand the problem and users.",
              },
              {
                title: "Design",
                description: "Create the interface and technical architecture.",
              },
              {
                title: "Build",
                description: "Develop the application with a modern stack.",
              },
              {
                title: "Test",
                description: "Test functionality, responsiveness and edge cases.",
              },
              {
                title: "Deploy",
                description: "Ship to production and iterate.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group relative border-t-2 border-dark-200 dark:border-dark-700 pt-14"
              >
                <span className="absolute -top-6 left-0 text-5xl md:text-6xl font-black leading-none text-dark-100 dark:text-dark-800 group-hover:text-primary-500 transition-colors duration-300 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="text-2xl md:text-3xl font-black text-dark-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors duration-300">
                  {step.title}
                </h4>
                <p className="text-dark-500 dark:text-dark-400 text-lg font-light leading-relaxed">
                  {step.description}
                </p>
                {index < 4 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="hidden lg:block absolute -right-7 top-[-12px] text-dark-300 dark:text-dark-600 group-hover:text-primary-500 transition-colors duration-300"
                  >
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                      className="block"
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.span>
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-dark-50 dark:bg-dark-950/80 border-b-2 border-dark-200 dark:border-dark-700">
        <div className="container-custom">
          <div className="max-w-2xl mb-20">
            <h2 className="text-xs uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 font-bold mb-4">Works</h2>
            <h3 className="text-4xl md:text-6xl font-black text-dark-900 dark:text-white tracking-tighter">Selected Projects.</h3>
          </div>

          <div className="grid grid-cols-1 gap-32">
            {[
              {
                title: "TradeLens",
                description: "Real-time trading analytics platform.",
                image: "/img/TradeLens.webp",
                tags: ["Analytics", "Fintech"],
                technologies: ["React", "TypeScript", "PostgreSQL", "Tailwind CSS"],
                year: "2025",
                liveUrl: "https://trade-lens-finance.vercel.app/",
                githubUrl: "https://github.com/Bryt19/TradeLens",
                link: "/projects"
              },
              {
                title: "LeapBod",
                description: "Real-time event & opportunity platform.",
                image: "/img/LeapBod.webp",
                tags: ["Networking", "SaaS"],
                technologies: ["React", "Node.js", "PostgreSQL", "TypeScript"],
                year: "2025",
                liveUrl: "https://leapbod.vercel.app/",
                githubUrl: "https://github.com/Bryt19/Leapbod",
                link: "/projects"
              },
              {
                title: "Lumina Support",
                description: "Customer support platform with ticketing, live chat, and a knowledge base.",
                image: "/img/lumina.webp",
                tags: ["Support", "SaaS"],
                technologies: ["Angular", "TypeScript", "Node.js", "SQLite", "AI Agent"],
                year: "2026",
                liveUrl: "https://lumina-help.vercel.app/",
                githubUrl: "https://github.com/Bryt19/Lumina",
                link: "/projects"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                onClick={() => window.location.href = project.link}
              >
                <div className="relative aspect-video rounded-[1.5rem] overflow-hidden bg-dark-100 dark:bg-dark-900 mx-auto w-full max-w-[500px]">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 group-hover:-rotate-1 transition-all duration-700 opacity-90 group-hover:opacity-100" loading="lazy" />
                </div>
                <div className="md:px-4">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-[0.2em] font-black text-primary-500">{tag}</span>
                    ))}
                    {project.year && (
                      <span className="text-[10px] uppercase tracking-[0.2em] font-black text-dark-400 dark:text-dark-600">{project.year}</span>
                    )}
                  </div>
                  <h4 className="text-4xl md:text-5xl font-black mb-4 text-dark-900 dark:text-white group-hover:translate-x-4 transition-transform duration-500">{project.title}</h4>
                  <p className="text-dark-500 dark:text-dark-400 text-lg font-light mb-6 max-w-md">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-3.5 py-1.5 bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-[10px] font-black uppercase tracking-[0.2em] text-dark-600 dark:text-dark-300 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-6">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary-500 hover:text-primary-600 transition-colors"
                      >
                        Live Preview <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-dark-900 dark:text-white hover:text-primary-500 transition-colors"
                      >
                        View Code <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <ArrowRight className="w-6 h-6 text-dark-900 dark:text-white group-hover:translate-x-4 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <Button variant="outline" href="/projects" className="border-dark-900 dark:border-white text-dark-900 dark:text-white hover:bg-dark-900 dark:hover:bg-white hover:text-white dark:hover:text-dark-900">
              View All Works
            </Button>
          </div>
        </div>
      </section>

      {/* GitHub */}
      <GitHubSection />

      {/* Call to Action */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-green-500/30 bg-green-500/10 mb-10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-green-600 dark:text-green-400">
                Available for new projects
              </span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight tracking-tighter text-dark-900 dark:text-white">
              Let's create <br className="md:hidden" />
              <span className="text-primary-500 hover:text-dark-900 dark:hover:text-white transition-colors duration-500 inline-block hover:scale-105">together.</span>
            </h2>
            <p className="max-w-lg mx-auto text-lg md:text-xl text-dark-500 dark:text-dark-400 font-light leading-relaxed mb-14 px-4">
              Got a project in mind? I'd love to build something great with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center px-4">
              <Button variant="primary" size="lg" href="/contact" className="px-14 py-5 text-lg rounded-full shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 hover:-translate-y-1 transition-all">
                Work With Me
              </Button>
              <Button variant="secondary" size="lg" onClick={handleDownloadResume} className="px-10 py-5 text-lg rounded-full bg-transparent border-2 border-dark-900 dark:border-white hover:bg-dark-900 dark:hover:bg-white hover:text-white dark:hover:text-dark-900 transition-colors flex items-center justify-center">
                <Download className="mr-2 w-5 h-5" />
                Download Resume
              </Button>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

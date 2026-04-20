import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Button from "../components/Button";
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
        mainText="I'm Bright Akoto, a developer focused on blending modern performance with a warm, intuitive user experience. Delivering digital products that feel as good as they work."
        readMoreLink="/about"
        imageSrc="/img/profile2.png"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
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

      {/* Featured Projects */}
      <section className="section-padding bg-dark-50 dark:bg-dark-950/80 border-b-2 border-dark-200 dark:border-dark-700">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-xs uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 font-bold mb-4">Works</h2>
              <h3 className="text-4xl md:text-6xl font-black text-dark-900 dark:text-white tracking-tighter">Selected Projects.</h3>
            </div>
            <Button variant="outline" href="/projects" className="border-dark-900 dark:border-white text-dark-900 dark:text-white hover:bg-dark-900 dark:hover:bg-white hover:text-white dark:hover:text-dark-900 self-start md:self-center">
              View All Works
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-32">
            {[
              {
                title: "TradeLens",
                description: "Real-time trading analytics platform.",
                image: "/img/TradeLens.png",
                tags: ["Analytics", "Fintech"],
                link: "/projects"
              },
              {
                title: "LeapBod",
                description: "Real-time event & opportunity platform.",
                image: "/img/LeapBod.png",
                tags: ["Networking", "SaaS"],
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
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 group-hover:-rotate-1 transition-all duration-700 opacity-90 group-hover:opacity-100" />
                </div>
                <div className="md:px-4">
                  <div className="flex gap-4 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-[0.2em] font-black text-primary-500">{tag}</span>
                    ))}
                  </div>
                  <h4 className="text-4xl md:text-5xl font-black mb-4 text-dark-900 dark:text-white group-hover:translate-x-4 transition-transform duration-500">{project.title}</h4>
                  <p className="text-dark-500 dark:text-dark-400 text-lg font-light mb-6 max-w-md">
                    {project.description}
                  </p>
                  <ArrowRight className="w-6 h-6 text-dark-900 dark:text-white group-hover:translate-x-4 transition-transform duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-7xl font-black mb-10 leading-tight tracking-tighter text-dark-900 dark:text-white">
              Let's create <br />
              <span className="text-primary-500 hover:text-dark-900 dark:hover:text-white transition-colors duration-500 inline-block hover:scale-105">together.</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12 px-4">
              <Button variant="primary" size="lg" href="/contact" className="px-10 py-5 text-lg rounded-full shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 hover:-translate-y-1 transition-all">
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

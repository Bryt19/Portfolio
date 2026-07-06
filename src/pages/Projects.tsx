import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Search,
  X,
  Users,
} from "lucide-react";
import Button from "../components/Button";
import { Project } from "../types";

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "1",
      title: "TradeLens",
      description:
        "A comprehensive trading platform with real-time market data and portfolio management.",
      longDescription:
        "Built a full-featured trading application with real-time market data, portfolio tracking, and trading simulation. Features responsive design and intuitive user interface.",
      image: "/img/TradeLens.png",
      technologies: [
        "React",
        "Typescript",
        "PostgreSQL",
        "Tailwind CSS",
        "HTML5",
      ],
      githubUrl: "https://github.com/Bryt19/TradeLens",
      liveUrl: "https://trade-lens-finance.vercel.app/",
      featured: true,
    },
    {
      id: "2",
      title: "LeapBod",
      description:
        "Innovative platform for learning and skill development with interactive content.",
      longDescription:
        "Developed a learning platform with interactive modules, progress tracking, and user engagement features. Built with modern web technologies for optimal performance.",
      image: "/img/LeapBod.png",
      technologies: ["React", "Node.js", "PostgreSQL", "Typescript", "HTML5"],
      githubUrl: "https://github.com/Bryt19/Leapbod",
      liveUrl: "https://leapbod.vercel.app/",
      featured: true,
    },
    {
      id: "3",
      title: "MoneyGrid",
      description:
        "A modern, full-featured personal finance web app for tracking income, expenses, budgets, and savings goals.",
      longDescription:
        "A modern, full-featured personal finance web app for tracking income, expenses, budgets, and savings goals. Built with React, TypeScript, and Supabase.",
      image: "/img/MoneyGrid.png",
      technologies: ["React", "Node.js", "PostgreSQL", "TypeScript", "Tailwind CSS", "Supabase", "HTML5"],
      githubUrl: "https://github.com/Bryt19/MoneyGrid",
      liveUrl: "https://moneygrid.vercel.app",
      featured: false,
      year: "2026",
    },
    {
      id: "4",
      title: "Resume Builder",
      description:
        "Professional resume builder with customizable templates and PDF export.",
      longDescription:
        "Built a user-friendly resume builder with multiple templates, real-time preview, and PDF export functionality. Helps users create professional resumes quickly.",
      image: "/img/resume.png",
      technologies: ["Node.js", "MongoDB", "Local Storage", "CSS3", "HTML5"],
      githubUrl: "https://github.com/Bryt19/ProFileBuilder",
      liveUrl: "https://pro-file-builder.vercel.app/",
      featured: false,
    },
    {
      id: "5",
      title: "Zoom Rides",
      description:
        "Car rental website with booking system, vehicle selection, and reservation management.",
      longDescription:
        "Developed a comprehensive car rental platform with vehicle browsing, booking functionality, reservation management, and payment processing. Features responsive design and intuitive user experience.",
      image: "/img/Zoom.png",
      technologies: [
        "Bootstrap",
        "Local Storage",
        "JavaScript",
        "CSS3",
        "HTML5",
      ],
      githubUrl: "https://github.com/Bryt19/Zoom-Rides",
      liveUrl: "https://bryt19.github.io/Zoom-Rides/",
      featured: false,
    },
    {
      id: "6",
      title: "Weather App",
      description:
        "Real-time weather application with location-based forecasts and clean design.",
      longDescription:
        "Created a weather application with current conditions, forecasts, and location search. Features responsive design and intuitive user interface.",
      image: "/img/weather.png",
      technologies: ["HTML5", "JavaScript", "CSS3", "Tailwind CSS"],
      githubUrl: "https://github.com/Bryt19/Weather",
      liveUrl: "https://bryt19.github.io/Weather/",
      featured: false,
    },
    {
      id: "7",
      title: "Verdis",
      description:
        "Climate-smart farming platform empowering Ghana's smallholder farmers with data-driven agricultural insights.",
      longDescription:
        "Verdis is a climate-smart farming platform built to empower Ghana's smallholder farmers with real-time weather data, crop advisory tools, and market price insights. The platform bridges the gap between modern agri-tech and rural farming communities, providing actionable intelligence to improve yield, reduce climate risk, and increase income resilience.",
      image: "/img/verdis.png",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Prisma", "Shadcn UI", "Framer Motion", "Supabase", "Railway", "Local Storage"],
      githubUrl: "https://github.com/Bryt19/Verdis",
      liveUrl: "https://verdis-farm.vercel.app/",
      featured: false,
      collaborators: ["Team Project"],
      year: "2026",
    },
    {
      id: "8",
      title: "Revanta",
      description:
        "Modern guest feedback platform landing page designed specifically for hotels and resorts.",
      longDescription:
        "Revanta is a modern, responsive landing page for a guest feedback platform designed specifically for hotels and resorts. It enables hospitality businesses to collect, manage, and act on guest reviews in real time — helping elevate service quality and strengthen online reputation through elegant, intuitive design.",
      image: "/img/revanta.png",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn UI"],
      githubUrl: "https://github.com/Bryt19/Revanta",
      liveUrl: "https://revanta-sigma.vercel.app/",
      featured: false,
      collaborators: ["Team Project"],
      year: "2026",
    },
    {
      id: "9",
      title: "Mawuli Woodworks",
      description:
        "Premium custom woodwork and artisanal furniture craftsmanship showcase.",
      longDescription:
        "A bespoke furniture and woodwork website showcasing artisanal craftsmanship, custom designs, and premium wood products. Designed for elegance and professional presentation of high-end carpentry.",
      image: "/img/work.png",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "TypeScript","PostgreSQL"],
      githubUrl: "https://github.com/Bryt19/mawuli-woodworks",
      liveUrl: "https://mawuliwoodworks.shop/",
      featured: false,
    },
    {
      id: "10",
      title: "Typing Learning Website",
      description:
        "Interactive typing tutor with lessons, practice modes, and progress tracking (Still Developing).",
      longDescription:
        "Currently developing a comprehensive typing learning platform with interactive lessons, typing tests, progress tracking, and gamification elements to make learning fun.",
      image: "/img/typing.png",
      technologies: ["React", "Node.js", "PostgreSQL", "JavaScript", "HTML5"],
      githubUrl: "https://github.com/Bryt19",
      liveUrl: "https://example.com",
      featured: false,
    },
    {
      id: "11",
      title: "Tiki Save",
      description:
        "TikTok video downloader that saves videos without watermarks for personal use.",
      longDescription:
        "Built a TikTok video downloader application that allows users to download TikTok videos without watermarks. Features clean interface, fast download speeds, API integration, and supports various video qualities.",
      image: "/img/save.png",
      technologies: ["HTML5", "CSS3", "JavaScript", "API Integration"],
      githubUrl: "https://github.com/Bryt19/TikiSave",
      liveUrl: "https://tiki-save.vercel.app/",
      featured: false,
    },
    {
      id: "12",
      title: "Klavora",
      description:
        "Pharmacy inventory management dashboard with real-time stock tracking and analytics.",
      longDescription:
        "Collaboratively built a full-featured pharmacy management dashboard with inventory tracking, sales analytics, restocking management, and category organization. Features a modern dark-themed UI with Tailwind CSS and real-time data visualization.",
      image: "/img/klavora.png",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js", "PostgreSQL","Supabase", "Node.js", "Prisma","Vercel","Railway", "Local Storage","HTML5"],
      githubUrl: "https://github.com/richkid2xi/Klavora/tree/develop",
      liveUrl: "https://klavora.vercel.app/",
      featured: false,
      collaborators: ["Team Project"],
      year: "2026",
    },
    {
      id: "13",
      title: "Platera",
      description:
        "Smart restaurant management system streamlining orders, inventory, staff, and customer experience.",
      longDescription:
        "Platera is a smart restaurant management system co-developed to help restaurants streamline their operations end-to-end. It features real-time order management, table reservations, inventory tracking, staff scheduling, and customer feedback integration — all wrapped in a sleek, intuitive dashboard built for the modern hospitality industry.",
      image: "/img/Platera.png",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL","Supabase", "Railway", "Local Storage", "HTML5", "Vercel"],
      githubUrl: "https://github.com/Bryt19/Platera",
      liveUrl: "https://platera.vercel.app/",
      featured: false,
      collaborators: ["Team Project"],
      year: "2026",
    },
    {
      id: "14",
      title: "TLGM SMS",
      description:
        "Bulk SMS messaging platform with contact management, campaign scheduling, and delivery analytics.",
      longDescription:
        "Collaboratively built a robust SMS communication platform featuring bulk message sending, contact list management, campaign scheduling, delivery tracking, and real-time analytics. Designed for businesses to streamline their SMS marketing and notification workflows.",
      image: "/img/TGLM.png",
      technologies: ["React", "Node.js", "PostgreSQL", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/Bryt19/TLGM-SMS",
      liveUrl: "https://tlgm-sms.vercel.app/",
      featured: false,
      collaborators: ["Team Project"],
      year: "2026",
    },
  ];

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "fullstack", name: "Full Stack" },
  ];

  const filteredAndSortedProjects = projects
    .filter((project) => {
      // Filter by category
      if (filter !== "all") {
        if (filter === "frontend") {
          const hasFrontend = project.technologies.some((tech) =>
            [
              "React",
              "Vue.js",
              "TypeScript",
              "Tailwind CSS",
              "Framer Motion",
              "HTML5",
              "CSS3",
              "JavaScript",
            ].includes(tech)
          );
          if (!hasFrontend) return false;
        }
        if (filter === "backend") {
          const hasBackend = project.technologies.some((tech) =>
            ["Node.js", "PostgreSQL", "MongoDB", "Redis", "Docker"].includes(
              tech
            )
          );
          if (!hasBackend) return false;
        }
        if (filter === "fullstack") {
          const hasFrontend = project.technologies.some((tech) =>
            ["React", "Vue.js", "TypeScript"].includes(tech)
          );
          const hasBackend = project.technologies.some((tech) =>
            ["Node.js", "PostgreSQL", "MongoDB"].includes(tech)
          );
          if (!(hasFrontend && hasBackend)) return false;
        }
      }

      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(searchLower)
          )
        );
      }

      return true;
    })
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.title.localeCompare(b.title);
    });


  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      {/* Hero Section */}
      <section className="pt-40 pb-20 border-b border-dark-100 dark:border-dark-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl"
          >
            <h1 className="text-7xl md:text-9xl font-black text-dark-900 dark:text-white leading-none tracking-tighter mb-12">
              Selected <br />
              <span className="text-primary-500">Works.</span>
            </h1>
            <p className="text-xl md:text-3xl text-dark-600 dark:text-dark-400 font-light leading-snug max-w-3xl">
              A collection of digital products focused on performance, aesthetics, and user experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Simplified Controls */}
      <section className="py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`text-sm uppercase tracking-widest font-black transition-colors ${
                    filter === category.id ? "text-primary-500 underline underline-offset-8" : "text-dark-400 hover:text-dark-900 dark:hover:text-white"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
              <input
                type="text"
                placeholder="SEARCH PROJECTS"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-b border-dark-100 dark:border-dark-800 pl-6 py-2 text-base md:text-sm uppercase tracking-widest font-black focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
            {filteredAndSortedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-[15/10] rounded-[1rem] overflow-hidden bg-dark-50 dark:bg-dark-900 border border-dark-100 dark:border-dark-800 mb-8">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-6 left-6 flex gap-2">
                    {project.featured && (
                      <span className="px-4 py-1 bg-primary-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                        Featured
                      </span>
                    )}
                    {project.collaborators && project.collaborators.length > 0 && (
                      <span className="px-4 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5">
                        <Users className="w-3 h-3" />
                        Collab
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    {project.technologies.slice(0, 2).map(tech => (
                      <span key={tech} className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500">{tech}</span>
                    ))}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-dark-900 dark:text-white group-hover:translate-x-4 transition-transform duration-500 tracking-tighter">
                    {project.title}
                  </h3>
                  <p className="text-lg text-dark-500 dark:text-dark-400 font-light max-w-md leading-relaxed">
                    {project.description}
                  </p>
                  <div className="pt-4 flex items-center gap-4 text-sm font-black uppercase tracking-widest text-dark-900 dark:text-white group-hover:text-primary-500 transition-colors">
                    Explore Project <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredAndSortedProjects.length === 0 && (
            <div className="py-40 text-center">
              <h4 className="text-2xl font-black text-dark-300 dark:text-dark-700 uppercase tracking-widest">No results found</h4>
            </div>
          )}
        </div>
      </section>

      {/* Modal / Project Detail - Minimalist style */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 bg-white/95 dark:bg-dark-950/95 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="w-full max-w-6xl max-h-full overflow-y-auto bg-white dark:bg-dark-900 rounded-[1rem] shadow-2xl border border-dark-100 dark:border-dark-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-8 right-8 p-4 bg-black/50 hover:bg-black text-white rounded-full transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              
              <div className="p-12 md:p-20">
                <div className="flex flex-col lg:flex-row gap-16">
                  <div className="flex-1">
                    <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">{selectedProject.title}</h2>
                    <p className="text-xl md:text-2xl text-dark-600 dark:text-dark-400 font-light leading-relaxed mb-12">
                      {selectedProject.longDescription || selectedProject.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 mb-12">
                      {selectedProject.technologies.map(tech => (
                        <span key={tech} className="px-6 py-2 bg-dark-50 dark:bg-dark-800 text-sm font-black uppercase tracking-widest rounded-full">{tech}</span>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-6">
                      {selectedProject.liveUrl && (
                        <Button href={selectedProject.liveUrl} target="_blank" className="rounded-full px-10 py-4 text-lg">
                          Live Preview
                        </Button>
                      )}
                      {selectedProject.githubUrl && (
                        <Button variant="secondary" href={selectedProject.githubUrl} target="_blank" className="rounded-full px-10 py-4 text-lg">
                          View Code
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="lg:w-1/3 border-l border-dark-100 dark:border-dark-800 pl-12 hidden lg:block">
                    <h4 className="text-sm font-black uppercase tracking-widest text-primary-500 mb-6">Client / Category</h4>
                    <p className="text-2xl font-bold mb-12">Universal Case Study</p>
                    
                    {selectedProject.collaborators && selectedProject.collaborators.length > 0 && (
                      <>
                        <h4 className="text-sm font-black uppercase tracking-widest text-primary-500 mb-6">Collaborators</h4>
                        <div className="flex flex-wrap gap-2 mb-12">
                          {selectedProject.collaborators.map((collab) => (
                            <span key={collab} className="px-4 py-2 bg-emerald-500/10 text-emerald-500 text-sm font-black uppercase tracking-widest rounded-full flex items-center gap-2">
                              <Users className="w-3.5 h-3.5" />
                              {collab}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                    
                    <h4 className="text-sm font-black uppercase tracking-widest text-primary-500 mb-6">Year</h4>
                    <p className="text-2xl font-bold">{selectedProject.year || "2025"}</p>
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

export default Projects;

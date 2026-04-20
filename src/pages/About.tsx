import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Button from "../components/Button";

/* ─── Animation Variants ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Animated Section Wrapper ───────────────────────────────────── */
const AnimatedSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Data ────────────────────────────────────────────────────────── */
const skills = [
  { name: "TypeScript", level: 90, category: "frontend" },
  { name: "React / Next.js", level: 95, category: "frontend" },
  { name: "Tailwind CSS", level: 95, category: "frontend" },
  { name: "SEO Optimization", level: 85, category: "tools" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "HTML5 / CSS3", level: 95, category: "frontend" },
  { name: "Node.js", level: 75, category: "backend" },
  { name: "Git / Shell", level: 85, category: "tools" },
];

const experiences = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "Git Plus",
    location: "Accra, Ghana",
    startDate: "Feb 2025",
    endDate: "Apr 2025",
    current: false,
    description: [
      "Developed responsive web applications using React and modern JavaScript",
      "Collaborated with the development team to implement user interfaces",
      "Worked with HTML5, CSS3, and JavaScript to create interactive web experiences",
      "Gained hands-on experience with frontend development best practices",
    ],
    technologies: ["React", "HTML5", "CSS3", "JavaScript", "Git"],
  },
  {
    id: "2",
    title: "Frontend Developer Intern",
    company: "Code Alpha",
    location: "Remote",
    startDate: "Mar 2025",
    endDate: "May 2025",
    current: false,
    description: [
      "Built modern web applications using React and Vite for fast development",
      "Implemented responsive designs with Tailwind CSS framework",
      "Worked in a remote environment with distributed development teams",
      "Contributed to various frontend projects and learned agile development practices",
    ],
    technologies: ["React", "Vite", "Tailwind CSS", "JavaScript", "Git"],
  },
];

const education = [
  {
    id: "1",
    degree: "BSc. Software Engineering",
    institution: "Ghana Communication Technology University",
    location: "Tesano, Accra — Ghana",
    startDate: "Sep 2024",
    endDate: null,
    current: true,
    gpa: "In Progress",
    description:
      "Pursuing a Bachelor of Science in Software Engineering with a focus on software development and modern web technologies. Core modules include Data Structures & Algorithms, Object-Oriented Programming, Database Systems, and Software Architecture.",
    highlights: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Systems",
      "Software Architecture",
      "Web Technologies",
      "Operating Systems",
    ],
    badge: "Current",
  },
  {
    id: "2",
    degree: "West Africa Senior School Certificate",
    institution: "Okuapemman School",
    location: "Akropong, Ghana",
    startDate: "Sep 2019",
    endDate: "Oct 2022",
    current: false,
    gpa: "B3 Aggregate",
    description:
      "Completed secondary education with strong grades in Core Mathematics, Elective Mathematics, Physics, and ICT — building the analytical foundations that now power my engineering mindset.",
    highlights: [
      "Core Mathematics",
      "Elective Mathematics",
      "Physics",
      "ICT",
      "English Language",
    ],
    badge: "Completed",
  },
];

/* ─── Main Component ─────────────────────────────────────────────── */
const About: React.FC = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="pt-40 pb-20 border-b border-dark-100 dark:border-dark-800">
        <div className="container-custom">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={stagger}
            className="max-w-5xl"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 font-black mb-6"
            >
              Get to know me
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-7xl md:text-9xl font-black text-dark-900 dark:text-white leading-none tracking-tighter mb-12"
            >
              Everything <br />
              About <span className="text-primary-500">Me.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-xl md:text-2xl text-dark-600 dark:text-dark-400 font-light leading-snug max-w-3xl"
            >
              I'm Bright Akoto, a software engineer-in-training from Accra,
              Ghana. I build products that live at the intersection of powerful
              code and human logic.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Bio ── */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeLeft}
              className="space-y-12"
            >
              <div>
                <h2 className="text-xs uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 font-black mb-6">
                  The Journey
                </h2>
                <div className="space-y-8 text-xl md:text-2xl text-dark-800 dark:text-dark-200 leading-relaxed font-light">
                  <p>
                    I started my journey in web development over 3 years ago,
                    driven by a fascination with how technology can solve
                    real-world problems.
                  </p>
                  <p>
                    What began as curiosity has evolved into a career mission:
                    creating software that feels as natural and intuitive as the
                    people who use it.
                  </p>
                  <p>
                    Currently, I'm specialising in modern React ecosystems and
                    scalable system architecture, always pushing the boundaries
                    of what's possible on the web.
                  </p>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="primary"
                  size="lg"
                  href="/contact"
                  className="rounded-full px-10 py-3 text-xl"
                >
                  Let's Collaborate
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={scaleIn}
              className="relative aspect-square rounded-[1rem] overflow-hidden bg-dark-50 dark:bg-dark-900 border border-dark-100 dark:border-dark-800"
            >
              <img
                src="/img/work .jpeg"
                alt="Bright Akoto"
                className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
              />
              {/* Decorative accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Skills & Experience ── */}
      <section className="section-padding bg-dark-50 dark:bg-dark-950/80">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">

            {/* Skills */}
            <AnimatedSection>
              <h2 className="text-5xl font-black mb-16 tracking-tighter">
                Skills &amp; Stack.
              </h2>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={stagger}
              >
                {skills.map((skill, index) => (
                  <motion.div key={index} variants={fadeUp} custom={index} className="group">
                    <div className="flex justify-between items-end mb-2">
                      <h4 className="text-xl font-bold">{skill.name}</h4>
                      <span className="text-sm font-black text-primary-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-dark-100 dark:bg-dark-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 1.2,
                          delay: index * 0.08,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                        className="h-full bg-primary-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>

            {/* Experience */}
            <AnimatedSection delay={0.15}>
              <h2 className="text-5xl font-black mb-16 tracking-tighter">
                Experience.
              </h2>
              <div className="space-y-16">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    viewport={{ once: true, margin: "-60px" }}
                    className="relative pl-12 border-l border-dark-200 dark:border-dark-800"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                      viewport={{ once: true }}
                      className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full"
                    />
                    <span className="text-sm uppercase tracking-widest font-black text-dark-400 dark:text-dark-500 mb-2 block">
                      {exp.startDate} — {exp.endDate || "Present"}
                    </span>
                    <h4 className="text-2xl font-black mb-2">{exp.title}</h4>
                    <p className="text-primary-600 dark:text-primary-400 font-bold mb-1">
                      {exp.company}
                    </p>
                    <p className="text-sm text-dark-400 dark:text-dark-500 mb-4">
                      📍 {exp.location}
                    </p>
                    <ul className="space-y-3 text-dark-500 dark:text-dark-400 font-light">
                      {exp.description.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="text-lg leading-snug">
                          • {item}
                        </li>
                      ))}
                    </ul>
                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-semibold px-3 py-1 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">
              Education.
            </h2>
            <p className="text-lg text-dark-500 dark:text-dark-400 font-light mb-16 max-w-xl">
              The institutions and programmes that shaped my thinking.
            </p>
          </AnimatedSection>

          <div className="space-y-8 max-w-5xl">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -4 }}
                className="group relative border border-dark-100 dark:border-dark-800 rounded-2xl p-8 md:p-10 bg-white dark:bg-dark-900/60 hover:border-primary-500/40 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-500 overflow-hidden"
              >
                {/* Background accent on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-2xl" />

                {/* Top row */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    {/* Animated icon */}
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.15 }}
                      className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-2xl flex-shrink-0"
                    >
                      🎓
                    </motion.div>
                    <div>
                      <h4 className="text-2xl md:text-3xl font-black text-dark-900 dark:text-white leading-tight">
                        {edu.degree}
                      </h4>
                      <p className="text-primary-600 dark:text-primary-400 font-semibold text-lg mt-0.5">
                        {edu.institution}
                      </p>
                    </div>
                  </div>

                  {/* Badge + dates */}
                  <div className="text-left md:text-right flex-shrink-0">
                    <span
                      className={`inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 ${
                        edu.current
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-dark-100 dark:bg-dark-800 text-dark-500 dark:text-dark-400 border border-dark-200 dark:border-dark-700"
                      }`}
                    >
                      {edu.badge}
                    </span>
                    <p className="text-lg font-bold text-primary-500 block">
                      {edu.startDate} — {edu.endDate || "Present"}
                    </p>
                    <p className="text-sm text-dark-400 dark:text-dark-600 mt-1">
                      📍 {edu.location}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm font-semibold text-dark-500 dark:text-dark-400 mt-1">
                        {edu.current ? "Status" : "Grade"}:{" "}
                        <span className="text-primary-500">{edu.gpa}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-dark-100 dark:border-dark-800 mb-6" />

                {/* Description */}
                <p className="text-dark-600 dark:text-dark-400 text-lg font-light leading-relaxed mb-6">
                  {edu.description}
                </p>

                {/* Key modules / subjects */}
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-dark-400 dark:text-dark-600 font-black mb-3">
                    {edu.current ? "Key Modules" : "Key Subjects"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {edu.highlights.map((h, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + i * 0.05, duration: 0.35 }}
                        viewport={{ once: true }}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full bg-dark-50 dark:bg-dark-800 text-dark-700 dark:text-dark-300 border border-dark-100 dark:border-dark-700 hover:border-primary-500/40 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 cursor-default"
                      >
                        {h}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-60px" }}
        className="section-padding border-t border-dark-100 dark:border-dark-800"
      >
        <div className="container-custom text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-dark-900 dark:text-white"
          >
            Let's build something{" "}
            <span className="text-primary-500">great.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-xl text-dark-500 dark:text-dark-400 font-light mb-10 max-w-xl mx-auto"
          >
            Have a project or idea? I'd love to hear about it — let's make it
            real.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <Button
              variant="primary"
              size="lg"
              href="/contact"
              className="rounded-full px-12 py-4 text-xl"
            >
              Get in touch →
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;

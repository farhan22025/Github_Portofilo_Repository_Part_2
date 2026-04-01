import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, MapPin, Phone, ExternalLink, Code, Database, Briefcase, Sparkles, GraduationCap, FlaskConical, Users, ChevronDown } from "lucide-react";
import { useTypingEffect } from "@/hooks/use-typing-effect";
import { SectionHeader } from "@/components/SectionHeader";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const defaultIcon = L.icon({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const skillsData = [
  {
    category: "Programming Languages",
    icon: <Code className="w-5 h-5" />,
    color: "from-slate-700 to-slate-900",
    skills: ["Python", "Java", "C", "R", "PHP"],
  },
  {
    category: "Databases & Data Tools",
    icon: <Database className="w-5 h-5" />,
    color: "from-teal-600 to-cyan-700",
    skills: ["Advanced Excel", "MySQL", "Google Sheets"],
  },
  {
    category: "Software & Platforms",
    icon: <Briefcase className="w-5 h-5" />,
    color: "from-blue-800 to-indigo-900",
    skills: ["Microsoft Office", "Google Workspace", "Linux", "macOS"],
  },
  {
    category: "Design & QA",
    icon: <Sparkles className="w-5 h-5" />,
    color: "from-purple-500 to-violet-600",
    skills: ["Canva", "SQA Testing", "Adobe Photoshop", "Adobe Illustrator"],
  }
];

const projects = [
  {
    title: "Deepfake Image Detection",
    year: "2025 – 2026",
    type: "Research / Thesis",
    desc: "Developing a lightweight offline machine learning model for detecting manipulated images in low-resource environments. Applies image processing and classification techniques for efficient detection.",
    tags: ["ML", "Python", "Image Processing", "AI Security"],
    accent: "from-slate-700 to-blue-900",
    github: "https://github.com/farhan22025/farhan22025.github.io/tree/main/Portfolio-Projects/Projects/Academic/Final-Year-Project/Deepfake-Detection",
  },
  {
    title: "Smart Waste Management System",
    year: "2025 – 2026",
    type: "Capstone",
    desc: "Designed relational database schema and data flow diagrams. Prepared software requirements documents to support scalable system architecture.",
    tags: ["System Design", "SRS", "UML", "ERD", "Database"],
    accent: "from-teal-600 to-cyan-700",
    github: "https://github.com/farhan22025/farhan22025.github.io/tree/main/Portfolio-Projects/Projects/Academic/Course-Projects/Smart-Waste-Management-System",
  },
  {
    title: "Coffee Shop Management System",
    year: "2024",
    type: "Academic",
    desc: "Developed a point-of-sale workflow for capturing orders, daily sales, inventory movement, and revenue records using Java OOP principles.",
    tags: ["Java", "OOP", "POS System"],
    accent: "from-purple-500 to-violet-600",
    github: "https://github.com/farhan22025/farhan22025.github.io/tree/main/Portfolio-Projects/Projects/Academic/Course-Projects/Coffee-Shop-Management-System",
  },
  {
    title: "Banking Management System",
    year: "2023",
    type: "Academic",
    desc: "Built a file-based data persistence system for storing and retrieving client financial records with input validation.",
    tags: ["C Programming", "File Handling", "Data Persistence"],
    accent: "from-blue-800 to-indigo-900",
    github: "https://github.com/farhan22025/farhan22025.github.io/tree/main/Portfolio-Projects/Projects/Academic/Course-Projects/Banking-Management-System",
  }
];

export default function Home() {
  const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");
  const titles = [
    "Aspiring Data Engineer",
    "Software Engineering Student",
    "ML Enthusiast",
    "Data Science Researcher"
  ];
  const typedTitle = useTypingEffect(titles, 80, 40, 2000);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const [isMapMounted, setIsMapMounted] = useState(false);
  useEffect(() => { setIsMapMounted(true); }, []);

  return (
    <div className="mesh-bg min-h-screen relative overflow-hidden">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* ═══════════ HERO ═══════════ */}
      <section id="home" className="min-h-screen flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="order-2 lg:order-1"
            >
              <motion.div variants={fadeUp} custom={0} className="mb-3">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Available for opportunities
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={0.1}
                className="text-6xl sm:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[0.9] mb-2"
              >
                <span className="text-foreground">Farhan</span>
                <br />
                <span className="text-gradient-primary">Alam</span>
              </motion.h1>

              <motion.div variants={fadeUp} custom={0.2} className="h-8 sm:h-10 mt-4 mb-6">
                <p className="text-xl sm:text-2xl font-display font-medium text-muted-foreground">
                  {typedTitle}<span className="animate-pulse text-primary">|</span>
                </p>
              </motion.div>

              <motion.p variants={fadeUp} custom={0.3} className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
                Turning data into insights, and code into solutions. Software Engineering student at DIU, researching deepfake detection.
              </motion.p>

              <motion.div variants={fadeUp} custom={0.4} className="flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo('projects')}
                  className="group px-7 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 text-sm"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="px-7 py-3 bg-muted/50 border border-border text-foreground font-semibold rounded-full hover:bg-muted hover:border-primary/30 transition-all duration-300 text-sm"
                >
                  Contact Me
                </button>
              </motion.div>

              <motion.div variants={fadeUp} custom={0.5} className="flex gap-3 mt-10">
                <a href="https://github.com/farhan22025" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://farhan22025.github.io" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <ExternalLink className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="relative w-64 h-72 sm:w-72 sm:h-80 lg:w-80 lg:h-[22rem] rounded-3xl overflow-hidden border-2 border-primary/20 rotate-3 hover:rotate-0 transition-transform duration-700 bg-gradient-to-br from-primary/10 via-secondary/5 to-background">
                  <img
                    src={`${BASE_URL}/farhan-profile.png`}
                    alt="Farhan Alam"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="hidden md:flex justify-center mt-16"
          >
            <button onClick={() => scrollTo('about')} className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
              <span className="text-xs uppercase tracking-[0.2em] font-medium">Explore</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" className="py-28 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="About Me" label="Introduction" />

          <div className="grid md:grid-cols-[280px_1fr] gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="neo-card p-3 rounded-2xl">
                <img
                  src={`${BASE_URL}/farhan-profile.png`}
                  alt="Farhan"
                  className="w-full aspect-square object-cover rounded-xl"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 mt-4">
                <div className="neo-card p-3 text-center rounded-xl">
                  <p className="text-2xl font-display font-bold text-gradient-primary">4+</p>
                  <p className="text-xs text-muted-foreground mt-1">Projects</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-3xl font-display font-bold mb-6 tracking-tight">
                Aspiring <span className="text-gradient-primary">Data Engineer</span> based in Dhaka
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                I am a Software Engineering student at Daffodil International University with a strong academic interest in Data Science, Machine Learning, and data-driven problem solving. Experienced in academic projects involving database design, system analysis, Java and C development, and currently building a lightweight deepfake image detection system for research-oriented work.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Seeking academic, internship, or entry-level opportunities in data science and applied machine learning.
              </p>

              <div>
                <h4 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <FlaskConical className="w-4 h-4 text-primary" /> Research Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Machine Learning", "Computer Vision", "Deepfake Detection", "AI Security", "Image Forensics", "Data Analysis"].map(tag => (
                    <span key={tag} className="skill-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ SKILLS ═══════════ */}
      <section id="skills" className="py-28 px-4 sm:px-6 relative z-10 dot-grid">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Technical Skills" subtitle="Technologies and tools I work with" label="Expertise" />

          <div className="grid sm:grid-cols-2 gap-5">
            {skillsData.map((category, idx) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="neo-card p-6 md:p-8 rounded-2xl group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} text-white flex items-center justify-center shadow-lg`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground">{category.category}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <span key={skill} className="skill-chip">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ PROJECTS ═══════════ */}
      <section id="projects" className="py-28 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Academic Projects" subtitle="Showcasing my journey through code and research" label="Portfolio" />

          <div className="space-y-6">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="neo-card rounded-2xl overflow-hidden group"
              >
                <div className="grid md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-8 p-6 md:p-8">
                  <div className="hidden md:block">
                    <span className="number-badge">0{idx + 1}</span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`inline-block w-2 h-2 rounded-full bg-gradient-to-r ${project.accent}`} />
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">{project.type}</span>
                      <span className="text-xs text-muted-foreground">{project.year}</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-gradient-primary transition-colors mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 bg-muted text-muted-foreground rounded-lg text-xs font-medium border border-border">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 whitespace-nowrap"
                    >
                      <Github className="w-4 h-4" /> GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ EXPERIENCE ═══════════ */}
      <section id="experience" className="py-28 px-4 sm:px-6 relative z-10 dot-grid">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <SectionHeader title="Activities & Experience" align="left" label="Experience" />
              <div className="space-y-5">
                {[
                  {
                    title: "DIU Data Science Club Research Lab",
                    time: "2022 – Present",
                    desc: "Learning SQL, Python for Data Analysis, Big Data, deepfake detection research, and machine learning projects.",
                    icon: <FlaskConical className="w-4 h-4" />,
                  },
                  {
                    title: "DIU Robotics Club",
                    time: "2024 – Present",
                    desc: "Participating in IoT and automation-oriented projects with a focus on team-based learning.",
                    icon: <Users className="w-4 h-4" />,
                  },
                  {
                    title: "Tech Events & Hackathons Volunteer",
                    time: "Various",
                    desc: "Supporting student technology programs and active in community engagement.",
                    icon: <Sparkles className="w-4 h-4" />,
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="neo-card p-5 rounded-xl flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 mb-1.5">
                        <h4 className="font-display font-semibold text-foreground">{item.title}</h4>
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{item.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ═══════════ EDUCATION ═══════════ */}
            <div id="education">
              <SectionHeader title="Education" align="left" label="Academic" />
              <div className="space-y-5">
                {[
                  {
                    degree: "B.Sc. Software Engineering",
                    school: "Daffodil International University",
                    time: "2022 – 2026",
                    score: "CGPA: 3.06 / 4.00",
                    desc: "Focus: Software Engineering, System Design, Databases, Data Science. Ongoing thesis: Deepfake Image Detection.",
                  },
                  {
                    degree: "Cambridge A Levels",
                    school: "St. Loretto School & College",
                    time: "Completed 2021",
                    score: "GPA: 4.00 / 5.00",
                    desc: "Physics - B, Mathematics - B.",
                  },
                  {
                    degree: "Cambridge O Levels",
                    school: "St. Loretto School & College",
                    time: "Completed 2019",
                    score: "GPA: 4.00 / 5.00",
                    desc: "Science Group. Coursework in Mathematics, Physics, Chemistry, Biology, English, Bengali, ICT.",
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="neo-card p-5 rounded-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-semibold text-foreground">{item.degree}</h4>
                        <div className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground mt-0.5 mb-2">
                          <span>{item.school}</span>
                          <span className="text-border">|</span>
                          <span className="text-secondary font-medium">{item.time}</span>
                        </div>
                        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-foreground border border-border mb-2">
                          {item.score}
                        </span>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ MAP ═══════════ */}
      <section id="map" className="py-28 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="My Locations" subtitle="Where I live and study" label="Map" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="neo-card p-3 rounded-2xl"
          >
            <div className="h-[420px] w-full rounded-xl overflow-hidden">
              {isMapMounted && (
                <MapContainer
                  center={[23.85, 90.27]}
                  zoom={11}
                  scrollWheelZoom={false}
                  style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[23.7591, 90.3928]}>
                    <Popup>
                      <div className="font-semibold text-sm">Home</div>
                      <div className="text-xs text-muted-foreground">171/1 Tejkunipara, Tejgaon, Dhaka</div>
                    </Popup>
                  </Marker>
                  <Marker position={[23.8763, 90.3200]}>
                    <Popup>
                      <div className="font-semibold text-sm">Daffodil International University</div>
                      <div className="text-xs text-muted-foreground">Main Campus</div>
                    </Popup>
                  </Marker>
                </MapContainer>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="py-28 px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <SectionHeader title="Contact Me" subtitle="Let's connect and collaborate" label="Contact" />

          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href="mailto:f05076963@gmail.com"
              className="neo-card p-5 rounded-xl flex items-start gap-4 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground text-sm mb-0.5">Email</h4>
                <p className="text-sm text-muted-foreground">f05076963@gmail.com</p>
                <p className="text-sm text-muted-foreground">alam22205341122@diu.edu.bd</p>
              </div>
            </a>

            <a
              href="https://api.whatsapp.com/send/?phone=8801610772313&text=Hi+Farhan%2C+I+visited+your+portfolio+and+wanted+to+connect.&type=phone_number&app_absent=0"
              target="_blank"
              rel="noreferrer"
              className="neo-card p-5 rounded-xl flex items-start gap-4 group hover:border-green-500/30 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center shrink-0 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground text-sm mb-0.5">WhatsApp</h4>
                <p className="text-sm text-muted-foreground">+880 1610 772313</p>
                <p className="text-xs text-green-600 font-medium mt-1">Tap to chat on WhatsApp</p>
              </div>
            </a>

            <a
              href="https://www.google.com/maps/place/Q97R%2BGMR+Dhaka"
              target="_blank"
              rel="noreferrer"
              className="neo-card p-5 rounded-xl flex items-start gap-4 group hover:border-secondary/30 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-300">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground text-sm mb-0.5">Location</h4>
                <p className="text-sm text-muted-foreground">171/1, Tejkunipara, Tejgaon</p>
                <p className="text-sm text-muted-foreground">Dhaka-1215, Bangladesh</p>
                <p className="text-xs text-secondary font-medium mt-1">View on Google Maps</p>
              </div>
            </a>

            <a
              href="https://github.com/farhan22025"
              target="_blank"
              rel="noreferrer"
              className="neo-card p-5 rounded-xl flex items-start gap-4 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground text-sm mb-0.5">GitHub</h4>
                <p className="text-sm text-muted-foreground">farhan22025</p>
                <p className="text-xs text-primary font-medium mt-1">View profile</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-border/50 py-10 relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display font-semibold text-sm">
            <span className="text-gradient-primary">farhan</span>
            <span className="text-foreground/40">.dev</span>
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/farhan22025" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://farhan22025.github.io" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <ExternalLink className="w-4 h-4" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Farhan Alam
          </p>
        </div>
      </footer>
    </div>
  );
}

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, MapPin, Phone, ExternalLink, Calendar, Code, Database, Briefcase, Send, Loader2 } from "lucide-react";
import { useTypingEffect } from "@/hooks/use-typing-effect";
import { SectionHeader } from "@/components/SectionHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
// Leaflet imports
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Home() {
  const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");
  const titles = [
    "Aspiring Data Engineer",
    "Software Engineering Student",
    "ML Enthusiast",
    "Data Science Researcher"
  ];
  const typedTitle = useTypingEffect(titles, 80, 40, 2000);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Message sent successfully!",
      description: "Thanks for reaching out, Farhan will get back to you soon.",
      variant: "default",
    });
    reset();
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Define skills
  const skillsData = [
    {
      category: "Programming Languages",
      icon: <Code className="w-5 h-5 text-primary" />,
      skills: [
        { name: "Python", val: 85 },
        { name: "Java", val: 80 },
        { name: "C", val: 75 },
        { name: "R", val: 70 },
        { name: "PHP", val: 65 },
      ]
    },
    {
      category: "Databases & Data Tools",
      icon: <Database className="w-5 h-5 text-primary" />,
      skills: [
        { name: "Advanced Excel", val: 85 },
        { name: "MySQL", val: 80 },
        { name: "Google Sheets", val: 80 },
      ]
    },
    {
      category: "Software & Platforms",
      icon: <Briefcase className="w-5 h-5 text-primary" />,
      skills: [
        { name: "Microsoft Office", val: 90 },
        { name: "Google Workspace", val: 85 },
        { name: "Linux", val: 70 },
        { name: "macOS", val: 65 },
      ]
    },
    {
      category: "Design & QA",
      icon: <Briefcase className="w-5 h-5 text-primary" />,
      skills: [
        { name: "Canva", val: 85 },
        { name: "SQA Testing", val: 75 },
        { name: "Adobe Photoshop", val: 70 },
        { name: "Adobe Illustrator", val: 65 },
      ]
    }
  ];

  // Map mounted state to prevent SSR issues with Leaflet
  const [isMapMounted, setIsMapMounted] = useState(false);
  useEffect(() => {
    setIsMapMounted(true);
  }, []);

  return (
    <div className="bg-gradient-mesh min-h-screen">
      
      {/* HERO SECTION */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-0" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <p className="text-primary font-medium text-lg mb-2">Hello, I'm</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-foreground mb-4">
              Farhan Alam
            </h1>
            <div className="h-10 sm:h-12 mb-6">
              <h2 className="text-2xl sm:text-3xl font-medium text-muted-foreground">
                <span className="text-foreground/80">{typedTitle}</span>
                <span className="animate-pulse">|</span>
              </h2>
            </div>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Turning data into insights, and code into solutions.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => scrollTo('projects')}
                className="px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group"
              >
                View Projects 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollTo('contact')}
                className="px-8 py-3.5 bg-card/50 backdrop-blur-sm border-2 border-primary/20 text-foreground font-semibold rounded-xl hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
              >
                Contact Me
              </button>
            </div>
            
            <div className="mt-12 flex gap-4 justify-center lg:justify-start">
              <a href="https://github.com/farhan22025" target="_blank" rel="noreferrer" className="p-3 bg-card border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors hover:shadow-lg hover:shadow-primary/20">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://farhan22025.github.io" target="_blank" rel="noreferrer" className="p-3 bg-card border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors hover:shadow-lg hover:shadow-primary/20">
                <ExternalLink className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 bg-card border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors hover:shadow-lg hover:shadow-primary/20">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-teal-300 animate-pulse-slow blur-xl opacity-30"></div>
              <div className="absolute inset-2 rounded-full border-2 border-primary/50 border-dashed animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-0 rounded-full p-2 bg-gradient-to-br from-primary via-cyan-400 to-teal-500">
                <img 
                  src={`${BASE_URL}/farhan-profile.png`} 
                  alt="Farhan Alam" 
                  className="w-full h-full object-cover rounded-full bg-card"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80'; // fallback just in case
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 cursor-pointer text-muted-foreground hover:text-primary"
          onClick={() => scrollTo('about')}
        >
          <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
          <div className="w-5 h-8 border-2 border-current rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-current rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="About Me" />
          
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="w-56 h-56 rounded-2xl overflow-hidden glass-card p-2 rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src={`${BASE_URL}/farhan-profile.png`} 
                  alt="Farhan" 
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80';
                  }}
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-display font-semibold mb-4 text-foreground">
                Aspiring <span className="text-primary">Data Engineer</span>
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                I am a Software Engineering student at Daffodil International University with a strong academic interest in Data Science, Machine Learning, and data-driven problem solving. Experienced in academic projects involving database design, system analysis, Java and C development, and currently building a lightweight deepfake image detection system for research-oriented work.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Seeking academic, internship, or entry-level opportunities in data science and applied machine learning.
              </p>
              
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" /> Research Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Machine Learning", "Computer Vision", "Deepfake Detection", "AI Security", "Image Forensics", "Data Analysis"].map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Technical Skills" subtitle="Technologies and tools I work with" />
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {skillsData.map((category, idx) => (
              <motion.div 
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 md:p-8 rounded-2xl"
              >
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  {category.icon}
                  {category.category}
                </h3>
                
                <div className="space-y-5">
                  {category.skills.map(skill => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1.5">
                        <span className="font-medium text-foreground/90">{skill.name}</span>
                        <span className="text-muted-foreground text-sm">{skill.val}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-primary to-teal-400 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.val}%` }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Academic Projects" subtitle="Showcasing my journey through code and research" />
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Deepfake Image Detection",
                year: "2025–2026 (Ongoing)",
                type: "Research/Thesis",
                desc: "Developing a lightweight offline machine learning model for detecting manipulated images in low-resource environments. Applies image processing and classification techniques for efficient detection.",
                tags: ["ML", "Python", "Image Processing", "AI Security"],
              },
              {
                title: "Smart Waste Management System",
                year: "2025–2026",
                type: "Capstone",
                desc: "Designed relational database schema and data flow diagrams. Prepared software requirements documents to support scalable system architecture.",
                tags: ["System Design", "SRS", "UML", "ERD", "Database"],
              },
              {
                title: "Coffee Shop Management System",
                year: "2024",
                type: "Academic",
                desc: "Developed a point-of-sale workflow for capturing orders, daily sales, inventory movement, and revenue records using Java OOP principles.",
                tags: ["Java", "OOP", "POS System"],
              },
              {
                title: "Banking Management System",
                year: "2023",
                type: "Academic",
                desc: "Built a file-based data persistence system for storing and retrieving client financial records with input validation.",
                tags: ["C Programming", "File Handling", "Data Persistence"],
              }
            ].map((project, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group glass-card rounded-2xl p-6 md:p-8 flex flex-col h-full hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(6,182,212,0.2)]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-semibold text-primary tracking-wider uppercase mb-1 block">
                      {project.type} • {project.year}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 flex-grow">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-muted text-muted-foreground rounded-md text-xs font-medium border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a 
                  href="https://github.com/farhan22025" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground bg-card border border-border px-4 py-2.5 rounded-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all w-fit mt-auto"
                >
                  <Github className="w-4 h-4" /> View on GitHub
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE & EDUCATION */}
      <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Experience */}
            <div>
              <SectionHeader title="Activities & Experience" align="left" />
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent lg:before:ml-5 lg:before:translate-x-0 lg:before:mx-0">
                {[
                  {
                    title: "DIU Data Science Club Research Lab",
                    time: "2022 – Present",
                    desc: "Learning SQL, Python for Data Analysis, Big Data, deepfake detection research, and machine learning projects."
                  },
                  {
                    title: "DIU Robotics Club",
                    time: "2024 – Present",
                    desc: "Participating in IoT and automation-oriented projects with a focus on team-based learning."
                  },
                  {
                    title: "Tech Events & Hackathons Volunteer",
                    time: "Various",
                    desc: "Supporting student technology programs and active in community engagement."
                  }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group lg:justify-normal lg:odd:flex-row"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground shadow shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 lg:order-none lg:translate-x-0 lg:group-odd:translate-x-0 lg:group-even:translate-x-0">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-5 rounded-xl lg:w-[calc(100%-4rem)] ml-4 lg:ml-6 hover:border-primary/30 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                        <h4 className="text-lg font-bold text-foreground">{item.title}</h4>
                        <span className="text-sm font-medium text-primary mt-1 sm:mt-0 bg-primary/10 px-2 py-0.5 rounded shrink-0">{item.time}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div id="education">
              <SectionHeader title="Education" align="left" />
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent lg:before:ml-5 lg:before:translate-x-0 lg:before:mx-0">
                {[
                  {
                    degree: "B.Sc. Software Engineering",
                    school: "Daffodil International University",
                    time: "2022 – 2026",
                    score: "CGPA: 3.06 / 4.00",
                    desc: "Focus: Software Engineering, System Design, Databases, Data Science. Ongoing thesis: Deepfake Image Detection."
                  },
                  {
                    degree: "Cambridge A Levels",
                    school: "St. Loretto School & College",
                    time: "Completed 2021",
                    score: "GPA: 4.00 / 5.00",
                    desc: "Physics - B, Mathematics - B."
                  },
                  {
                    degree: "Cambridge O Levels",
                    school: "St. Loretto School & College",
                    time: "Completed",
                    score: "Science Group",
                    desc: "Foundational coursework in Mathematics, Science, English, Bengali."
                  }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group lg:justify-normal lg:odd:flex-row"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-secondary text-secondary-foreground shadow shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 lg:order-none lg:translate-x-0 lg:group-odd:translate-x-0 lg:group-even:translate-x-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-5 rounded-xl lg:w-[calc(100%-4rem)] ml-4 lg:ml-6 hover:border-secondary/30 transition-colors">
                      <div className="mb-2">
                        <h4 className="text-lg font-bold text-foreground">{item.degree}</h4>
                        <div className="flex flex-wrap gap-x-2 text-sm font-medium text-muted-foreground mt-1">
                          <span className="text-foreground/80">{item.school}</span>
                          <span>•</span>
                          <span className="text-primary">{item.time}</span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <span className="inline-block bg-muted text-foreground px-2 py-1 rounded text-xs font-semibold border border-border">
                          {item.score}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section id="map" className="py-24 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="My Locations" subtitle="Where I live and study" />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h-[400px] w-full rounded-2xl overflow-hidden glass-card p-2"
          >
            {isMapMounted && (
              <MapContainer 
                center={[23.845, 90.25]} // Midpoint between Dhaka and Ashulia roughly
                zoom={10} 
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[23.7508, 90.3743]}>
                  <Popup>
                    <div className="font-semibold text-sm">Home</div>
                    <div className="text-xs text-muted-foreground">Tejgaon, Dhaka</div>
                  </Popup>
                </Marker>
                <Marker position={[23.9399, 90.1373]}>
                  <Popup>
                    <div className="font-semibold text-sm">Daffodil International University</div>
                    <div className="text-xs text-muted-foreground">Ashulia Campus</div>
                  </Popup>
                </Marker>
              </MapContainer>
            )}
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Get In Touch" subtitle="Have a question or want to work together?" />
          
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-display font-semibold mb-8 text-foreground">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 glass-card rounded-xl hover:border-primary/40 transition-colors group">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground text-sm">f05076963@gmail.com</p>
                    <p className="text-muted-foreground text-sm">alam22205341122@diu.edu.bd</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 glass-card rounded-xl hover:border-primary/40 transition-colors group">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Phone</h4>
                    <p className="text-muted-foreground text-sm">+880 1610 772313</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 glass-card rounded-xl hover:border-primary/40 transition-colors group">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Location</h4>
                    <p className="text-muted-foreground text-sm">171/1, Tejkunipara, Tejgaon<br/>Dhaka-1215, Bangladesh</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="font-medium text-foreground mb-4">Connect on Social</h4>
                <div className="flex gap-4">
                  <a href="https://github.com/farhan22025" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://farhan22025.github.io" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-display font-semibold mb-6 text-foreground">Send me a message</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">Your Name</label>
                    <input 
                      id="name"
                      {...register("name")}
                      className={`w-full bg-background border ${errors.name ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:border-primary focus:ring-primary/20'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-4 transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                    <input 
                      id="email"
                      {...register("email")}
                      className={`w-full bg-background border ${errors.email ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:border-primary focus:ring-primary/20'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-4 transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                  <input 
                    id="subject"
                    {...register("subject")}
                    className={`w-full bg-background border ${errors.subject ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:border-primary focus:ring-primary/20'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-4 transition-all`}
                    placeholder="Project Inquiry"
                  />
                  {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                  <textarea 
                    id="message"
                    {...register("message")}
                    rows={5}
                    className={`w-full bg-background border ${errors.message ? 'border-destructive focus:ring-destructive/20' : 'border-border focus:border-primary focus:ring-primary/20'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-4 transition-all resize-none`}
                    placeholder="Hello Farhan, I'd like to discuss..."
                  />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/50 bg-background py-8 relative z-10 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center gap-4 mb-4">
            <a href="https://github.com/farhan22025" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://farhan22025.github.io" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <ExternalLink className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Farhan Alam. Built with React.
          </p>
        </div>
      </footer>
    </div>
  );
}

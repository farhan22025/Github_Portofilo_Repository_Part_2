import React, { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

type Intent =
  | "greeting"
  | "skills"
  | "projects"
  | "education"
  | "experience"
  | "research"
  | "contact"
  | "profile_summary"
  | "portfolio_overview"
  | "fresher_employability"
  | "describe_all"
  | "thanks"
  | "unknown";

const INTENT_PATTERNS: { intent: Intent; patterns: RegExp[] }[] = [
  {
    intent: "greeting",
    patterns: [
      /^(hi|hello|hey|howdy|sup|yo|greetings)\b/,
      /^good\s*(morning|afternoon|evening|day)/,
      /^what'?s\s*up/,
    ],
  },
  {
    intent: "skills",
    patterns: [
      /\b(skill|abilities|competenc|capable|proficien|expertise|what\s+(can|does)\s+(he|farhan)\s+(do|know)|technical|programming|language|python|java|php|tool|database|mysql|excel|canva|photoshop|linux|sqa|testing|tech\s*stack|technologies|software\s+(he\s+)?know|what\s+he\s+knows)\b/,
      /\b(good|proficient|capable|competent)\s+at\b/,
      /\bstrength/,
    ],
  },
  {
    intent: "projects",
    patterns: [
      /\b(project|deepfake|waste\s*manage|coffee\s*shop|banking\s*manage|capstone|what\s+(has|have)\s+(he|farhan)\s+(built|made|created|developed|worked\s+on)|portfolio\s+work|practical|hands[\s-]on|built|developed|created)\b/,
      /\bthesis\b/,
    ],
  },
  {
    intent: "education",
    patterns: [
      /\b(education|academic|study|studies|studied|university|diu|daffodil|school|loretto|degree|cgpa|gpa|a[\s-]?level|o[\s-]?level|qualification|diploma|bachelor|bsc|undergraduate|learning|coursework|major|graduated|graduation|college|institution)\b/,
      /\bwhere\s+(did|does)\s+(he|farhan)\s+stud/,
    ],
  },
  {
    intent: "experience",
    patterns: [
      /\b(experience|activit|club|volunteer|robotics|hackathon|iot|extracurricular|involvement|participate|membership|organization|community|team)\b/,
      /\b(data\s*science\s*club)\b/,
    ],
  },
  {
    intent: "research",
    patterns: [
      /\b(research|interest|machine\s*learning|ml\b|computer\s*vision|ai\s+security|image\s*forensic|deep\s*learning|neural|model)\b/,
      /\bwhat\s+is\s+(he|farhan)\s+research/,
    ],
  },
  {
    intent: "contact",
    patterns: [
      /\b(contact|email|phone|reach|hire|number|location|address|connect|get\s+in\s+touch|how\s+(can|do)\s+(i|we)\s+(contact|reach|email|call)|whatsapp|social\s*media|linkedin|github)\b/,
    ],
  },
  {
    intent: "fresher_employability",
    patterns: [
      /\b(fresher|employab|entry[\s-]?level|suitable|hire|hiring|job\s+ready|career|job\s+(sector|market)|why\s+(should|would)\s+(we|i)\s+(consider|hire)|good\s+fit|potential|ready\s+for\s+(work|job)|candidate|recruit|professional\s+fit)\b/,
      /\bhow\s+good/,
      /\bwhy\s+him\b/,
    ],
  },
  {
    intent: "profile_summary",
    patterns: [
      /\b(who\s+(is|are)\s+(farhan|you|he)|introduce|about\s+(farhan|him|yourself)|tell\s+me\s+about\s+(farhan|him|yourself)|background|overview|summary|summarize|brief|profile|describe\s+(farhan|him|yourself)|everything|all\s+about)\b/,
      /\byour\s+name\b/,
      /\bwhat\s+do\s+you\s+do\b/,
    ],
  },
  {
    intent: "portfolio_overview",
    patterns: [
      /\b(this\s+(portfolio|website|site|page)|portfolio\s+(about|overview|purpose)|what\s+is\s+this|purpose\s+of\s+this|about\s+this\s+(site|page|portfolio|website))\b/,
    ],
  },
  {
    intent: "describe_all",
    patterns: [
      /\b(describe\s+all|tell\s+(me\s+)?all|everything|all\s+of\s+(them|it|these)|each\s+of\s+them|give\s+me\s+everything|full\s+(overview|summary|profile)|complete\s+(overview|summary|profile))\b/,
    ],
  },
  {
    intent: "thanks",
    patterns: [
      /\b(thank|thanks|thx|ty|appreciated|helpful|great|awesome|nice|good\s+job|well\s+done)\b/,
      /^(ok|okay|got\s+it|understood|cool|perfect|alright)\b/,
    ],
  },
];

const RESPONSES: Record<Intent, string> = {
  greeting:
    "Hello! I'm Farhan's virtual assistant. I can help you learn about his skills, projects, education, experience, research interests, and contact details. Feel free to ask naturally — for example, 'What are his skills?' or 'How suitable is he for an entry-level role?'",

  skills:
    "Farhan's technical skills include:\n\n• Programming: Python, Java, C, R, PHP\n• Data & Databases: MySQL, Advanced Excel, Google Sheets\n• Platforms: Linux, macOS, Microsoft Office, Google Workspace\n• Design & QA: Canva, Adobe Photoshop, Adobe Illustrator, SQA Testing\n\nHis strongest areas are Python-based data analysis and Java application development. Would you like to know about his projects or research?",

  projects:
    "Farhan has worked on four main projects:\n\n1. Deepfake Image Detection (2025–2026) — His ongoing thesis: a lightweight offline ML model for detecting manipulated images in low-resource environments.\n2. Smart Waste Management System (2025–2026) — Capstone project involving database schema design, data flow diagrams, and software requirements documentation.\n3. Coffee Shop Management System (2024) — A Java OOP point-of-sale workflow for orders, sales, and inventory.\n4. Banking Management System (2023) — A C-based file persistence system for client financial records.\n\nAll projects are available on GitHub at github.com/farhan22025.",

  education:
    "Farhan's academic background:\n\n• B.Sc. in Software Engineering — Daffodil International University (2022–2026), CGPA: 3.06/4.00. Focus areas include Software Engineering, System Design, Databases, and Data Science.\n• Cambridge A Levels — St. Loretto School & College (Completed 2021), GPA: 4.00/5.00. Subjects: Physics (B), Mathematics (B).\n• Cambridge O Levels — St. Loretto School & College (Completed 2019), GPA: 4.00/5.00. Science Group with coursework in Mathematics, Physics, Chemistry, Biology, English, Bengali, and ICT.",

  experience:
    "Farhan's activities and experience:\n\n• DIU Data Science Club Research Lab (2022–Present) — Working on SQL, Python-based data analysis, Big Data concepts, and deepfake detection research.\n• DIU Robotics Club (2024–Present) — Participating in IoT and automation-oriented projects with team-based learning.\n• Tech Events & Hackathons — Regularly volunteers at student technology programs and community engagement events.\n\nWould you like to know about his research interests or projects?",

  research:
    "Farhan's research interests span Machine Learning, Computer Vision, Deepfake Detection, AI Security, and Image Forensics. His current thesis involves building a lightweight offline ML model for detecting manipulated images — specifically designed for low-resource environments where internet access may be limited. This work applies image processing and classification techniques for efficient, accessible detection.",

  contact:
    "You can reach Farhan through:\n\n• Email: f05076963@gmail.com or alam22205341122@diu.edu.bd\n• WhatsApp: +880 1610 772313\n• Location: 171/1, Tejkunipara, Tejgaon, Dhaka-1215, Bangladesh\n• GitHub: github.com/farhan22025\n\nFeel free to email or message on WhatsApp — he's happy to connect!",

  profile_summary:
    "Farhan Alam is a Software Engineering student at Daffodil International University (expected graduation 2026) with a strong interest in Data Science, Machine Learning, and data-driven problem solving. He has a solid academic foundation with Cambridge A Levels and O Levels from St. Loretto School & College.\n\nHe is currently researching deepfake image detection for his undergraduate thesis and has completed projects in Java, C, database design, and system analysis. He is an active member of the DIU Data Science Club and Robotics Club.\n\nHe is seeking academic, internship, or entry-level opportunities in data science and software engineering.",

  portfolio_overview:
    "This portfolio is a professional showcase of Farhan's education, technical skills, projects, research, and contact information. It is designed to help employers and recruiters quickly understand his profile, strengths, and readiness for entry-level opportunities in software engineering and data science. You can explore each section through the navigation or ask me any questions about his background.",

  fresher_employability:
    "Farhan is a promising candidate for entry-level software engineering and data science roles. Here's why:\n\n• Strong academic foundation — B.Sc. in Software Engineering with a solid CGPA, plus Cambridge A & O Levels background in Physics and Mathematics.\n• Practical project experience — Four academic projects spanning ML research, system design, Java OOP, and C programming.\n• Research capability — Active thesis work on deepfake image detection using machine learning.\n• Continuous learning — Active participation in the Data Science Club, Robotics Club, and tech community events.\n• Technical versatility — Skills in Python, Java, C, SQL, and multiple platforms.\n\nAs a fresher, his strengths are his analytical thinking, willingness to learn, and hands-on project experience. He would be well-suited for junior developer, data analyst, or ML research assistant positions.",

  describe_all:
    "Here's a quick overview of Farhan's complete profile:\n\n• Skills: Python, Java, C, R, PHP, MySQL, Excel, and various design/QA tools.\n• Projects: 4 academic projects including ML-based deepfake detection (thesis), system design, Java OOP, and C programming.\n• Education: B.Sc. Software Engineering at DIU (2022–2026), Cambridge A Levels and O Levels from St. Loretto School & College.\n• Experience: Active in DIU Data Science Club, Robotics Club, and tech volunteering.\n• Research: Machine Learning, Computer Vision, Deepfake Detection, AI Security.\n\nWould you like me to go deeper into any of these areas?",

  thanks:
    "You're welcome! If you have any more questions about Farhan's background, skills, or how to get in touch, feel free to ask anytime.",

  unknown: "",
};

const FALLBACK_RESPONSE =
  "I can help you with information about Farhan's skills, projects, education, experience, research interests, contact details, or an overall profile summary. You can ask naturally — for example:\n\n• 'What are his skills?'\n• 'Tell me about his projects'\n• 'How suitable is he for an entry-level role?'\n• 'Summarize his profile'\n\nWhat would you like to know?";

const FOLLOWUP_KEYWORDS: { keywords: RegExp; intent: Intent }[] = [
  { keywords: /\b(skill|abilities)\b/, intent: "skills" },
  { keywords: /\b(project|work)\b/, intent: "projects" },
  { keywords: /\b(education|academic|study|qualification)\b/, intent: "education" },
  { keywords: /\b(experience|activit|club)\b/, intent: "experience" },
  { keywords: /\b(research|ml|ai)\b/, intent: "research" },
  { keywords: /\b(contact|email|phone|reach)\b/, intent: "contact" },
  { keywords: /\b(profile|summary|background|overview)\b/, intent: "profile_summary" },
  { keywords: /\b(portfolio|website|site)\b/, intent: "portfolio_overview" },
  { keywords: /\b(fresher|hire|employ|job|entry)\b/, intent: "fresher_employability" },
];

function classifyIntent(input: string, lastBotIntent: Intent | null): Intent {
  const q = input.toLowerCase().trim();

  for (const { intent, patterns } of INTENT_PATTERNS) {
    for (const pattern of patterns) {
      if (pattern.test(q)) return intent;
    }
  }

  if (lastBotIntent !== null) {
    const shortInput = q.length < 30;

    if (shortInput) {
      for (const { keywords, intent } of FOLLOWUP_KEYWORDS) {
        if (keywords.test(q)) return intent;
      }

      if (/^(yes|yeah|yep|sure|please|go\s+ahead|continue|more|next|and)\b/.test(q)) {
        if (lastBotIntent === "describe_all" || lastBotIntent === "profile_summary") {
          return "skills";
        }
        return "describe_all";
      }

      if (/\b(what\s+about|how\s+about|and\s+the|also|then)\b/.test(q)) {
        for (const { keywords, intent } of FOLLOWUP_KEYWORDS) {
          if (keywords.test(q)) return intent;
        }
      }

      const singleWordIntents: Record<string, Intent> = {
        skills: "skills",
        skill: "skills",
        projects: "projects",
        project: "projects",
        education: "education",
        academics: "education",
        academic: "education",
        experience: "experience",
        activities: "experience",
        research: "research",
        contact: "contact",
        email: "contact",
        phone: "contact",
        portfolio: "portfolio_overview",
        website: "portfolio_overview",
        profile: "profile_summary",
        summary: "profile_summary",
        background: "profile_summary",
        fresher: "fresher_employability",
      };

      const words = q.replace(/[^a-z\s]/g, "").split(/\s+/);
      if (words.length <= 2) {
        for (const w of words) {
          if (singleWordIntents[w]) return singleWordIntents[w];
        }
      }
    }
  }

  if (/\b(tell|describe|explain|show|give|share|list)\b/.test(q) && q.length < 50) {
    for (const { keywords, intent } of FOLLOWUP_KEYWORDS) {
      if (keywords.test(q)) return intent;
    }
  }

  return "unknown";
}

const INITIAL_MESSAGE: Message = {
  id: "1",
  sender: "bot",
  text: "Hi there! I'm Farhan's virtual assistant. I can help you learn about his skills, projects, education, experience, and more. Feel free to ask naturally — what would you like to know?",
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastBotIntent, setLastBotIntent] = useState<Intent | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSend = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const intent = classifyIntent(userMessage.text, lastBotIntent);
      const responseText = intent === "unknown" ? FALLBACK_RESPONSE : RESPONSES[intent];

      setLastBotIntent(intent === "unknown" ? lastBotIntent : intent);

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: responseText,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  }, [inputValue, lastBotIntent]);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-primary to-secondary text-white rounded-2xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300 flex items-center justify-center group"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-12 right-0 bg-card border border-border text-foreground px-3 py-1.5 rounded-xl text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
              Chat with Assistant
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[500px] max-h-[80vh] flex flex-col bg-card border border-card-border shadow-2xl rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={`${BASE_URL}/chatbot-avatar.jpg`}
                    alt="Bot Avatar"
                    className="w-10 h-10 rounded-xl object-cover border-2 border-primary/30"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-card rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground text-sm">Farhan's Assistant</h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-muted"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>
                    {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>
                  <div
                    className={`px-4 py-2.5 rounded-2xl max-w-[78%] text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-br from-primary to-secondary text-white rounded-br-md'
                        : 'bg-muted text-foreground rounded-bl-md'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-muted text-foreground flex items-center gap-1.5">
                    <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} />
                    <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-border bg-card">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about Farhan..."
                  className="w-full bg-muted/50 border border-border rounded-xl py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 text-foreground placeholder:text-muted-foreground transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-1.5 p-1.5 bg-gradient-to-br from-primary to-secondary text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-primary/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

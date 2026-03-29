import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Bot, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

const INITIAL_MESSAGE: Message = {
  id: "1",
  sender: "bot",
  text: "Hi there! 👋 I'm Farhan's virtual assistant. I can answer questions about his skills, projects, education, and experience. How can I help you?",
};

// Rule-based response engine — first-person voice, tightly scoped keyword groups
function getBotResponse(input: string): string {
  const q = input.toLowerCase().trim();

  // Identity / intro — only match clear identity-seeking phrases
  if (/\b(who are you|who is farhan|introduce yourself|tell me about yourself|your name|what do you do)\b/.test(q)) {
    return "I'm Farhan Alam — an aspiring Data Engineer and Software Engineering student at Daffodil International University in Dhaka. I'm passionate about turning data into insights and I'm currently conducting research on deepfake image detection as my undergraduate thesis.";
  }

  // Skills / programming languages / tools
  if (/\b(skill|program|language|python|java|php|tool|database|mysql|excel|canva|photoshop|linux|sqa|testing)\b/.test(q)) {
    return "My core programming skills include Python, Java, C, R, and PHP. For data and databases I work with MySQL, Advanced Excel, and Google Sheets. I also use Linux, macOS, Adobe Photoshop, Illustrator, Canva, and SQA Testing in my workflow.";
  }

  // Projects — specific project keywords or generic "projects / work"
  if (/\b(project|deepfake|waste|coffee|banking|capstone|thesis|java|c programming)\b/.test(q)) {
    return "I've worked on four main academic projects:\n1. Deepfake Image Detection — my ongoing ML-based thesis research.\n2. Smart Waste Management System — a capstone project using SRS, UML, and ERD.\n3. Coffee Shop Management System — a Java OOP point-of-sale system.\n4. Banking Management System — a C-based file-handling financial records system.\nYou can find them all on my GitHub at github.com/farhan22025.";
  }

  // Education
  if (/\b(education|study|university|diu|daffodil|school|loretto|degree|cgpa|gpa|a level|o level)\b/.test(q)) {
    return "I'm currently pursuing a B.Sc. in Software Engineering at Daffodil International University (2022–2026) with a CGPA of 3.06/4.00. Before that, I completed my Cambridge A Levels at St. Loretto School & College in 2021 with a GPA of 4.00/5.00 (Physics and Mathematics).";
  }

  // Activities / experience / clubs
  if (/\b(activit|experience|club|volunteer|robotics|data science|hackathon|iot)\b/.test(q)) {
    return "I'm an active member of the DIU Data Science Club Research Lab (since 2022), where I work on data analysis and deepfake detection research. I'm also part of the DIU Robotics Club (since 2024), focusing on IoT and automation projects. On top of that, I regularly volunteer at tech events and hackathons to support the student community.";
  }

  // Research interests
  if (/\b(research|interest|machine learning|ml|computer vision|ai|image forensic|ai security)\b/.test(q)) {
    return "My research interests are in Machine Learning, Computer Vision, Deepfake Detection, AI Security, and Image Forensics. Right now I'm building a lightweight offline ML model for detecting manipulated images as my undergraduate thesis.";
  }

  // Contact / hire
  if (/\b(contact|email|phone|reach|hire|number|location|address)\b/.test(q)) {
    return "You're welcome to reach me at f05076963@gmail.com or alam22205341122@diu.edu.bd. My phone number is +8801610772313. I'm based in Tejgaon, Dhaka-1215, Bangladesh. You can also connect with me on GitHub at github.com/farhan22025.";
  }

  // Greetings — respond warmly but stay on topic
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy|sup)\b/.test(q)) {
    return "Hi there! 👋 I'm Farhan's virtual assistant. I can answer questions about my skills, projects, education, and experience. What would you like to know?";
  }

  // Fallback — polite off-topic redirection
  return "I'm here specifically to help with questions about Farhan's professional background. Could you ask me something about his skills, projects, education, or experience?";
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
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

    // Simulate network/typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: getBotResponse(userMessage.text),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-xl shadow-primary/30 hover:scale-110 transition-transform group"
            aria-label="Open chat"
          >
            <MessageCircle className="w-7 h-7" />
            <span className="absolute -top-12 right-0 bg-card border border-border text-foreground px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
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
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[500px] max-h-[80vh] flex flex-col bg-card border border-border shadow-2xl rounded-2xl overflow-hidden glass-card"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-primary/10 border-b border-primary/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    src={`${BASE_URL}/chatbot-avatar.jpg`} 
                    alt="Bot Avatar" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary/50"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=FA&background=06B6D4&color=fff';
                    }}
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground text-sm">Farhan's Assistant</h3>
                  <p className="text-xs text-muted-foreground">Ask me anything!</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-secondary text-secondary-foreground' : 'bg-primary/20 text-primary'}`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div 
                    className={`px-4 py-2.5 rounded-2xl max-w-[75%] text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                        : 'bg-muted text-foreground rounded-tl-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-muted text-foreground flex items-center gap-1">
                    <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-border bg-background/50">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about Farhan..."
                  className="w-full bg-muted border border-border rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-1.5 p-1.5 bg-primary text-primary-foreground rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-primary/90"
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

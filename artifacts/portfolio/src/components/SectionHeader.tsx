import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  label?: string;
}

export function SectionHeader({ title, subtitle, align = "center", label }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {label && (
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-4 border border-primary/20">
            {label}
          </span>
        )}
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-muted-foreground max-w-xl text-lg ${align === 'center' ? 'mx-auto' : ''}">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}

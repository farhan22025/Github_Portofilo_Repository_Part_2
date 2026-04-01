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
        initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-4 border border-primary/20"
          >
            {label}
          </motion.span>
        )}
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-4 text-muted-foreground max-w-xl text-lg ${align === 'center' ? 'mx-auto' : ''}`}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

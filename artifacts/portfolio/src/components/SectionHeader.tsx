import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeader({ title, subtitle, align = "center" }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
          {title}
        </h2>
        <div className={`h-1 w-20 bg-primary mt-4 rounded-full ${align === "center" ? "mx-auto" : ""}`} />
        {subtitle && (
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto md:text-lg">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}


import React from "react";
import { motion } from "motion/react";
import { usePersistTheme } from "@/hooks";
import { ArrowUpRight, FlaskConical } from "lucide-react";

interface LabProject {
  title: string;
  description: string;
  tags: string[];
  status: "live" | "wip" | "concept";
  href?: string;
}

const statusLabel: Record<LabProject["status"], string> = {
  live: "Live",
  wip: "En desarrollo",
  concept: "Concepto",
};

const statusColor: Record<LabProject["status"], string> = {
  live: "text-emerald-400 border-emerald-400/30",
  wip: "text-[#f8af00] border-[#f8af00]/30",
  concept: "text-zinc-500 border-zinc-500/30",
};

const projects: LabProject[] = [
  {
    title: "Parallax Glow Engine",
    description:
      "Motor de efecto parallax con lerp y tracking de cursor para elementos decorativos con blur y gradientes.",
    tags: ["React", "Framer Motion", "CSS"],
    status: "live",
  },
  {
    title: "Form Builder API",
    description:
      "Generador dinámico de formularios desde esquemas JSON con validación y envío integrado.",
    tags: ["TypeScript", "Zod", "React Hook Form"],
    status: "wip",
  },
  {
    title: "CLI Dashboard",
    description:
      "Dashboard interactivo para terminal con métricas en tiempo real y widgets configurables.",
    tags: ["Node.js", "Ink", "WebSockets"],
    status: "concept",
  },
];

export default function LabPage() {
  usePersistTheme();

  return (
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(249,176,0,0.08),transparent_42%),linear-gradient(-45deg,rgba(255,255,255,0.02),transparent_18%)]" />

      <div className="relative z-10 flex min-h-dvh flex-col">
        <div className="container mx-auto flex flex-1 flex-col items-center px-5 py-16">
          <div className="text-center py-20">
            <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-[#f8af00]">
              /Lab/
            </p>
            <h1 className="max-w-3xl text-center text-3xl font-mono uppercase tracking-wider text-white sm:text-5xl">
              Proyectos & Experimentos
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-7 text-zinc-400">
              Espacio donde comparto proyectos personales, prototipos y
              experimentos con tecnologías que me interesan.
            </p>
          </div>

          {projects.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="grid w-full max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {projects.map((project) => (
                <LabCard key={project.title} project={project} />
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-zinc-500">
              <FlaskConical className="h-10 w-10 text-[#F07D00]/40" />
              <p className="text-sm uppercase tracking-[0.2em]">
                Próximamente
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function LabCard({ project }: { project: LabProject }) {
  const Wrapper = project.href ? "a" : "div";
  const linkProps = project.href
    ? {
        href: project.href,
        target: "_blank" as const,
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <Wrapper
        {...linkProps}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-[#F07D00]/25 hover:bg-white/[0.05]"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-b from-[#F9B000]/5 to-transparent blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />

        <div>
          <div className="mb-4 flex items-center justify-between">
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.2em] ${statusColor[project.status]}`}
            >
              {statusLabel[project.status]}
            </span>
            {project.href && (
              <ArrowUpRight className="h-4 w-4 text-zinc-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#f8af00]" />
            )}
          </div>

          <h3 className="text-base font-light tracking-wide text-white">
            {project.title}
          </h3>
          <p className="mt-2 text-[13px] leading-6 text-zinc-500">
            {project.description}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-zinc-500 transition-colors duration-300 group-hover:border-white/12 group-hover:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </Wrapper>
    </motion.div>
  );
}

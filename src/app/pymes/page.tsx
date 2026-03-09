'use client'

import React from "react";
import { CustomContactDialog } from "@/components/shared";
import { usePersistTheme } from "@/hooks";
import {
  ArrowRight,
  BarChart3,
  Check,
  Globe,
  LayoutTemplate,
  MessageCircleMore,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const painPoints = [
  "Tus clientes potenciales no encuentran una página clara cuando buscan tu negocio.",
  "Tu empresa depende solo de redes sociales o WhatsApp para explicar lo que ofrece.",
  "Ya tienes una web, pero no comunica bien, no convierte o se ve desactualizada.",
];

const modules = [
  {
    icon: Globe,
    title: "Presencia digital profesional",
    description: "Una web clara, rápida y adaptable para presentar tu empresa, servicios, diferenciales y canales de contacto.",
  },
  {
    icon: LayoutTemplate,
    title: "Landing orientada a captar clientes",
    description: "Secciones pensadas para convertir visitas en consultas: beneficios, confianza, preguntas frecuentes y CTA visibles.",
  },
  {
    icon: Search,
    title: "Contenido que responde dudas reales",
    description: "Servicios, proceso, tiempos, diferenciadores, precios referenciales y formas de contacto para facilitar la decisión.",
  },
  {
    icon: MessageCircleMore,
    title: "Captación de oportunidades",
    description: "Formularios, WhatsApp, correo y llamadas a la acción para convertir visitas en leads reales.",
  },
  {
    icon: RefreshCw,
    title: "Mejora de sitios existentes",
    description: "Rediseño, reorganización del mensaje y mejoras visuales para páginas que hoy no están cumpliendo su objetivo.",
  },
  {
    icon: BarChart3,
    title: "Base para crecer",
    description: "Sitio listo para campañas, medición y mejoras futuras sin tener que empezar otra vez desde cero.",
  },
  {
    icon: ShieldCheck,
    title: "Confianza y soporte",
    description: "Diseño serio, velocidad, estructura ordenada y acompañamiento para que tu negocio proyecte solidez.",
  },
];

const scenarios = [
  {
    title: "Si hoy no tienes página web",
    points: [
      "Creamos una presencia digital sólida desde cero.",
      "Ordenamos tu oferta para que un potencial cliente entienda rápido qué haces.",
      "Definimos una estructura pensada para captar consultas desde el primer día.",
    ],
  },
  {
    title: "Si ya tienes una web pero no funciona",
    points: [
      "Revisamos el mensaje, la claridad de la oferta y la jerarquía del contenido.",
      "Mejoramos diseño, velocidad y llamados a la acción para aumentar conversiones.",
      "Actualizamos tu presencia sin perder lo que ya aporta valor.",
    ],
  },
];

const processSteps = [
  "Definimos tu servicio, cliente ideal y si necesitas crear o mejorar tu presencia actual.",
  "Ordenamos el contenido para explicar mejor tu propuesta y eliminar fricciones comerciales.",
  "Diseño y desarrollo una página rápida, clara y alineada con tu identidad visual.",
  "Se publica con formularios activos, estructura de conversión y base lista para seguir creciendo.",
];

const benefits = [
  "Más credibilidad frente a clientes nuevos y alianzas",
  "Una presencia propia que no depende de algoritmos ni plataformas externas",
  "Servicios y diferenciales explicados con mayor claridad",
  "Canal directo para solicitudes, cotizaciones y seguimiento comercial",
];

export default function PymesPage() {
  const [isContactOpen, setIsContactOpen] = React.useState<boolean>(false);

  usePersistTheme();

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,176,0,0.15),transparent_22%),radial-gradient(circle_at_80%_20%,rgba(240,125,0,0.18),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_18%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F07D00]/60 to-transparent" />

      <CustomContactDialog isContactOpen={isContactOpen} setIsContactOpen={setIsContactOpen} />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,1.15fr)_420px] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F07D00]/25 bg-[#F07D00]/8 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#f8af00]">
              <Sparkles className="h-3.5 w-3.5" />
              Presencia web para Pymes
            </div>

            <h1 className="max-w-4xl text-4xl font-light uppercase leading-tight text-white sm:text-5xl lg:text-6xl">
              Presencia digital para Pymes que necesitan empezar bien o
              <span className="text-gradient-light"> mejorar lo que hoy no está funcionando</span>.
            </h1>

            <p className="mt-6 max-w-3xl text-sm leading-8 text-zinc-300 sm:text-base">
              Desarrollo páginas para empresas que aún no tienen una presencia web profesional y también para Pymes que ya cuentan con un sitio,
              pero necesitan mejorarlo para comunicar mejor, verse más confiables y captar más oportunidades.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-light px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition-transform duration-200 hover:scale-[1.02]"
              >
                Solicitar página
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#modulos"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.18em] text-white/85 transition-colors duration-200 hover:bg-white/10"
              >
                Ver módulos
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                { value: "01", label: "mensaje claro y profesional" },
                { value: "02", label: "estructura enfocada en conversión" },
                { value: "03", label: "contacto directo y medible" },
              ].map((item) => (
                <div key={item.value} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#f8af00]">{item.value}</p>
                  <p className="mt-3 text-sm uppercase leading-6 text-zinc-200">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#F9B000]/20 to-[#F07D00]/5 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-zinc-950/70 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Enfoque</p>
                  <h2 className="mt-2 text-2xl font-light uppercase text-white">Qué busca una Pyme</h2>
                </div>
                <WandSparkles className="h-8 w-8 text-[#f8af00]" />
              </div>

              <div className="space-y-4">
                {painPoints.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F07D00]/15 text-[#f8af00]">
                      <Check className="h-4 w-4" />
                    </div>
                    <p className="text-sm leading-6 text-zinc-300">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-[#F07D00]/20 bg-[#F07D00]/8 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-[#f8af00]">Resultado esperado</p>
                <p className="mt-3 text-sm leading-7 text-zinc-200">
                  Una presencia digital que ayude a vender mejor: desde construir tu primera web hasta mejorar una que hoy no está rindiendo.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-5 pb-12 sm:px-8 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-2">
          {scenarios.map((scenario) => (
            <article key={scenario.title} className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">
              <p className="text-xs uppercase tracking-[0.32em] text-[#f8af00]">Escenario</p>
              <h2 className="mt-3 text-2xl font-light uppercase text-white">{scenario.title}</h2>
              <div className="mt-6 space-y-4">
                {scenario.points.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#F07D00]/30 bg-[#F07D00]/10 text-[#f8af00]">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm leading-7 text-zinc-300">{point}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="modulos" className="relative mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.32em] text-[#f8af00]">Módulos de interés</p>
          <h2 className="mt-3 text-3xl font-light uppercase text-white sm:text-4xl">
            Contenido pensado para responder lo que un emprendedor realmente necesita saber
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {modules.map(({ icon: Icon, title, description }) => (
            <article key={title} className="group rounded-[28px] border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#F07D00]/35 hover:bg-white/[0.05]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F07D00]/10 text-[#f8af00]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-light uppercase text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-300">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">
            <p className="text-xs uppercase tracking-[0.32em] text-[#f8af00]">Beneficios</p>
            <h2 className="mt-3 text-3xl font-light uppercase text-white">Lo que ganas con una presencia web sólida</h2>
            <div className="mt-8 space-y-4">
              {benefits.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#F07D00]/30 bg-[#F07D00]/10 text-[#f8af00]">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-sm leading-7 text-zinc-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-zinc-950/60 p-7">
            <p className="text-xs uppercase tracking-[0.32em] text-[#f8af00]">Proceso</p>
            <h2 className="mt-3 text-3xl font-light uppercase text-white">Cómo se construye la página</h2>
            <div className="mt-8 space-y-5">
              {processSteps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F07D00]/12 text-sm font-semibold text-[#f8af00]">
                    0{index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-zinc-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8 lg:px-10">
        <div className="rounded-[34px] border border-[#F07D00]/20 bg-[linear-gradient(135deg,rgba(249,176,0,0.12),rgba(255,255,255,0.02)_35%,rgba(240,125,0,0.08))] p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.32em] text-[#f8af00]">Llamado a la acción</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h2 className="text-3xl font-light uppercase leading-tight text-white sm:text-4xl">
                Si tu Pyme necesita construir o mejorar su presencia digital, esta página puede ser el punto de partida.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-zinc-300">
                Cuéntame qué vendes, cómo estás mostrando hoy tu negocio y qué objetivo buscas. Puedo ayudarte a transformar esa necesidad en una web clara, útil y preparada para convertir.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-black/80"
              >
                Quiero recibir una propuesta
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="mailto:derkysan19@gmail.com"
                className="text-sm uppercase tracking-[0.18em] text-zinc-200 underline decoration-[#F07D00]/45 underline-offset-4"
              >
                derkysan19@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

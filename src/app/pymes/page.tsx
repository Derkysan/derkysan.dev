
import React from "react";
import { CustomContactDialog } from "@/components/shared";
import { usePersistTheme } from "@/hooks";
import { ArrowRight, Check } from "lucide-react";

const stats = [
  { value: "24/7", label: "presencia disponible" },
  { value: "+claridad", label: "en tu propuesta comercial" },
  { value: "+contactos", label: "desde una web mejor pensada" },
];

const servicePaths = [
  {
    title: "Si hoy no tienes presencia digital",
    description:
      "Creamos una página simple, profesional y lista para explicar qué haces, generar confianza y facilitar el contacto.",
    points: [
      "Mensaje claro desde el primer bloque",
      "Estructura pensada para Pymes",
      "Contacto visible y directo",
    ],
  },
  {
    title: "Si ya tienes una web pero no está funcionando",
    description:
      "Reordenamos el contenido, mejoramos el diseño y simplificamos el mensaje para que tu sitio trabaje mejor comercialmente.",
    points: [
      "Mejor jerarquía visual",
      "Más claridad en servicios y diferenciales",
      "Mejores llamados a la acción",
    ],
  },
];

const deliverables = [
  "Diseño alineado con tu identidad actual",
  "Sitio claro, moderno y adaptable a móvil",
  "Secciones enfocadas en confianza y conversión",
  "Base lista para campañas o mejoras futuras",
];

export default function PymesPage() {
  const [isContactOpen, setIsContactOpen] = React.useState<boolean>(false);

  usePersistTheme();

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground border">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,176,0,0.08),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_20%)]" />
      <CustomContactDialog isContactOpen={isContactOpen} setIsContactOpen={setIsContactOpen} />
      
      <div className="h-svh">
        <section className="h-1/2 relative mx-auto w-full max-w-7xl px-5 pb-8 pt-16 sm:px-8 lg:px-10">
          <div className="grid gap-10 border-white/8 pb-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-[#f8af00]">
                /Presencia digital para Pymes/
              </p>
              <h1 className="max-w-4xl text-4xl font-mono text-white sm:text-6xl lg:text-5xl uppercase">
                Para vender mejor tu negocio necesita verse mejor.
              </h1>
            </div>

            <div className="max-w-sm lg:justify-self-end">
              <p className="text-sm leading-2 text-zinc-300">
                Ayudo a Pymes que aún no tienen web y también a empresas que ya tienen una, pero necesitan mejorarla para comunicar con más claridad y captar más oportunidades.
              </p>
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="mt-8 inline-flex items-center gap-2 border-b border-[#F07D00]/45 pb-2 text-sm uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:text-[#f8af00]"
              >
                Solicitar propuesta
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <section className="h-1/2 relative mx-auto w-full bg-gray-950">
          <div className="h-full overflow-hidden">
            <div className="relative w-full overflow-hidden bg-gray-700">
              {/* <img
                src="https://placehold.co/1600x900/171717/e7e5e4?text=Imagen+referencial+del+servicio"
                alt="Imagen referencial del servicio"
                className="h-full object-cover"
              /> */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.28))]" />
            </div>
          </div>
        </section>
      </div>


      

      <section className="relative mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 border-b border-white/8 pb-14 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-zinc-500">/Qué resuelve/</p>
          </div>
          <div>
            <h2 className="max-w-4xl text-3xl font-light leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              Ya sea una primera web o una mejora de la actual, el objetivo es el mismo: que tu negocio se entienda rápido y transmita confianza.
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400">
              Un buen sitio no necesita complicarse. Necesita un mensaje claro, una estructura correcta y una presencia visual coherente con tu negocio.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-light tracking-[-0.04em] text-[#2f6bff] sm:text-5xl">{stat.value}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-2">
          {servicePaths.map((item) => (
            <article key={item.title} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-7">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#f8af00]">Servicio</p>
              <h3 className="mt-3 text-2xl font-light leading-tight text-white">{item.title}</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-300">{item.description}</p>

              <div className="mt-8 space-y-4">
                {item.points.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F07D00]/12 text-[#f8af00]">
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

      <section className="relative mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 border-y border-white/8 py-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-zinc-500">/Qué incluye/</p>
            <h2 className="mt-4 max-w-xl text-3xl font-light leading-tight tracking-[-0.04em] text-white sm:text-4xl">
              Un diseño más simple, un mensaje más claro y una base sólida para captar clientes.
            </h2>
          </div>

          <div className="space-y-4">
            {deliverables.map((item) => (
              <div key={item} className="flex items-start gap-3 border-b border-white/8 pb-4">
                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#F07D00]/20 bg-[#F07D00]/10 text-[#f8af00]">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <p className="text-sm leading-7 text-zinc-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-14 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#f8af00]">/Contacto/</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-light leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              Si tu Pyme necesita presencia digital o una mejora real de su sitio actual, conversemos.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">
              Cuéntame qué vendes, cómo te estás mostrando hoy y qué necesitas mejorar. La idea es construir una página más simple, más clara y más útil para tu negocio.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-light px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition-transform duration-200 hover:scale-[1.02]"
            >
              Quiero mejorar mi presencia digital
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
      </section>
    </main>
  );
}

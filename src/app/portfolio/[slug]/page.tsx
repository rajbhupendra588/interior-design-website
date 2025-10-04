import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Maximize } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { projects } from "@/data/projects";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - LuxeInteriors Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-slate-900">
        <Container>
          <Link
            href="/portfolio"
            className="inline-flex items-center text-slate-300 hover:text-amber-500 transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Portfolio
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <span className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium">
                  {project.category}
                </span>
                <span className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium">
                  {project.style}
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
                {project.title}
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-500 mt-1" />
                  <div>
                    <div className="text-sm text-slate-400">Location</div>
                    <div className="text-white font-medium">{project.location}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-amber-500 mt-1" />
                  <div>
                    <div className="text-sm text-slate-400">Year</div>
                    <div className="text-white font-medium">{project.year}</div>
                  </div>
                </div>

                {project.area && (
                  <div className="flex items-start space-x-3">
                    <Maximize className="w-5 h-5 text-amber-500 mt-1" />
                    <div>
                      <div className="text-sm text-slate-400">Area</div>
                      <div className="text-white font-medium">{project.area}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1618219740731-1ccb6bc5c6b4?q=80&w=1200')`,
                }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Project Details */}
      <section className="py-16 lg:py-24">
        <Container>
          {/* Materials */}
          {project.materials && project.materials.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">
                Material Palette
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.materials.map((material) => (
                  <span
                    key={material}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Challenges */}
          {project.challenges && (
            <div className="mb-16">
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">
                Design Challenges
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {project.challenges}
              </p>
            </div>
          )}

          {/* Impact */}
          {project.impact && (
            <div className="mb-16">
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">
                Project Impact
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {project.impact}
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 p-8 lg:p-12 bg-gradient-to-br from-amber-50 to-slate-50 rounded-2xl border border-amber-100">
            <div className="max-w-2xl">
              <h3 className="text-2xl lg:text-3xl font-serif font-bold text-slate-900 mb-4">
                Ready to Transform Your Space?
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Let&apos;s bring your vision to life with our world-class interior
                design services. Schedule a consultation to get started.
              </p>
              <Link href="/consultation">
                <Button size="lg">Book a Consultation</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}


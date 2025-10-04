import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, DollarSign, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} - LuxeInteriors Services`,
    description: service.description,
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicePage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-slate-900">
        <Container>
          <Link
            href="/services"
            className="inline-flex items-center text-slate-300 hover:text-amber-500 transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
                {service.title}
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                {service.description}
              </p>

              <div className="grid grid-cols-2 gap-6">
                {service.duration && (
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-amber-500 mt-1" />
                    <div>
                      <div className="text-sm text-slate-400">Duration</div>
                      <div className="text-white font-medium">
                        {service.duration}
                      </div>
                    </div>
                  </div>
                )}

                {service.startingPrice && (
                  <div className="flex items-start space-x-3">
                    <DollarSign className="w-5 h-5 text-amber-500 mt-1" />
                    <div>
                      <div className="text-sm text-slate-400">Starting At</div>
                      <div className="text-white font-medium">
                        {service.startingPrice}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <Link href="/consultation">
                  <Button size="lg">Get a Quote</Button>
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200')`,
                }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <Container>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-12 text-center">
            What&apos;s Included
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <p className="text-slate-700 leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24">
        <Container>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-12 text-center">
            Our Process
          </h2>

          <div className="space-y-8">
            {service.process.map((step, index) => (
              <div key={step.step} className="flex gap-6">
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold flex items-center justify-center text-xl shadow-lg">
                    {step.step}
                  </div>
                  {index < service.process.length - 1 && (
                    <div className="w-0.5 h-16 bg-amber-200 mx-auto mt-4" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 to-slate-800">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Book a consultation to discuss your project and receive a
              personalized quote tailored to your needs and budget.
            </p>
            <Link href="/consultation">
              <Button size="lg">Book Your Consultation</Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}


import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { services } from "@/data/services";

export const metadata = {
  title: "Interior Design Services - LuxeInteriors",
  description:
    "Explore our comprehensive interior design services including full design & execution, 3D visualization, furniture curation, and commercial projects.",
};

export default function ServicesPage() {
  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-slate-900">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-6">
              Our Services
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 leading-relaxed">
              From initial concept to final installation, we offer a comprehensive
              suite of interior design services tailored to bring your vision to
              life with excellence and precision.
            </p>
          </div>
        </Container>
      </section>

      {/* Services List */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="space-y-16">
            {services.map((service, index) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group block"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Image */}
                  <div
                    className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-${
                          index === 0
                            ? "1618221195710-dd6b41faaea6"
                            : index === 1
                            ? "1600607687920-4e2a09cf159d"
                            : index === 2
                            ? "1616486338812-3dadae4b4ace"
                            : "1497366216902-e8bb7c05e78e"
                        }?q=80&w=1200')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-slate-900/40" />
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <span className="text-amber-600 font-medium mb-4 block">
                      0{index + 1}
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-4 group-hover:text-amber-600 transition-colors duration-300">
                      {service.title}
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Key Features */}
                    <ul className="space-y-3 mb-8">
                      {service.features.slice(0, 4).map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start space-x-3 text-slate-700"
                        >
                          <svg
                            className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center text-amber-600 font-medium group-hover:text-amber-700">
                      Learn More
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}


"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Box, Armchair, Building, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const services = [
  {
    icon: Home,
    title: "Full Interior Design",
    description:
      "Comprehensive design services from concept to completion, bringing your vision to life with meticulous attention to detail.",
    href: "/services/full-interior-design",
  },
  {
    icon: Box,
    title: "3D Visualization",
    description:
      "Experience your space before it's built with photorealistic renderings and immersive virtual walkthroughs.",
    href: "/services/3d-visualization",
  },
  {
    icon: Armchair,
    title: "Furniture & Decor",
    description:
      "Expertly curated furniture, lighting, and accessories that perfectly complement your unique style and space.",
    href: "/services/furniture-decor-curation",
  },
  {
    icon: Building,
    title: "Commercial Projects",
    description:
      "Transform your commercial space into an environment that enhances brand identity and improves functionality.",
    href: "/services/commercial-projects",
  },
];

export function ServicesOverview() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600 font-medium mb-4 block"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-6"
          >
            Comprehensive Design Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            From initial concept to final installation, we offer a full spectrum
            of interior design services tailored to your needs.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={service.href} className="group block">
                  <div className="relative p-8 lg:p-10 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-2xl transition-all duration-300 h-full border border-transparent hover:border-amber-100">
                    {/* Icon */}
                    <div className="w-16 h-16 mb-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-amber-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Link */}
                    <div className="flex items-center text-amber-600 font-medium group-hover:text-amber-700">
                      Learn More
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/services">
            <Button size="lg">View All Services</Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}



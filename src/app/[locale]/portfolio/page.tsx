"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/projects";
import { Project } from "@/types";

const categories = ["All", "Residential", "Commercial"];
const styles = ["All", "Modern", "Classic", "Industrial", "Minimalist"];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [allProjects, setAllProjects] = useState<Project[]>(projects);

  // Load custom portfolios
  useEffect(() => {
    fetch("/data/custom-portfolios.json")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAllProjects([...data, ...projects]);
        }
      })
      .catch(() => {
        // If file doesn't exist or error, just use default projects
        setAllProjects(projects);
      });
  }, []);

  const filteredProjects = allProjects.filter((project) => {
    const categoryMatch =
      selectedCategory === "All" || project.category === selectedCategory;
    const styleMatch = selectedStyle === "All" || project.style === selectedStyle;
    return categoryMatch && styleMatch;
  });

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-slate-900">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-6">
              Our Portfolio
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 leading-relaxed">
              Explore our collection of transformative interior design projects.
              Each space tells a unique story of creativity, craftsmanship, and
              client collaboration.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-slate-200 sticky top-20 bg-white/95 backdrop-blur-md z-40">
        <Container>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-amber-600 text-white shadow-lg"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Style Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Style
              </label>
              <div className="flex flex-wrap gap-2">
                {styles.map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedStyle === style
                        ? "bg-amber-600 text-white shadow-lg"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-slate-600">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="py-16 lg:py-24">
        <Container>
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-slate-600">
                No projects found with the selected filters.
              </p>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/portfolio/${project.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6 bg-slate-200">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-${
                index % 6 === 0
                  ? "1618219740731-1ccb6bc5c6b4"
                  : index % 6 === 1
                  ? "1616486338812-3dadae4b4ace"
                  : index % 6 === 2
                  ? "1600210492493-0946911123ea"
                  : index % 6 === 3
                  ? "1600607687939-ce8a6c25118c"
                  : index % 6 === 4
                  ? "1600566753190-17f0baa2a6c3"
                  : "1600585154340-be09a09c8877"
              }?q=80&w=800')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

          {/* Project Details Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs font-medium px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                {project.category}
              </span>
              <span className="text-xs font-medium px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                {project.style}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-white/80">
              {project.location} • {project.year}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}



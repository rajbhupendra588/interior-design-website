import { Award, Heart, Users, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

const values = [
  {
    icon: Heart,
    title: "Passion for Design",
    description:
      "We believe great design has the power to transform lives. Every project is approached with creativity, dedication, and genuine care.",
  },
  {
    icon: Users,
    title: "Client-Centered",
    description:
      "Your vision drives everything we do. We listen, collaborate, and ensure your unique story is reflected in every design decision.",
  },
  {
    icon: Target,
    title: "Excellence in Execution",
    description:
      "From concept to completion, we maintain the highest standards of quality, craftsmanship, and attention to detail.",
  },
  {
    icon: Award,
    title: "Award-Winning Work",
    description:
      "Recognized for design excellence and innovation, our work has been featured in leading publications and honored with industry awards.",
  },
];

const team = [
  {
    name: "Priya Malhotra",
    role: "Founder & Principal Designer",
    bio: "With over 15 years of experience, Priya has led transformative projects across residential and commercial spaces. Her design philosophy centers on creating timeless, functional spaces that reflect each client's unique personality.",
    image: "1",
  },
  {
    name: "Arjun Kapoor",
    role: "Senior Interior Designer",
    bio: "Arjun specializes in contemporary and minimalist design. His keen eye for detail and passion for sustainable materials brings a fresh perspective to every project.",
    image: "2",
  },
  {
    name: "Sneha Desai",
    role: "3D Visualization Lead",
    bio: "Sneha transforms design concepts into stunning photorealistic visualizations. Her technical expertise helps clients envision their spaces before construction begins.",
    image: "3",
  },
  {
    name: "Vikram Singh",
    role: "Project Manager",
    bio: "Vikram ensures seamless execution from planning through final installation. His organizational skills and vendor relationships guarantee projects are delivered on time and on budget.",
    image: "4",
  },
];

const achievements = [
  { label: "Years of Excellence", value: "15+" },
  { label: "Projects Completed", value: "500+" },
  { label: "Happy Clients", value: "450+" },
  { label: "Industry Awards", value: "25+" },
];

export const metadata = {
  title: "About Us - LuxeInteriors",
  description:
    "Meet the award-winning team behind LuxeInteriors. Learn about our design philosophy, values, and commitment to creating extraordinary spaces.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-slate-900">
        <Container>
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-6">
              Transforming Spaces <br />
              <span className="text-amber-500">Into Experiences</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 leading-relaxed">
              For over 15 years, LuxeInteriors has been India&apos;s trusted partner
              in creating exceptional interior spaces that inspire, comfort, and endure. 
              Our award-winning team blends contemporary design with Indian cultural 
              aesthetics to bring your dreams to life.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & Philosophy */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-6">
                Our Design Philosophy
              </h2>
              <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                <p>
                  We believe that exceptional interior design is more than
                  aesthetics—it&apos;s about creating spaces that enhance how you
                  live, work, and feel.
                </p>
                <p>
                  Our approach combines timeless design principles with
                  contemporary innovation. We listen deeply to understand your
                  lifestyle, preferences, and aspirations, then craft spaces
                  that authentically reflect your story.
                </p>
                <p>
                  Every material, color, and detail is carefully considered to
                  create harmonious environments that balance beauty,
                  functionality, and sustainability.
                </p>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=1200')",
                }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-6">
              Our Values
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              These core principles guide every project we undertake and every
              relationship we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              A passionate group of designers, visualizers, and project managers
              dedicated to bringing your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {team.map((member) => (
              <div
                key={member.name}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-${
                        member.image === "1"
                          ? "1594744803329-55b58d87e95f"
                          : member.image === "2"
                          ? "1633332755192-727a05c4013d"
                          : member.image === "3"
                          ? "1580489944761-15a19d654956"
                          : "1507003211169-0a1dd7228f2d"
                      }?q=80&w=800')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-amber-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-slate-600 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Achievements */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 to-slate-800">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement) => (
              <div key={achievement.label} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-amber-500 mb-2">
                  {achievement.value}
                </div>
                <div className="text-slate-300">{achievement.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />
    </div>
  );
}


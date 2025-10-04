import { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Design Blog - LuxeInteriors",
  description:
    "Explore interior design tips, trends, and inspiration from our expert designers.",
};

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const recentPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 to-slate-800">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-6">
              Design Insights & Inspiration
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Explore the latest trends, expert tips, and creative ideas to
              transform your space.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 lg:py-24">
          <Container>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-12">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image */}
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url('${post.image}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="flex items-center text-sm text-slate-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors duration-200">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-slate-600 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-10 h-10 rounded-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url('${post.author.avatar}')`,
                          }}
                        />
                        <div>
                          <div className="font-medium text-slate-900">
                            {post.author.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {post.author.role}
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center text-amber-600 hover:text-amber-700 font-medium group"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <Container>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-12">
            Recent Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url('${post.image}')` }}
                    />
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center text-xs text-slate-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors duration-200">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center space-x-2 pt-4 border-t border-slate-200">
                    <div
                      className="w-8 h-8 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${post.author.avatar}')`,
                      }}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">
                        {post.author.name}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="bg-gradient-to-br from-amber-50 to-slate-50 rounded-2xl p-8 lg:p-12 border border-amber-100">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-4">
                Stay Inspired
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Get design tips, trends, and exclusive content delivered to your
                inbox. Join our community of design enthusiasts.
              </p>
              <Link href="/contact">
                <Button size="lg">Subscribe to Newsletter</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}


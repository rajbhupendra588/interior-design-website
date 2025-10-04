import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { blogPosts } from "@/data/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - LuxeInteriors Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, exclude current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <Container>
          <Link
            href="/blog"
            className="inline-flex items-center text-slate-600 hover:text-amber-600 transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Blog
          </Link>

          <div className="max-w-4xl">
            {/* Category and Read Time */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="flex items-center text-slate-600">
                <Clock className="w-4 h-4 mr-2" />
                {post.readTime}
              </span>
              <span className="flex items-center text-slate-600">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Author */}
            <div className="flex items-center space-x-4 pb-8 border-b border-slate-200">
              <div
                className="w-16 h-16 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url('${post.author.avatar}')` }}
              />
              <div>
                <div className="font-bold text-slate-900 text-lg">
                  {post.author.name}
                </div>
                <div className="text-slate-600">{post.author.role}</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${post.image}')` }}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-lg prose-slate max-w-none">
              <div
                className="text-slate-700 leading-relaxed"
                style={{
                  whiteSpace: "pre-wrap",
                }}
              >
                {post.content}
              </div>
            </article>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="w-5 h-5 text-slate-400" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-slate-200 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 lg:py-24 bg-slate-50">
          <Container>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-12 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                        style={{
                          backgroundImage: `url('${relatedPost.image}')`,
                        }}
                      />
                    </div>
                  </Link>

                  <div className="p-6">
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
                      {relatedPost.category}
                    </span>

                    <Link href={`/blog/${relatedPost.slug}`}>
                      <h3 className="text-lg font-serif font-bold text-slate-900 mt-3 mb-2 group-hover:text-amber-600 transition-colors duration-200">
                        {relatedPost.title}
                      </h3>
                    </Link>

                    <p className="text-slate-600 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 to-slate-800">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Let&apos;s bring your vision to life. Schedule a consultation with
              our expert designers today.
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


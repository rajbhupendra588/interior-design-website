"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import ReactMarkdown from "react-markdown";
import { Book, FileText, Layout, CheckCircle } from "lucide-react";

const docs = [
  {
    id: "admin-guide",
    title: "Admin Guide",
    description: "Complete guide for using the admin dashboard",
    file: "ADMIN_GUIDE.md",
    icon: Book,
  },
  {
    id: "booking-system",
    title: "Booking System",
    description: "Technical documentation and architecture",
    file: "BOOKING_SYSTEM.md",
    icon: Layout,
  },
  {
    id: "setup-complete",
    title: "Setup Complete",
    description: "Quick start guide and features overview",
    file: "SETUP_COMPLETE.md",
    icon: CheckCircle,
  },
];

export default function DocsPage() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const loadDoc = async (filename: string, docId: string) => {
    setLoading(true);
    setSelectedDoc(docId);
    try {
      const response = await fetch(`/${filename}`);
      const text = await response.text();
      setContent(text);
    } catch (error) {
      console.error("Error loading document:", error);
      setContent("# Error\n\nFailed to load document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 lg:pt-32">
      <Container>
        <div className="py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-4">
              Documentation
            </h1>
            <p className="text-lg text-slate-600">
              View all documentation in a beautiful, formatted layout
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sticky top-24">
                <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Available Docs
                </h2>
                <div className="space-y-2">
                  {docs.map((doc) => {
                    const Icon = doc.icon;
                    return (
                      <button
                        key={doc.id}
                        onClick={() => loadDoc(doc.file, doc.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedDoc === doc.id
                            ? "bg-amber-50 border-2 border-amber-600"
                            : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium text-slate-900 text-sm">
                              {doc.title}
                            </div>
                            <div className="text-xs text-slate-600 mt-0.5">
                              {doc.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                  <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-slate-600">Loading document...</p>
                </div>
              ) : selectedDoc ? (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 lg:p-12">
                  <article className="prose prose-slate max-w-none prose-headings:font-serif prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-a:text-amber-600 prose-code:text-amber-600 prose-code:bg-amber-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-900 prose-pre:text-slate-100">
                    <ReactMarkdown>{content}</ReactMarkdown>
                  </article>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                  <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Select a Document
                  </h3>
                  <p className="text-slate-600">
                    Choose a document from the sidebar to view it here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}


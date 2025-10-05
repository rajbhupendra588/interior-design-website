"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ArrowLeft, Plus, CheckCircle, Image as ImageIcon } from "lucide-react";
import type { Project } from "@/types";

export default function AdminPortfolio() {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Residential",
    style: "Modern",
    location: "",
    area: "",
    year: new Date().getFullYear().toString(),
    imageUrl: "",
    materials: "",
    challenges: "",
    impact: "",
  });

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      router.push("/admin/login");
      return;
    }
    setToken(adminToken);
    fetchPortfolios(adminToken);
  }, [router]);

  const fetchPortfolios = async (authToken: string) => {
    try {
      const response = await fetch("/api/portfolio", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await response.json();
      if (data.success) {
        setPortfolios(data.portfolios);
      }
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        // Reset form
        setFormData({
          title: "",
          description: "",
          category: "Residential",
          style: "Modern",
          location: "",
          area: "",
          year: new Date().getFullYear().toString(),
          imageUrl: "",
          materials: "",
          challenges: "",
          impact: "",
        });

        // Show success message
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);

        // Refresh portfolios
        fetchPortfolios(token);
      }
    } catch (error) {
      console.error("Error adding portfolio:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Container>
        <div className="mb-8">
          <Button
            onClick={() => router.push("/admin/dashboard")}
            variant="outline"
            size="sm"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-serif font-bold text-slate-900">
            Portfolio Management
          </h1>
          <p className="text-slate-600 mt-2">
            Add new portfolio projects to showcase your work
          </p>
        </div>

        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">
              Portfolio added successfully!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Portfolio
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Project Title *
                    </label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Modern Luxury Apartment"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description *
                    </label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the project in detail..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 outline-none bg-white"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Style *
                      </label>
                      <select
                        name="style"
                        value={formData.style}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 outline-none bg-white"
                      >
                        <option value="Modern">Modern</option>
                        <option value="Classic">Classic</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Minimalist">Minimalist</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Location & Details */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Location *
                      </label>
                      <Input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g., Mumbai, Maharashtra"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Area Size
                      </label>
                      <Input
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        placeholder="e.g., 2,500 sq ft"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Year
                    </label>
                    <Input
                      name="year"
                      type="number"
                      value={formData.year}
                      onChange={handleChange}
                      placeholder="2024"
                      min="2000"
                      max="2100"
                    />
                  </div>
                </div>

                {/* Image */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Image URL
                    </label>
                    <Input
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg (optional)"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Leave empty to use placeholder image
                    </p>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Materials
                    </label>
                    <Input
                      name="materials"
                      value={formData.materials}
                      onChange={handleChange}
                      placeholder="Oak Wood, Marble, Brass Fixtures (comma-separated)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Design Challenges
                    </label>
                    <Textarea
                      name="challenges"
                      value={formData.challenges}
                      onChange={handleChange}
                      placeholder="What were the main challenges in this project?"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Project Impact
                    </label>
                    <Textarea
                      name="impact"
                      value={formData.impact}
                      onChange={handleChange}
                      placeholder="What was the outcome/impact of this project?"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Adding Portfolio...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Portfolio
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Portfolio List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Your Portfolios
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                {portfolios.length} custom portfolio{portfolios.length !== 1 ? "s" : ""} added
              </p>

              {portfolios.length === 0 ? (
                <div className="text-center py-8">
                  <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">
                    No portfolios added yet
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {portfolios.map((portfolio) => (
                    <div
                      key={portfolio.id}
                      className="p-3 border border-slate-200 rounded-lg hover:border-amber-600 transition-colors"
                    >
                      <h3 className="font-medium text-slate-900 text-sm">
                        {portfolio.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded">
                          {portfolio.category}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                          {portfolio.style}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {portfolio.location} • {portfolio.year}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}


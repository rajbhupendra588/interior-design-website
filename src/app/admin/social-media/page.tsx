"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { 
  ArrowLeft, 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Youtube,
  Share2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown
} from "lucide-react";
import type { SocialMedia } from "@/types";

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
  Twitter,
  YouTube: Youtube,
  Pinterest: Share2,
  TikTok: Share2,
  WhatsApp: Share2,
  Other: Share2,
};

const platformOptions = [
  "Instagram",
  "Facebook",
  "LinkedIn",
  "Twitter",
  "YouTube",
  "Pinterest",
  "TikTok",
  "WhatsApp",
  "Other",
];

export default function SocialMediaManagement() {
  const router = useRouter();
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [token, setToken] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    platform: "Instagram",
    url: "",
    enabled: true,
  });

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      router.push("/admin/login");
      return;
    }
    setToken(adminToken);
    fetchSocialMedia(adminToken);
  }, [router]);

  const fetchSocialMedia = async (authToken: string) => {
    try {
      const response = await fetch("/api/social-media", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      
      if (!response.ok) {
        console.error("API response not OK:", response.status, response.statusText);
        setLoading(false);
        return;
      }
      
      const text = await response.text();
      if (!text) {
        console.error("Empty response from API");
        setLoading(false);
        return;
      }
      
      const data = JSON.parse(text);
      if (data.success) {
        setSocialMedia(data.data);
      } else {
        console.error("API returned error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching social media:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!formData.name || !formData.url) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("/api/social-media", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        fetchSocialMedia(token);
        setShowAddForm(false);
        setFormData({ name: "", platform: "Instagram", url: "", enabled: true });
      } else {
        alert(data.message || "Failed to add social media link");
      }
    } catch (error) {
      console.error("Error adding social media:", error);
      alert("Failed to add social media link");
    }
  };

  const handleUpdate = async (id: string, updates: Partial<SocialMedia>) => {
    try {
      const response = await fetch("/api/social-media", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, ...updates }),
      });
      const data = await response.json();
      if (data.success) {
        fetchSocialMedia(token);
        setEditingId(null);
      } else {
        alert(data.message || "Failed to update social media link");
      }
    } catch (error) {
      console.error("Error updating social media:", error);
      alert("Failed to update social media link");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this social media link?")) {
      return;
    }

    try {
      const response = await fetch(`/api/social-media?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        fetchSocialMedia(token);
      } else {
        alert(data.message || "Failed to delete social media link");
      }
    } catch (error) {
      console.error("Error deleting social media:", error);
      alert("Failed to delete social media link");
    }
  };

  const handleToggleEnabled = async (item: SocialMedia) => {
    await handleUpdate(item.id, { enabled: !item.enabled });
  };

  const handleReorder = async (item: SocialMedia, direction: "up" | "down") => {
    const newOrder = direction === "up" ? item.order - 1.5 : item.order + 1.5;
    
    await handleUpdate(item.id, { order: newOrder });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading social media...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-slate-900">
                Social Media Management
              </h1>
              <p className="text-slate-600 mt-2">
                Manage your social media links displayed on the website
              </p>
            </div>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Social Media
            </Button>
          </div>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-amber-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">Add New Social Media</h2>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setFormData({ name: "", platform: "Instagram", url: "", enabled: true });
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Display Name *
                </label>
                <Input
                  placeholder="e.g., Instagram"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Platform *
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 outline-none bg-white"
                >
                  {platformOptions.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  URL *
                </label>
                <Input
                  placeholder="https://instagram.com/yourprofile"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4">
              <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Add Social Media
              </Button>
            </div>
          </div>
        )}

        {/* Social Media List */}
        <div className="space-y-4">
          {socialMedia.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Share2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">No social media links added yet</p>
              <Button onClick={() => setShowAddForm(true)} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Link
              </Button>
            </div>
          ) : (
            socialMedia.map((item, index) => {
              const Icon = platformIcons[item.platform] || Share2;
              const isEditing = editingId === item.id;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl shadow-sm border p-6 ${
                    item.enabled ? "border-slate-200" : "border-slate-300 bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          item.enabled ? "bg-amber-100" : "bg-slate-200"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            item.enabled ? "text-amber-600" : "text-slate-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        {isEditing ? (
                          <div className="space-y-3">
                            <Input
                              placeholder="Display Name"
                              defaultValue={item.name}
                              id={`name-${item.id}`}
                            />
                            <select
                              defaultValue={item.platform}
                              id={`platform-${item.id}`}
                              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 outline-none bg-white"
                            >
                              {platformOptions.map((platform) => (
                                <option key={platform} value={platform}>
                                  {platform}
                                </option>
                              ))}
                            </select>
                            <Input
                              placeholder="URL"
                              defaultValue={item.url}
                              id={`url-${item.id}`}
                            />
                          </div>
                        ) : (
                          <>
                            <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                            <p className="text-sm text-slate-500 mt-1">{item.platform}</p>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-amber-600 hover:text-amber-700 mt-2 inline-block"
                            >
                              {item.url}
                            </a>
                            <div className="flex items-center gap-4 mt-3">
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded ${
                                  item.enabled
                                    ? "bg-green-100 text-green-700"
                                    : "bg-slate-200 text-slate-600"
                                }`}
                              >
                                {item.enabled ? "Visible" : "Hidden"}
                              </span>
                              <span className="text-xs text-slate-500">Order: {item.order}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Reorder buttons */}
                      <div className="flex flex-col gap-1">
                        {index > 0 && (
                          <button
                            onClick={() => handleReorder(item, "up")}
                            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded"
                            title="Move up"
                          >
                            <MoveUp className="w-4 h-4" />
                          </button>
                        )}
                        {index < socialMedia.length - 1 && (
                          <button
                            onClick={() => handleReorder(item, "down")}
                            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded"
                            title="Move down"
                          >
                            <MoveDown className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      {isEditing ? (
                        <>
                          <Button
                            onClick={() => {
                              const name = (
                                document.getElementById(`name-${item.id}`) as HTMLInputElement
                              )?.value;
                              const platform = (
                                document.getElementById(`platform-${item.id}`) as HTMLSelectElement
                              )?.value as SocialMedia["platform"];
                              const url = (
                                document.getElementById(`url-${item.id}`) as HTMLInputElement
                              )?.value;
                              handleUpdate(item.id, { name, platform, url });
                            }}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            onClick={() => setEditingId(null)}
                            variant="outline"
                            size="sm"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={() => handleToggleEnabled(item)}
                            variant="outline"
                            size="sm"
                            title={item.enabled ? "Hide" : "Show"}
                          >
                            {item.enabled ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            onClick={() => setEditingId(item.id)}
                            variant="outline"
                            size="sm"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(item.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-2">💡 Tips</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Only enabled social media links will be visible on the website footer</li>
            <li>• Use the eye icon to quickly show/hide links without deleting them</li>
            <li>• Reorder links using the up/down arrows to control their display order</li>
            <li>• Make sure to use complete URLs including https://</li>
          </ul>
        </div>
      </Container>
    </div>
  );
}


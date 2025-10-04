"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Calendar, Clock, Mail, Phone, MapPin, LogOut, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import type { Booking } from "@/types";

export default function AdminDashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      router.push("/admin/login");
      return;
    }
    setToken(adminToken);
    fetchBookings(adminToken);
  }, [router]);

  const fetchBookings = async (authToken: string) => {
    try {
      const response = await fetch("/api/bookings", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/bookings/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingId, status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        fetchBookings(token);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.Status.toLowerCase() === filter.toLowerCase();
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.Status === "Pending").length,
    confirmed: bookings.filter((b) => b.Status === "Confirmed").length,
    completed: bookings.filter((b) => b.Status === "Completed").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-50">
        <Container>
          <div className="py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-sm text-slate-600">Manage consultation bookings</p>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Bookings</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pending</p>
                  <p className="text-3xl font-bold text-amber-600 mt-2">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Confirmed</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">{stats.confirmed}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Completed</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{stats.completed}</p>
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-slate-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-2 mb-6 inline-flex gap-2">
            {["all", "pending", "confirmed", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  filter === f ? "bg-amber-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 text-lg">No bookings found</p>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div key={booking.ID} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{booking.Name}</h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {booking.ID} • {new Date(booking.Timestamp).toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.Status === "Pending" ? "bg-amber-100 text-amber-700" :
                      booking.Status === "Confirmed" ? "bg-green-100 text-green-700" :
                      booking.Status === "Completed" ? "bg-slate-100 text-slate-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {booking.Status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{booking.Email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{booking.Phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{booking.Location}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Project Type</p>
                      <p className="text-sm font-medium text-slate-900">{booking["Project Type"]}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Area Size</p>
                      <p className="text-sm font-medium text-slate-900">{booking["Area Size"]}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Budget</p>
                      <p className="text-sm font-medium text-slate-900">{booking.Budget}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mb-4 p-4 bg-amber-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-medium">{booking["Appointment Date"]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-medium">{booking["Appointment Time"]}</span>
                    </div>
                  </div>
                  {booking.Message && (
                    <div className="mb-4 p-4 bg-slate-50 rounded-lg">
                      <p className="text-xs font-medium text-slate-500 mb-1">Message:</p>
                      <p className="text-sm text-slate-700">{booking.Message}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
                    {booking.Status === "Pending" && (
                      <Button onClick={() => updateStatus(booking.ID, "Confirmed")} size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Confirm
                      </Button>
                    )}
                    {booking.Status === "Confirmed" && (
                      <Button onClick={() => updateStatus(booking.ID, "Completed")} size="sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Complete
                      </Button>
                    )}
                    {booking.Status !== "Cancelled" && (
                      <Button onClick={() => updateStatus(booking.ID, "Cancelled")} variant="outline" size="sm" className="text-red-600">
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}


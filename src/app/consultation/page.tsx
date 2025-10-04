"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { BookingFormData } from "@/types";

const steps = [
  { id: 1, name: "Personal Info" },
  { id: 2, name: "Project Details" },
  { id: 3, name: "Schedule" },
  { id: 4, name: "Confirmation" },
];

const projectTypes = [
  { value: "residential-full", label: "Residential - Full Home" },
  { value: "residential-room", label: "Residential - Single Room" },
  { value: "commercial-office", label: "Commercial - Office" },
  { value: "commercial-retail", label: "Commercial - Retail" },
  { value: "commercial-hospitality", label: "Commercial - Hospitality" },
];

const areaSizes = [
  { value: "0-500", label: "Less than 500 sq ft" },
  { value: "500-1000", label: "500 - 1,000 sq ft" },
  { value: "1000-2000", label: "1,000 - 2,000 sq ft" },
  { value: "2000-5000", label: "2,000 - 5,000 sq ft" },
  { value: "5000+", label: "5,000+ sq ft" },
];

const budgetRanges = [
  { value: "0-5", label: "Under ₹5 Lakhs" },
  { value: "5-10", label: "₹5 - 10 Lakhs" },
  { value: "10-25", label: "₹10 - 25 Lakhs" },
  { value: "25-50", label: "₹25 - 50 Lakhs" },
  { value: "50+", label: "₹50 Lakhs+" },
];

export default function ConsultationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    projectType: "",
    areaSize: "",
    budget: "",
    appointmentDate: "",
    appointmentTime: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone is required";
      if (!formData.location.trim()) newErrors.location = "Location is required";
    } else if (step === 2) {
      if (!formData.projectType) newErrors.projectType = "Project type is required";
      if (!formData.areaSize) newErrors.areaSize = "Area size is required";
      if (!formData.budget) newErrors.budget = "Budget range is required";
    } else if (step === 3) {
      if (!formData.appointmentDate)
        newErrors.appointmentDate = "Appointment date is required";
      if (!formData.appointmentTime)
        newErrors.appointmentTime = "Appointment time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (validateStep(3)) {
      try {
        // Submit to API to save in Excel
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          console.log("Booking saved:", data.bookingId);
          setIsSubmitted(true);
          setCurrentStep(4);
        } else {
          console.error("Failed to save booking");
          alert("Failed to submit booking. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting booking:", error);
        alert("Failed to submit booking. Please try again.");
      }
    }
  };

  const updateFormData = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="pt-24 lg:pt-32 min-h-screen bg-slate-50">
      <Container>
        <div className="py-16">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-4">
              Book Your Consultation
            </h1>
            <p className="text-lg text-slate-600">
              Let&apos;s discuss your project and bring your vision to life
            </p>
          </div>

          {/* Progress Steps */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                        currentStep > step.id
                          ? "bg-green-500 text-white"
                          : currentStep === step.id
                          ? "bg-amber-600 text-white scale-110"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <div
                      className={`mt-2 text-sm font-medium ${
                        currentStep >= step.id ? "text-slate-900" : "text-slate-400"
                      }`}
                    >
                      {step.name}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                        currentStep > step.id ? "bg-green-500" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Personal Information
                  </h2>

                  <Input
                    label="Full Name *"
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    error={errors.name}
                    placeholder="John Doe"
                  />

                  <Input
                    label="Email Address *"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    error={errors.email}
                    placeholder="john@example.com"
                  />

                  <Input
                    label="Phone Number *"
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    error={errors.phone}
                    placeholder="+91 98765 43210"
                  />

                  <Input
                    label="Location *"
                    id="location"
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                    error={errors.location}
                    placeholder="Mumbai, Maharashtra"
                  />
                </motion.div>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Project Details
                  </h2>

                  <Select
                    label="Project Type *"
                    id="projectType"
                    options={projectTypes}
                    value={formData.projectType}
                    onChange={(e) => updateFormData("projectType", e.target.value)}
                    error={errors.projectType}
                  />

                  <Select
                    label="Area Size *"
                    id="areaSize"
                    options={areaSizes}
                    value={formData.areaSize}
                    onChange={(e) => updateFormData("areaSize", e.target.value)}
                    error={errors.areaSize}
                  />

                  <Select
                    label="Budget Range *"
                    id="budget"
                    options={budgetRanges}
                    value={formData.budget}
                    onChange={(e) => updateFormData("budget", e.target.value)}
                    error={errors.budget}
                  />

                  <Textarea
                    label="Additional Information (Optional)"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => updateFormData("message", e.target.value)}
                    placeholder="Tell us more about your project vision, style preferences, or any specific requirements..."
                  />
                </motion.div>
              )}

              {/* Step 3: Schedule */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Schedule Your Consultation
                  </h2>

                  <Input
                    label="Preferred Date *"
                    id="appointmentDate"
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) =>
                      updateFormData("appointmentDate", e.target.value)
                    }
                    error={errors.appointmentDate}
                    min={new Date().toISOString().split("T")[0]}
                  />

                  <Select
                    label="Preferred Time *"
                    id="appointmentTime"
                    options={[
                      { value: "09:00", label: "9:00 AM" },
                      { value: "10:00", label: "10:00 AM" },
                      { value: "11:00", label: "11:00 AM" },
                      { value: "12:00", label: "12:00 PM" },
                      { value: "14:00", label: "2:00 PM" },
                      { value: "15:00", label: "3:00 PM" },
                      { value: "16:00", label: "4:00 PM" },
                      { value: "17:00", label: "5:00 PM" },
                    ]}
                    value={formData.appointmentTime}
                    onChange={(e) =>
                      updateFormData("appointmentTime", e.target.value)
                    }
                    error={errors.appointmentTime}
                  />

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-slate-700">
                      <strong>Note:</strong> This is a preferred time slot. Our team
                      will confirm the exact time via email or phone within 24 hours.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && isSubmitted && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-white" />
                  </div>

                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Thank You!
                  </h2>

                  <p className="text-lg text-slate-600 mb-8">
                    Your consultation request has been received. We&apos;ll contact you
                    within 24 hours to confirm your appointment.
                  </p>

                  <div className="bg-slate-50 rounded-lg p-6 mb-8 text-left">
                    <h3 className="font-bold text-slate-900 mb-4">
                      Booking Summary:
                    </h3>
                    <div className="space-y-2 text-slate-700">
                      <p>
                        <strong>Name:</strong> {formData.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {formData.email}
                      </p>
                      <p>
                        <strong>Date:</strong> {formData.appointmentDate}
                      </p>
                      <p>
                        <strong>Time:</strong> {formData.appointmentTime}
                      </p>
                    </div>
                  </div>

                  <Button onClick={() => (window.location.href = "/")} size="lg">
                    Back to Home
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <div className="flex justify-between mt-8 pt-8 border-t border-slate-200">
                {currentStep > 1 ? (
                  <Button onClick={handleBack} variant="outline">
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <Button onClick={handleNext}>Next Step</Button>
                ) : (
                  <Button onClick={handleSubmit}>Submit Request</Button>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}


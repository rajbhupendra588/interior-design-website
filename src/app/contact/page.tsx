"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

const locations = [
  {
    name: "Mumbai Office",
    address: "Bandra West, Mumbai, Maharashtra 400050",
    phone: "+91 98765 43210",
    email: "mumbai@luxeinteriors.in",
  },
  {
    name: "Bangalore Studio",
    address: "Indiranagar, Bangalore, Karnataka 560038",
    phone: "+91 98765 43211",
    email: "bangalore@luxeinteriors.in",
  },
];

const offices = [
  { value: "mumbai", label: "Mumbai Office" },
  { value: "bangalore", label: "Bangalore Studio" },
  { value: "other", label: "Other Location" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    office: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with email service
    console.log("Contact form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        office: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-slate-900">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 leading-relaxed">
              Have a project in mind? We&apos;d love to hear from you. Reach out to
              discuss your interior design needs and let&apos;s create something
              extraordinary together.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">
                Contact Information
              </h2>

              <div className="space-y-8">
                {/* General Contact */}
                <div>
                  <h3 className="font-bold text-slate-900 mb-4">
                    General Inquiries
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="tel:+919876543210"
                      className="flex items-center space-x-3 text-slate-600 hover:text-amber-600 transition-colors duration-200"
                    >
                      <Phone className="w-5 h-5" />
                      <span>+91 98765 43210</span>
                    </a>
                    <a
                      href="mailto:info@luxeinteriors.in"
                      className="flex items-center space-x-3 text-slate-600 hover:text-amber-600 transition-colors duration-200"
                    >
                      <Mail className="w-5 h-5" />
                      <span>info@luxeinteriors.in</span>
                    </a>
                  </div>
                </div>

                {/* Office Hours */}
                <div>
                  <h3 className="font-bold text-slate-900 mb-4">
                    Office Hours
                  </h3>
                  <div className="flex items-start space-x-3 text-slate-600">
                    <Clock className="w-5 h-5 mt-1" />
                    <div>
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                {/* Locations */}
                <div>
                  <h3 className="font-bold text-slate-900 mb-4">
                    Our Locations
                  </h3>
                  <div className="space-y-6">
                    {locations.map((location) => (
                      <div
                        key={location.name}
                        className="p-6 bg-slate-50 rounded-xl"
                      >
                        <h4 className="font-bold text-slate-900 mb-3">
                          {location.name}
                        </h4>
                        <div className="space-y-2 text-sm text-slate-600">
                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                            <span>{location.address}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>{location.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span>{location.email}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Send Us a Message
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-slate-600">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      label="Your Name *"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      placeholder="John Doe"
                    />

                    <Input
                      label="Email Address *"
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      placeholder="john@example.com"
                    />

                    <Input
                      label="Phone Number"
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+91 98765 43210"
                    />

                    <Select
                      label="Preferred Office"
                      id="office"
                      options={offices}
                      value={formData.office}
                      onChange={(e) =>
                        setFormData({ ...formData, office: e.target.value })
                      }
                    />

                    <Input
                      label="Subject *"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                      placeholder="Project inquiry"
                    />

                    <Textarea
                      label="Message *"
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      placeholder="Tell us about your project..."
                    />

                    <Button type="submit" size="lg" className="w-full">
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8 text-center">
            Visit Our Studio
          </h2>
          <div className="aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0!2d72.8!3d19.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAwJzAwLjAiTiA3MsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="LuxeInteriors Location"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}


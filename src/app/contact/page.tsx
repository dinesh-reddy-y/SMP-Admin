"use client";

import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <LandingHeader />

      <main className="flex-grow">
        {/* Hero Section */}

        {/* Full-width Contact Form Section */}
        <section className="py-8 w-full">
          <div className="px-6 mx-auto max-w-4xl flex flex-col gap-8">
            <h2 className="text-4xl font-bold text-center mb-4">Get In Touch</h2>
            <p className="text-center text-muted-foreground mb-8">
              Send us a message and we’ll respond as soon as possible.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 w-full"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full p-4 border border-gray-300 rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />

              <div className="flex justify-center">
                <Button type="submit" size="lg" className="px-8 py-6 text-base">
                  Send Message
                </Button>
              </div>
            </form>

            {/* Optional Info Section */}
            <div className="text-center text-muted-foreground mt-8">
              <p>Email: contact@shipmypack.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

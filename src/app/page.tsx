"use client";

import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRight, Star, ShieldCheck, Zap, Users, BarChart } from "lucide-react";
import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";

// Hero Section Component
const HeroSection: React.FC = () => {
  return (
    <section className="bg-background pt-24 pb-32 shadow-lg">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          The Future of Logistics Management
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl leading-relaxed">
          An integrated platform to streamline your shipping operations, from real-time package
          tracking to comprehensive user management. ShipMypack provides the control you need and
          the efficiency you demand.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="px-8 py-6 text-base">
            <Link href="/login">
              Access The Dashboard
              <MoveRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Features Section
const features = [
  {
    icon: Zap,
    name: "Real-Time Tracking",
    description:
      "Empower your team with live updates, predictive ETAs, and complete visibility on every shipment from origin to destination.",
  },
  {
    icon: Users,
    name: "Unified User Management",
    description:
      "Seamlessly manage administrators, clients, and transporters with granular, role-based permissions for enhanced security.",
  },
  {
    icon: BarChart,
    name: "Advanced Analytics",
    description:
      "Leverage our powerful analytics suite to gain actionable insights into shipping performance and identify optimization opportunities.",
  },
  {
    icon: ShieldCheck,
    name: "Client App Control",
    description:
      "Dynamically manage advertisements, promotional content, and user-facing features directly from your central admin panel.",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-foreground tracking-tighter">
            A Control Center for Your Entire Operation
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            ShipMypack provides a comprehensive suite of enterprise-grade tools designed to help you
            run your shipping business more effectively and with greater precision.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="p-8 border bg-background rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="bg-primary/10 text-primary p-3 rounded-lg w-max mb-5">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.name}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-foreground tracking-tighter">
            Trusted by Industry-Leading Logistics Professionals
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Discover why top-tier companies rely on ShipMypack to power their logistics and enhance
            customer satisfaction.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-secondary/50 p-8 rounded-2xl">
            <div className="flex text-yellow-400 mb-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
            </div>
            <p className="text-foreground/90 mb-6 font-medium text-lg leading-relaxed">
              "The transition to ShipMypack was seamless. Their real-time tracking has become an
              indispensable tool for our operations, significantly boosting customer trust."
            </p>
            <div className="mt-auto">
              <div className="font-semibold text-foreground">Sarah Johnson</div>
              <div className="text-sm text-muted-foreground">
                Operations Manager, QuickBox Logistics
              </div>
            </div>
          </div>
          <div className="bg-secondary/50 p-8 rounded-2xl">
            <div className="flex text-yellow-400 mb-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
            </div>
            <p className="text-foreground/90 mb-6 font-medium text-lg leading-relaxed">
              "The analytics dashboard is a game-changer. We've optimized routes and improved our
              delivery efficiency by over 30% since implementing the platform."
            </p>
            <div className="mt-auto">
              <div className="font-semibold text-foreground">David Chen</div>
              <div className="text-sm text-muted-foreground">CEO, Apex Freight</div>
            </div>
          </div>
          <div className="bg-secondary/50 p-8 rounded-2xl">
            <div className="flex text-yellow-400 mb-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
            </div>
            <p className="text-foreground/90 mb-6 font-medium text-lg leading-relaxed">
              "Managing our client-facing app content through the admin panel is incredibly
              intuitive. It saves our marketing team hours every week."
            </p>
            <div className="mt-auto">
              <div className="font-semibold text-foreground">Maria Garcia</div>
              <div className="text-sm text-muted-foreground">Director of IT, Garcia Couriers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection: React.FC = () => {
  return (
    <section className="bg-background py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="relative bg-primary text-primary-foreground p-12 lg:p-20 rounded-2xl overflow-hidden text-center">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full opacity-50"></div>
          <div className="absolute -bottom-16 -left-10 w-40 h-40 bg-white/10 rounded-full opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold tracking-tighter">
              Ready to Transform Your Shipping Operations?
            </h2>
            <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
              Join thousands of businesses who are building more efficient, reliable, and scalable
              logistics systems with ShipMypack. Get started in minutes.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary" className="px-8 py-6 text-base">
                <Link href="/login">Access Your Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Page with ThemeProvider
export default function LandingPage() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="bg-background text-foreground">
        <LandingHeader />
        <main>
          <HeroSection />
          <FeaturesSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <LandingFooter />

        {/* Floating Theme Toggle */}
        {/* <div className="fixed bottom-6 right-6 z-50">
          <ThemeToggle />
        </div> */}
      </div>
    </ThemeProvider>
  );
}

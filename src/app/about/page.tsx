import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";

// About Us Section
const AboutSection: React.FC = () => {
    return (
        <section id="about" className="py-20 lg:py-32 bg-secondary/50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-foreground tracking-tighter">About ShipMypack</h2>
                    <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                        ShipMypack was founded with a simple mission: to empower logistics businesses with a single, powerful, and intuitive platform. We believe that managing shipments, clients, and operations shouldn't be complicated. Our team is dedicated to building tools that are not only efficient and reliable but also a pleasure to use, helping you focus on what truly matters—growing your business.
                    </p>
                </div>
            </div>
        </section>
    );
};


// Main About Page Component
export default function AboutPage() {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-grow">
        <AboutSection />
      </main>
      <LandingFooter />
    </div>
  );
}

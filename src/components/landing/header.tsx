
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import logo from "@/app/assets/logo.png";

export const LandingHeader: React.FC = () => {
  return (
    <header className="bg-background">
      <div className="container mx-auto px-6 flex h-24 items-center justify-between border-b">
        <Link href="/" className="flex items-center space-x-3">
            {/* 
              To replace this logo icon, change the src attribute to the path of your logo file.
              For example: src="/logo-icon.png"
            */}
            <Image 
              src={logo}
              alt="ShipMypack Logo Icon"
              width={40}
              height={40}
              className="object-contain rounded-md dark:bg-white"
              data-ai-hint="logo icon"
            />
            <span className="text-xl font-bold text-foreground">ShipMypack</span>
        </Link>
        <nav className="flex items-center space-x-6">
            <ThemeToggle />
            <Button asChild variant="link" className="text-muted-foreground">
              <Link href="/about">About</Link>
            </Button>
            <Button asChild variant="link" className="text-muted-foreground">
              <Link href="/contact">Contact</Link>
            </Button>
            <Button asChild variant="ghost" className="text-muted-foreground">
              <Link href="/login">
                Admin Login
                <MoveRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
        </nav>
      </div>
    </header>
  );
};

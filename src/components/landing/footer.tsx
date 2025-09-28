
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/logo.png";

export const LandingFooter: React.FC = () => {
  return (
      <footer className="bg-secondary/50 py-5">
          <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                 <div className="flex items-center space-x-3">
                    <Image 
                      src={logo}
                      alt="ShipMypack Logo Icon"
                      width={32}
                      height={32}
                      className="object-contain rounded-md dark:bg-white"
                      data-ai-hint="logo icon"
                    />
                    <span className="font-semibold text-foreground">ShipMypack</span>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} ShipMypack Inc. All rights reserved.</p>
                </div>
              </div>
          </div>
      </footer>
  );
};

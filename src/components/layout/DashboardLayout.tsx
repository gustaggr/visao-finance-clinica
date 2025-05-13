
import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Mobile menu toggle */}
      <div className="fixed top-0 left-0 z-40 md:hidden p-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
      
      {/* Responsive sidebar */}
      <div 
        className={`${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:relative md:translate-x-0 z-30 transition-transform duration-200 ease-in-out`}
      >
        <Sidebar closeMobileMenu={() => setMobileMenuOpen(false)} />
      </div>
      
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto container">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

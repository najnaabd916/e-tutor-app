import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/language-tuition", label: "Language Tuition" },
    { href: "/school-tuition", label: "School Tuition" },
    { href: "/group-classes", label: "Group Classes" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border dark:bg-slate-950 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">e</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">
              eTutor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <Link
            to="/signup"
            className="hidden md:flex items-center justify-center px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary-600 transition-colors"
          >
            Get Started
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border dark:border-slate-800 py-4">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="mx-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary-600 transition-colors block text-center"
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

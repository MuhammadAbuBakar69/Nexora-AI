"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Sparkles, Layers, Cpu, Shield, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Platform", href: "/platform" },
    { label: "Solutions", href: "/solutions" },
    { label: "Developers", href: "/developers" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", href: "/resources" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 sm:px-6 lg:px-8",
        isScrolled
          ? "bg-white/85 backdrop-blur-md border-b border-border shadow-subtle py-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <img
              src="/logo.png"
              alt="NEXORA Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-heritage text-2xl font-bold tracking-tight text-[#111111]">
            NEXORA
          </span>
          <Badge variant="violet" size="sm" className="hidden sm:inline-flex">
            Gateway
          </Badge>
        </Link>

        {/* Center: Nav items */}
        <nav className="hidden md:flex items-center gap-1 bg-surface/90 backdrop-blur-sm border border-border px-3.5 py-1.5 rounded-full shadow-subtle">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-bold text-[#444452] hover:text-[#111111] px-4 py-1.5 rounded-full hover:bg-white hover:shadow-subtle transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-xs font-bold text-[#444452] hover:text-[#111111]">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="violet" size="sm" className="text-xs font-bold gap-1.5 shadow-md">
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="text-xs font-bold border-violet-soft/60 text-violet-primary bg-violet-light/40 hover:bg-violet-light">
              Console
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="text-xs px-2.5 py-1 h-7 text-violet-primary">
              App
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-secondary hover:text-foreground hover:bg-surface border border-border transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 bg-white/95 backdrop-blur-xl border border-border rounded-2xl shadow-float animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col space-y-1.5 pb-4 border-b border-border">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-foreground hover:bg-surface rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-violet-primary bg-violet-light/50 rounded-xl"
            >
              Admin Portal
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-3">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full text-xs">
                Sign In
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
              <Button size="sm" className="w-full text-xs">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

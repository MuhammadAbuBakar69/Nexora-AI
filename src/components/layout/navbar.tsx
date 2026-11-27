"use client";

import React, { useState, useEffect } from "react";
import { asset } from "@/lib/asset";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
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
    <header className="fixed top-0 left-0 right-0 z-50 select-none font-sans">
      {/* Top CAD Telemetry Ticker (Hidden when scrolled) */}
      {!isScrolled && (
        <div className="hidden lg:flex items-center justify-between px-8 py-1.5 bg-[#F2F2EE] border-b border-[#E2E2DA] text-[10px] font-mono uppercase tracking-widest text-[#777783]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>ANYCAST EDGE ROUTER v2.4 // NODE: US-WEST-01</span>
          </div>
          <div className="flex items-center gap-6">
            <span>SCALE: 1:1 • TOLERANCE: ±0.082MS</span>
            <span className="text-[#111111] font-bold">STATUS: 99.99% UPSTREAM MESH</span>
          </div>
        </div>
      )}

      {/* Main Grid Navigation Bar */}
      <div
        className={cn(
          "w-full transition-all duration-200 border-b border-[#E2E2DA]",
          isScrolled
            ? "bg-[#F6F6F3]/95 backdrop-blur-md py-2.5 shadow-xs"
            : "bg-[#F6F6F3] py-3.5"
        )}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand Identity */}
          <Link href="/" className="flex items-center group py-0.5">
            <img
              src={asset("/logo-full.png")}
              alt="nexora AI"
              className="h-9 sm:h-10 md:h-11 w-auto object-contain hover:opacity-95 transition-opacity"
            />
          </Link>

          {/* Center: CAD Grid Nav Links */}
          <nav className="hidden md:flex items-center border border-[#E2E2DA] bg-white divide-x divide-[#E2E2DA]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
                    isActive
                      ? "bg-[#F2F2EE] text-[#111111]"
                      : "text-[#555562] hover:text-[#111111] hover:bg-[#F9F9F7]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              href="/login"
              variant="ghost"
              size="sm"
              className="text-xs font-bold uppercase tracking-wider text-[#555562] hover:text-[#111111] h-9"
            >
              Sign In
            </Button>
            <Button
              href="/signup"
              size="sm"
              className="text-xs font-bold uppercase tracking-wider gap-1.5 h-9 px-4"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
            <Button
              href="/dashboard"
              variant="outline"
              size="sm"
              className="text-xs font-bold uppercase tracking-wider border-[#E2E2DA] bg-white hover:bg-[#F2F2EE] h-9 text-[#FF5722]"
            >
              Console
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              href="/dashboard"
              variant="outline"
              size="sm"
              className="text-xs px-2.5 py-1 h-7 text-[#FF5722] border-[#E2E2DA]"
            >
              Console
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 bg-white border border-[#E2E2DA] text-[#111111]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F6F6F3] border-b border-[#E2E2DA] p-4 space-y-3">
          <div className="flex flex-col border border-[#E2E2DA] divide-y divide-[#E2E2DA] bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-xs font-bold uppercase text-[#111111]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 text-xs font-bold uppercase text-[#FF5722] bg-[#FF5722]/10"
            >
              Admin Console
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button
              href="/login"
              variant="outline"
              size="sm"
              className="w-full text-xs font-bold border-[#E2E2DA]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Button>
            <Button
              href="/signup"
              size="sm"
              className="w-full text-xs font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

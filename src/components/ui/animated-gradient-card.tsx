"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedGradientCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  isFeatured?: boolean;
  intensity?: "subtle" | "vibrant" | "glow";
  enableTilt?: boolean;
  showCrosshairs?: boolean;
  onClick?: () => void;
}

/**
 * Architectural CAD Card with Crisp Minimalist Styling & Clean Hover Effect
 * Pure solid white background (#FFFFFF), crisp hairline border (#E2E2DA),
 * CAD precision corner crosshairs (+), and smooth spring hover lift.
 * Completely free of imperfect gradients and colored washes.
 */
export function AnimatedGradientCard({
  children,
  className = "",
  containerClassName = "",
  isFeatured = false,
  showCrosshairs = true,
  onClick,
}: AnimatedGradientCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`relative group bg-white border ${
        isFeatured
          ? "border-[#111111] ring-1 ring-[#111111] shadow-xs"
          : "border-[#E2E2DA] hover:border-[#111111] hover:shadow-md"
      } transition-all duration-200 select-none overflow-hidden ${containerClassName}`}
    >
      {/* 4 CAD Precision Corner Crosshairs */}
      {showCrosshairs && (
        <>
          <span className="absolute top-2 left-2.5 font-mono text-xs text-[#888892] group-hover:text-[#111111] transition-colors duration-200 select-none z-20">
            +
          </span>
          <span className="absolute top-2 right-2.5 font-mono text-xs text-[#888892] group-hover:text-[#111111] transition-colors duration-200 select-none z-20">
            +
          </span>
          <span className="absolute bottom-2 left-2.5 font-mono text-xs text-[#888892] group-hover:text-[#111111] transition-colors duration-200 select-none z-20">
            +
          </span>
          <span className="absolute bottom-2 right-2.5 font-mono text-xs text-[#888892] group-hover:text-[#111111] transition-colors duration-200 select-none z-20">
            +
          </span>
        </>
      )}

      {/* Card Content Body */}
      <div className={`relative z-10 w-full h-full ${className}`}>
        {children}
      </div>
    </motion.div>
  );
}

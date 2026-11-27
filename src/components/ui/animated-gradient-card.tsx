"use client";

import React, { useState, useRef } from "react";
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
 * Animated Gradient Card
 * Features:
 * - Continuous flowing animated sunset gradient border (via multi-stop linear/conic mesh)
 * - Interactive cursor-follow sunset spotlight with spring coordinates
 * - Ambient subtle indigo to dark mesh glow on hover
 * - CAD architectural corner crosshairs (+) that highlight on hover
 * - Smooth GPU-accelerated lift & drop shadow
 */
export function AnimatedGradientCard({
  children,
  className = "",
  containerClassName = "",
  isFeatured = false,
  intensity = "subtle",
  enableTilt = false,
  showCrosshairs = true,
  onClick,
}: AnimatedGradientCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: xPct, y: yPct, isHovered: true });
  };

  const handleMouseEnter = () => {
    setMousePos((prev) => ({ ...prev, isHovered: true }));
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  const spotlightOpacity = {
    subtle: mousePos.isHovered ? 0.16 : 0,
    vibrant: mousePos.isHovered ? 0.28 : isFeatured ? 0.12 : 0,
    glow: mousePos.isHovered ? 0.35 : isFeatured ? 0.18 : 0,
  }[intensity];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ y: -5, scale: 1.008 }}
      transition={{ type: "spring", stiffness: 350, damping: 26 }}
      className={`relative group rounded-none select-none transition-shadow duration-500 ${
        isFeatured
          ? "shadow-[0_12px_36px_-10px_rgba(17,17,17,0.14)]"
          : "hover:shadow-[0_12px_32px_-12px_rgba(17,17,17,0.10)]"
      } ${containerClassName}`}
    >
      {/* 1. CONTINUOUS ANIMATED GRADIENT BORDER FRAME */}
      <div
        className={`absolute -inset-[1px] rounded-none transition-opacity duration-500 pointer-events-none ${
          isFeatured
            ? "opacity-100"
            : "opacity-40 group-hover:opacity-100"
        }`}
        style={{
          background: isFeatured
            ? "linear-gradient(135deg, #111111 0%, #4F46E5 50%, #7C3AED 100%)"
            : "linear-gradient(135deg, #111111 0%, #6366F1 50%, #E2E2DA 100%)",
          backgroundSize: "200% 200%",
          animation: "cardGradientFlow 6s ease infinite",
        }}
      />

      {/* 2. AMBIENT GLOWING RADIAL AURA (BEHIND CARD ON HOVER) */}
      <div
        className={`absolute -inset-2 rounded-none filter blur-xl transition-opacity duration-700 pointer-events-none ${
          isFeatured
            ? "opacity-20 group-hover:opacity-35"
            : "opacity-0 group-hover:opacity-20"
        }`}
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(79,70,229,0.18) 0%, rgba(124,58,237,0.08) 50%, transparent 80%)",
        }}
      />

      {/* 3. CARD BODY WITH CRISP CAD BACKGROUND */}
      <div
        className={`relative z-10 w-full h-full bg-[#FFFFFF]/98 backdrop-blur-xs border border-[#E2E2DA]/60 transition-colors duration-300 overflow-hidden ${
          isFeatured ? "bg-white" : "group-hover:border-transparent"
        } ${className}`}
      >
        {/* Dynamic Cursor-Tracking Ambient Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            opacity: spotlightOpacity,
            background: `radial-gradient(380px circle at ${mousePos.x}% ${mousePos.y}%, rgba(99, 102, 241, 0.12) 0%, rgba(124, 58, 237, 0.05) 40%, transparent 75%)`,
          }}
        />

        {/* Sleek Specular Light Shimmer Sweep on Hover */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          <div
            className="w-1/2 h-[200%] absolute -top-1/2 -left-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform rotate-25 transition-transform duration-1000 ease-out group-hover:translate-x-[400%]"
          />
        </div>

        {/* 4 CAD Precision Corner Crosshairs */}
        {showCrosshairs && (
          <>
            <span className="absolute top-2 left-2.5 font-mono text-xs text-[#888892] group-hover:text-[#111111] transition-colors duration-300 select-none z-30">
              +
            </span>
            <span className="absolute top-2 right-2.5 font-mono text-xs text-[#888892] group-hover:text-[#111111] transition-colors duration-300 select-none z-30">
              +
            </span>
            <span className="absolute bottom-2 left-2.5 font-mono text-xs text-[#888892] group-hover:text-[#111111] transition-colors duration-300 select-none z-30">
              +
            </span>
            <span className="absolute bottom-2 right-2.5 font-mono text-xs text-[#888892] group-hover:text-[#111111] transition-colors duration-300 select-none z-30">
              +
            </span>
          </>
        )}

        {/* Card Content */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

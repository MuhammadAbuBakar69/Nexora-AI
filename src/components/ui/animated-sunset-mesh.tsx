"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedSunsetMeshProps {
  className?: string;
  intensity?: "vibrant" | "subtle" | "ambient";
  showGridOverlay?: boolean;
}

export function AnimatedSunsetMesh({
  className,
  intensity = "vibrant",
  showGridOverlay = false,
}: AnimatedSunsetMeshProps) {
  // Opacity adjustments based on intensity mode
  const opacityClass =
    intensity === "vibrant"
      ? "opacity-90 sm:opacity-95"
      : intensity === "subtle"
      ? "opacity-50 sm:opacity-60"
      : "opacity-30 sm:opacity-40";

  return (
    <div
      style={{ contentVisibility: "auto", contain: "paint layout" }}
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none select-none z-0",
        className
      )}
    >
      {/* Warm Ambient Apricot Base Fill */}
      <div className="absolute inset-0 bg-[#FFF5ED]/70 mix-blend-multiply" />

      {/* Layered Animated Sunset Orbs matching user's image */}
      <div className={cn("absolute inset-0 filter blur-[75px] sm:blur-[110px] transform-gpu will-change-transform", opacityClass)}>
        {/* Orb 1: Deep Crimson & Ruby Ember (Top Left Sweep) */}
        <div
          className="absolute -top-[15%] -left-[10%] w-[55%] h-[65%] rounded-[42%_58%_70%_30%/45%_45%_55%_55%] animate-mesh-1"
          style={{
            background: "radial-gradient(circle at 35% 35%, #C22B2B 0%, #D93829 45%, #FF5722 80%, transparent 100%)",
          }}
        />

        {/* Orb 2: Vibrant Sunset Coral Flame (Center Dynamic Sweep) */}
        <div
          className="absolute top-[10%] left-[15%] w-[70%] h-[75%] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-mesh-2"
          style={{
            background: "radial-gradient(circle at 50% 50%, #FF5722 0%, #FF6B4A 40%, #FA4D26 70%, transparent 100%)",
          }}
        />

        {/* Orb 3: Radiant Golden Amber & Warm Honey (Right & Bottom Right) */}
        <div
          className="absolute -top-[5%] -right-[15%] w-[65%] h-[80%] rounded-[50%_50%_60%_40%/40%_60%_50%_50%] animate-mesh-3"
          style={{
            background: "radial-gradient(circle at 60% 40%, #FFA726 0%, #FF9800 45%, #FFB049 75%, transparent 100%)",
          }}
        />

        {/* Orb 4: Warm Tangerine Horizon Glow (Bottom Center) */}
        <div
          className="absolute -bottom-[20%] left-[10%] w-[80%] h-[55%] rounded-[40%_60%_70%_30%/40%_40%_60%_60%] animate-mesh-1"
          style={{
            background: "radial-gradient(ellipse at 50% 60%, #FF6B4A 0%, #FFA726 50%, #FFE0CC 85%, transparent 100%)",
          }}
        />
      </div>

      {/* Optional Seamless Soft Edge Vignette into CAD background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F6F6F3]/85" />

      {/* Optional CAD Millimeter Graph Paper Texture Overlay */}
      {showGridOverlay && (
        <div
          className="absolute inset-0 opacity-40 mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(#111111 1px, transparent 1px), radial-gradient(#111111 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 12px 12px",
          }}
        />
      )}
    </div>
  );
}

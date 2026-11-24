"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Animated Ethereal Waveform Ribbon
 * Inspired by the signature Sonivale waveform winding behind the floating hero dashboard.
 */
export function HeroWaveform() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[500px] pointer-events-none -z-10 overflow-hidden select-none opacity-85">
      {/* Ambient background soft glow circles */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-gradient-to-r from-violet-primary/15 via-violet-soft/20 to-transparent blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[280px] bg-gradient-to-l from-blue-soft/20 via-violet-soft/15 to-transparent blur-3xl rounded-full" />

      {/* Animated SVG Wave Ribbon */}
      <motion.svg
        viewBox="0 0 1440 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full animate-wave-flow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <defs>
          <linearGradient id="waveVioletGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7557FF" stopOpacity="0.05" />
            <stop offset="25%" stopColor="#7557FF" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#B4A3FF" stopOpacity="0.65" />
            <stop offset="75%" stopColor="#A5B4FC" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#7557FF" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="waveBlueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.02" />
            <stop offset="30%" stopColor="#818CF8" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#C084FC" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Primary Flowing Sine Wave Curve */}
        <path
          d="M -100 200 C 200 80, 450 320, 720 200 C 990 80, 1240 310, 1540 200"
          stroke="url(#waveVioletGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Secondary Harmonious Wave Curve */}
        <path
          d="M -100 215 C 220 95, 470 335, 740 215 C 1010 95, 1260 325, 1540 215"
          stroke="url(#waveBlueGrad)"
          strokeWidth="1.8"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />

        {/* Tertiary Fine Wave Curve */}
        <path
          d="M -100 185 C 180 65, 430 305, 700 185 C 970 65, 1220 295, 1540 185"
          stroke="url(#waveVioletGrad)"
          strokeWidth="1.2"
          strokeDasharray="8 8"
          strokeLinecap="round"
        />

        {/* Neural Network Nodes on Waveform Troughs & Peaks */}
        {[
          { cx: 320, cy: 155, r: 4 },
          { cx: 580, cy: 265, r: 3.5 },
          { cx: 720, cy: 200, r: 5 },
          { cx: 860, cy: 135, r: 3.5 },
          { cx: 1120, cy: 260, r: 4.5 },
        ].map((pt, i) => (
          <g key={i}>
            <circle cx={pt.cx} cy={pt.cy} r={pt.r * 2.5} fill="#B4A3FF" fillOpacity="0.25" />
            <circle cx={pt.cx} cy={pt.cy} r={pt.r} fill="#7557FF" />
            <circle cx={pt.cx} cy={pt.cy} r={pt.r * 0.4} fill="#FFFFFF" />
          </g>
        ))}
      </motion.svg>
    </div>
  );
}

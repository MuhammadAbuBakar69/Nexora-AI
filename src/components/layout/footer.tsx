"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ExternalLink, ShieldCheck } from "lucide-react";
import { AnimatedSunsetMesh } from "@/components/ui/animated-sunset-mesh";

/**
 * Isometric 3D "N" Wireframe Emblem
 * Axonometric architectural projection matching the 3D isometric block in the reference.
 */
function IsometricWireframeN() {
  return (
    <div className="relative flex flex-col items-center justify-center p-6 h-full w-full select-none overflow-hidden">
      {/* Subtle Ambient Glowing Sunset Orange Radial Aura */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 filter blur-2xl"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255, 87, 34, 0.35) 0%, rgba(255, 167, 38, 0.20) 45%, transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 170 190"
        className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 drop-shadow-[0_12px_24px_rgba(255,87,34,0.08)] relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle CAD axes guides */}
        <line x1="20" y1="95" x2="150" y2="95" stroke="#E2E2DA" strokeDasharray="3 3" strokeWidth="1" />
        <line x1="85" y1="20" x2="85" y2="170" stroke="#E2E2DA" strokeDasharray="3 3" strokeWidth="1" />
        <circle cx="85" cy="95" r="45" stroke="#EAEAE2" strokeDasharray="2 3" strokeWidth="0.8" />

        {/* --- LEFT PILLAR --- */}
        {/* Left face */}
        <polygon
          points="68,26 50,36 50,132 68,122"
          fill="#FFFFFF"
          stroke="#111111"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Front face */}
        <polygon
          points="50,36 68,46 68,142 50,132"
          fill="#F7F7F5"
          stroke="#111111"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Top face */}
        <polygon
          points="68,26 86,36 68,46 50,36"
          fill="#FFFFFF"
          stroke="#111111"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* --- DIAGONAL CROSSBAR --- */}
        {/* Front face of diagonal connecting top-left to bottom-right */}
        <polygon
          points="68,46 68,74 104,144 104,116"
          fill="#EFEFEA"
          stroke="#111111"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Top face of diagonal */}
        <polygon
          points="86,36 68,46 104,116 122,106"
          fill="#FFFFFF"
          stroke="#111111"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* --- RIGHT PILLAR --- */}
        {/* Front face */}
        <polygon
          points="104,66 122,76 122,172 104,162"
          fill="#F7F7F5"
          stroke="#111111"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Right face */}
        <polygon
          points="122,76 140,66 140,162 122,172"
          fill="#EBEBE4"
          stroke="#111111"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Top face */}
        <polygon
          points="122,56 140,66 122,76 104,66"
          fill="#FFFFFF"
          stroke="#111111"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Technical drafting anchor vertex dots in warm sunset orange */}
        <circle cx="68" cy="26" r="2.5" fill="#111111" />
        <circle cx="140" cy="66" r="2.5" fill="#111111" />
        <circle cx="50" cy="132" r="2.5" fill="#111111" />
        <circle cx="122" cy="172" r="2.5" fill="#111111" />
        <circle cx="86" cy="36" r="2.5" fill="#FF5722" />
        <circle cx="104" cy="162" r="2.5" fill="#FF5722" />
      </svg>

      {/* Coordinate & CAD annotations */}
      <div className="mt-3 flex items-center justify-between w-full max-w-[170px] text-[9px] font-mono tracking-widest text-[#777783] uppercase relative z-10">
        <span>ISO-30° // NX</span>
        <span className="text-[#FF5722] font-bold">NODE: EDGE-01</span>
      </div>
    </div>
  );
}

/**
 * Technical Blueprint Wordmark "NEXORA"
 * Full vector drafting typography with corner crosshairs, construction lines,
 * anchor vertices, precision dimension callouts, and warm sunset orange mesh gradient.
 */
function ArchitecturalBlueprintWordmark() {
  return (
    <div className="relative w-full py-12 sm:py-16 px-4 sm:px-8 overflow-hidden select-none bg-[#F7F7F4]">
      {/* Warm Sunset Orange Ambient Mesh Flowing Behind Blueprint */}
      <AnimatedSunsetMesh intensity="subtle" />

      {/* CAD Millimeter Graph Paper Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50 mix-blend-multiply z-[1]"
        style={{
          backgroundImage:
            "radial-gradient(#111111 1px, transparent 1px), radial-gradient(#111111 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px",
        }}
      />

      {/* 4 Corner Crosshairs */}
      <span className="absolute top-3 left-4 font-mono text-sm font-semibold text-[#888892] select-none z-10">+</span>
      <span className="absolute top-3 right-4 font-mono text-sm font-semibold text-[#888892] select-none z-10">+</span>
      <span className="absolute bottom-3 left-4 font-mono text-sm font-semibold text-[#888892] select-none z-10">+</span>
      <span className="absolute bottom-3 right-4 font-mono text-sm font-semibold text-[#888892] select-none z-10">+</span>

      {/* Blueprint Header Metadata Callout */}
      <div className="relative z-10 flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest text-[#777783] uppercase mb-4 sm:mb-8 px-2 border-b border-[#E2E2DA]/80 pb-2">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
          DWG: NX-AI-GATEWAY // ARCHITECTURAL DRAFT
        </span>
        <span className="hidden md:inline">SCALE: 1:1 • TOLERANCE: ±0.002MS • PROJECTION: VECTOR AXIS</span>
        <span className="text-[#FF5722] font-semibold bg-[#FF5722]/10 px-2 py-0.5 border border-[#FF5722]/30">
          STATUS: 99.99% UPSTREAM MESH
        </span>
      </div>

      {/* Main Drafting Wordmark SVG */}
      <div className="relative z-10 max-w-6xl mx-auto flex items-center justify-center">
        <svg
          viewBox="0 0 1120 200"
          className="w-full h-auto text-[#111111] drop-shadow-[0_8px_20px_rgba(255,87,34,0.06)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Orange Gradient Wash Definition for Letter Polygons */}
          <defs>
            <linearGradient id="blueprintSunsetWash" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#FFF2EA" stopOpacity="0.90" />
              <stop offset="100%" stopColor="#FFE6D6" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="sunsetAccentGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C22B2B" />
              <stop offset="50%" stopColor="#FF5722" />
              <stop offset="100%" stopColor="#FFA726" />
            </linearGradient>
          </defs>

          {/* Top & Bottom Horizontal Baseline Guidelines */}
          <line x1="10" y1="25" x2="1110" y2="25" stroke="#C8C8D0" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="10" y1="175" x2="1110" y2="175" stroke="#C8C8D0" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="10" y1="100" x2="1110" y2="100" stroke="#DDDDD8" strokeWidth="0.6" strokeDasharray="2 4" />

          {/* ================= LETTER N ================= */}
          {/* Construction extension lines */}
          <line x1="30" y1="10" x2="30" y2="190" stroke="#9A9AA4" strokeWidth="0.8" />
          <line x1="70" y1="10" x2="70" y2="190" stroke="#9A9AA4" strokeWidth="0.8" />
          <line x1="150" y1="10" x2="150" y2="190" stroke="#9A9AA4" strokeWidth="0.8" />
          <line x1="190" y1="10" x2="190" y2="190" stroke="#9A9AA4" strokeWidth="0.8" />
          {/* Left Vertical Bar */}
          <polygon points="30,25 70,25 70,175 30,175" stroke="#111111" strokeWidth="1.8" fill="url(#blueprintSunsetWash)" />
          {/* Diagonal Bar */}
          <polygon points="70,25 150,175 190,175 110,25" stroke="#111111" strokeWidth="1.8" fill="url(#blueprintSunsetWash)" />
          {/* Right Vertical Bar */}
          <polygon points="150,25 190,25 190,175 150,175" stroke="#111111" strokeWidth="1.8" fill="url(#blueprintSunsetWash)" />
          {/* Anchor dots */}
          <circle cx="30" cy="25" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="70" cy="25" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="30" cy="175" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="70" cy="175" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="150" cy="25" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="190" cy="25" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="150" cy="175" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="190" cy="175" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />

          {/* ================= LETTER E ================= */}
          {/* Construction extension lines */}
          <line x1="225" y1="10" x2="225" y2="190" stroke="#9A9AA4" strokeWidth="0.8" />
          <line x1="265" y1="10" x2="265" y2="190" stroke="#9A9AA4" strokeWidth="0.8" />
          <line x1="210" y1="60" x2="375" y2="60" stroke="#9A9AA4" strokeWidth="0.8" />
          <line x1="210" y1="140" x2="375" y2="140" stroke="#9A9AA4" strokeWidth="0.8" />
          {/* Spine & Arms */}
          <polygon
            points="225,25 365,25 365,60 265,60 265,85 345,85 345,115 265,115 265,140 365,140 365,175 225,175"
            stroke="#111111"
            strokeWidth="1.8"
            fill="url(#blueprintSunsetWash)"
          />
          {/* Anchor dots */}
          <circle cx="225" cy="25" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="365" cy="25" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="365" cy="60" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="345" cy="85" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="345" cy="115" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="365" cy="140" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="365" cy="175" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="225" cy="175" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />

          {/* ================= LETTER X ================= */}
          {/* Construction extension lines */}
          <line x1="395" y1="15" x2="550" y2="185" stroke="#9A9AA4" strokeWidth="0.8" />
          <line x1="550" y1="15" x2="395" y2="185" stroke="#9A9AA4" strokeWidth="0.8" />
          {/* Diagonal Bar 1 */}
          <polygon
            points="405,25 445,25 540,175 500,175"
            stroke="#111111"
            strokeWidth="1.8"
            fill="url(#blueprintSunsetWash)"
          />
          {/* Diagonal Bar 2 */}
          <polygon
            points="500,25 540,25 445,175 405,175"
            stroke="#111111"
            strokeWidth="1.8"
            fill="url(#blueprintSunsetWash)"
          />
          {/* Center intersection crosshair in glowing sunset orange */}
          <line x1="462" y1="100" x2="482" y2="100" stroke="#FF5722" strokeWidth="1.4" />
          <line x1="472" y1="90" x2="472" y2="110" stroke="#FF5722" strokeWidth="1.4" />
          {/* Anchor dots */}
          <circle cx="405" cy="25" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="540" cy="25" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="405" cy="175" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="540" cy="175" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />

          {/* ================= LETTER O ================= */}
          {/* Architectural Octagonal Precision Outline */}
          <line x1="565" y1="100" x2="735" y2="100" stroke="#9A9AA4" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="650" y1="10" x2="650" y2="190" stroke="#9A9AA4" strokeWidth="0.8" strokeDasharray="3 3" />
          {/* Center Crosshair in glowing sunset orange */}
          <line x1="640" y1="100" x2="660" y2="100" stroke="#FF5722" strokeWidth="1.4" />
          <line x1="650" y1="90" x2="650" y2="110" stroke="#FF5722" strokeWidth="1.4" />
          <circle cx="650" cy="100" r="3.5" fill="none" stroke="#FF5722" strokeWidth="1.2" />
          {/* Outer Octagon */}
          <polygon
            points="610,25 690,25 725,60 725,140 690,175 610,175 575,140 575,60"
            stroke="#111111"
            strokeWidth="1.8"
            fill="url(#blueprintSunsetWash)"
          />
          {/* Inner Octagon */}
          <polygon
            points="625,60 675,60 690,75 690,125 675,140 625,140 610,125 610,75"
            stroke="#111111"
            strokeWidth="1.8"
            fill="#F7F7F4"
          />
          {/* Anchor dots on outer vertices */}
          <circle cx="610" cy="25" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="690" cy="25" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="725" cy="60" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="725" cy="140" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="690" cy="175" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="610" cy="175" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="575" cy="140" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="575" cy="60" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />

          {/* ================= LETTER R ================= */}
          {/* Construction extension lines */}
          <line x1="760" y1="10" x2="760" y2="190" stroke="#9A9AA4" strokeWidth="0.8" />
          <line x1="800" y1="10" x2="800" y2="190" stroke="#9A9AA4" strokeWidth="0.8" />
          <line x1="745" y1="105" x2="905" y2="105" stroke="#9A9AA4" strokeWidth="0.8" />
          {/* Spine & Loop */}
          <polygon
            points="760,25 865,25 890,50 890,80 865,105 800,105 800,175 760,175"
            stroke="#111111"
            strokeWidth="1.8"
            fill="url(#blueprintSunsetWash)"
          />
          {/* Inner Loop Cutout */}
          <polygon
            points="800,55 850,55 860,65 860,70 850,78 800,78"
            stroke="#111111"
            strokeWidth="1.8"
            fill="#F7F7F4"
          />
          {/* Diagonal Leg */}
          <polygon
            points="820,105 855,105 895,175 860,175"
            stroke="#111111"
            strokeWidth="1.8"
            fill="url(#blueprintSunsetWash)"
          />
          {/* Anchor dots */}
          <circle cx="760" cy="25" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="865" cy="25" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="890" cy="50" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="890" cy="80" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="895" cy="175" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="760" cy="175" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />

          {/* ================= LETTER A ================= */}
          {/* Construction extension lines */}
          <line x1="990" y1="10" x2="990" y2="190" stroke="#9A9AA4" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="915" y1="185" x2="1080" y2="185" stroke="#9A9AA4" strokeWidth="0.8" />
          <line x1="945" y1="120" x2="1045" y2="120" stroke="#9A9AA4" strokeWidth="0.8" />
          {/* Outer Triangular Legs */}
          <polygon
            points="970,25 1010,25 1070,175 1030,175 1010,125 970,125 950,175 910,175"
            stroke="#111111"
            strokeWidth="1.8"
            fill="url(#blueprintSunsetWash)"
          />
          {/* Crossbar Inner Cutout */}
          <polygon
            points="990,65 1005,105 975,105"
            stroke="#111111"
            strokeWidth="1.8"
            fill="#F7F7F4"
          />
          {/* Apex Crosshair in glowing sunset orange */}
          <line x1="980" y1="25" x2="1000" y2="25" stroke="#FF5722" strokeWidth="1.4" />
          {/* Anchor dots */}
          <circle cx="970" cy="25" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="1010" cy="25" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="1070" cy="175" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
          <circle cx="910" cy="175" r="2.5" fill="white" stroke="#111111" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Blueprint Coordinates Footer Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between text-[10px] font-mono tracking-widest text-[#777783] uppercase mt-4 sm:mt-6 px-2">
        <span>GRID: 24MM • AXIS: <strong className="text-[#FF5722]">X: 1120 Y: 200</strong></span>
        <span>LAT: 37.7749° N, LONG: 122.4194° W (<strong className="text-[#FF5722]">GLOBAL MESH</strong>)</span>
      </div>
    </div>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubscribed(true);
  };

  return (
    <footer className="w-full bg-[#F6F6F3] text-[#111111] border-t border-[#E2E2DA] font-sans overflow-hidden">
      {/* Container with precise fine grid borders */}
      <div className="w-full max-w-[1440px] mx-auto border-x border-[#E2E2DA]">

        {/* ============================================================== */}
        {/* ROW 1: TOP SECTION (HEADLINE + 3 LINK COLUMNS + ISOMETRIC 3D)  */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 border-b border-[#E2E2DA]">

          {/* Cell 1: Big Editorial Bold Headline (Spans 4 cols on desktop) */}
          <div className="md:col-span-12 lg:col-span-4 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#E2E2DA] flex flex-col justify-between relative overflow-hidden">
            {/* Subtle Sunset Orange Gradient Ambience */}
            <div
              className="absolute -top-[20%] -left-[20%] w-[320px] h-[320px] pointer-events-none opacity-20 filter blur-3xl rounded-full"
              style={{
                background: "radial-gradient(circle, #FF5722 0%, #FFA726 60%, transparent 80%)",
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF5722] font-bold">
                  ANYCAST EDGE ROUTER v2.4
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold uppercase tracking-tight text-[#111111] leading-[1.08] font-mono">
                AN INTELLIGENT
                <br />
                <span className="text-gradient-sunset drop-shadow-xs">AI GATEWAY</span> THAT
                <br />
                POWERS YOUR CLOUD
                <br />
                INFRASTRUCTURE
              </h2>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EAEAE2] flex items-center justify-between text-xs text-[#777783] relative z-10">
              <span className="font-mono text-[11px] text-[#FF5722] font-semibold bg-[#FF5722]/5 px-2 py-0.5 border border-[#FF5722]/20">
                // ENTERPRISE AI INFERENCE
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-mono font-bold text-[11px] bg-emerald-50 px-2 py-0.5 border border-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                SOC2 / HIPAA READY
              </span>
            </div>
          </div>

          {/* Cell 2: COMPANY Links (Spans 2 cols on desktop) */}
          <div className="col-span-4 sm:col-span-4 lg:col-span-2 p-6 sm:p-8 border-r border-b md:border-b-0 border-[#E2E2DA]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#777783] block mb-5 font-semibold">
              COMPANY
            </span>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <Link
                  href="/"
                  className="font-bold text-[#FF5722] hover:text-[#FFA726] transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/platform" className="text-[#33333F] hover:text-[#FF5722] transition-colors">
                  Architecture
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-[#33333F] hover:text-[#FF5722] transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-[#33333F] hover:text-[#FF5722] transition-colors">
                  Developers
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-[#33333F] hover:text-[#FF5722] transition-colors">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* Cell 3: PRODUCT Links (Spans 2 cols on desktop) */}
          <div className="col-span-4 sm:col-span-4 lg:col-span-2 p-6 sm:p-8 border-r border-b md:border-b-0 border-[#E2E2DA]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#777783] block mb-5 font-semibold">
              PRODUCT
            </span>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <Link href="/platform#gateway" className="text-[#33333F] hover:text-[#FF5722] transition-colors">
                  Proxy Gateway
                </Link>
              </li>
              <li>
                <Link href="/dashboard/tokens" className="text-[#33333F] hover:text-[#FF5722] transition-colors">
                  Token Governance
                </Link>
              </li>
              <li>
                <Link href="/platform#caching" className="text-[#33333F] hover:text-[#FF5722] transition-colors">
                  Vector Caching
                </Link>
              </li>
              <li>
                <Link href="/dashboard/storage" className="text-[#33333F] hover:text-[#FF5722] transition-colors">
                  Cloud Storage
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-[#33333F] hover:text-[#FF5722] transition-colors">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Cell 4: RESOURCES Links (Spans 2 cols on desktop) */}
          <div className="col-span-4 sm:col-span-4 lg:col-span-2 p-6 sm:p-8 border-r md:border-r border-[#E2E2DA]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#777783] block mb-5 font-semibold">
              RESOURCES
            </span>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <Link href="/resources" className="text-[#33333F] hover:text-[#FF5722] transition-colors">
                  Latency Radar
                </Link>
              </li>
              <li>
                <Link href="/dashboard/docs" className="text-[#33333F] hover:text-[#FF5722] transition-colors">
                  SDK Quickstarts
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-[#33333F] hover:text-[#FF5722] transition-colors">
                  Whitepapers
                </Link>
              </li>
              <li>
                <Link href="/#sandbox" className="text-[#33333F] hover:text-[#FF5722] transition-colors">
                  Live Simulator
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-[#33333F] hover:text-[#FF5722] transition-colors">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          {/* Cell 5: ISOMETRIC 3D EMBLEM (Spans 2 cols on desktop) */}
          <div className="col-span-12 md:col-span-12 lg:col-span-2 flex items-center justify-center bg-[#F7F7F4]/90 border-t md:border-t-0">
            <IsometricWireframeN />
          </div>

        </div>

        {/* ============================================================== */}
        {/* ROW 2: MIDDLE SECTION (SUBSCRIBE, ADDRESS, INQUIRIES, SOCIAL)   */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 border-b border-[#E2E2DA]">

          {/* Cell 1: SUBSCRIBE Box (Spans 4 cols on desktop) */}
          <div className="md:col-span-12 lg:col-span-4 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#E2E2DA] flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#777783] block mb-2 font-semibold">
                SUBSCRIBE
              </span>
              <p className="text-xs sm:text-sm text-[#444450] leading-relaxed">
                Want to receive infrastructure uptime logs and upstream frontier model updates? Sign up for the Nexora engineering dispatch.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="mt-5">
              {isSubscribed ? (
                <div className="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Subscribed to engineering dispatch.</span>
                </div>
              ) : (
                <div className="flex items-center border border-[#D5D5CD] bg-white transition-colors focus-within:border-[#FF5722]">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    required
                    className="w-full px-3.5 py-2.5 text-xs text-[#111111] placeholder:text-[#9999A2] bg-transparent focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Submit newsletter subscription"
                    className="px-4 py-2.5 border-l border-[#D5D5CD] bg-white hover:bg-[#FF5722] hover:text-white transition-all text-xs flex items-center justify-center shrink-0 font-medium cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Cell 2: ADDRESS / LOCATION (Spans 3 cols on desktop) */}
          <div className="col-span-6 lg:col-span-3 p-6 sm:p-8 border-b sm:border-b-0 border-r border-[#E2E2DA] flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#777783] block mb-3 font-semibold">
                HEADQUARTERS
              </span>
              <p className="text-xs sm:text-sm text-[#33333F] leading-relaxed">
                548 Market St, Suite 2901
                <br />
                San Francisco, CA 94104
                <br />
                United States
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EAEAE2]">
              <Link
                href="/platform"
                className="text-xs font-semibold text-[#111111] hover:text-[#FF5722] transition-colors flex items-center gap-1 group"
              >
                <span>Anycast Edge Topology (32 PoPs)</span>
                <span className="group-hover:translate-x-1 transition-transform text-[#FF5722]">→</span>
              </Link>
            </div>
          </div>

          {/* Cell 3: INQUIRIES (Spans 3 cols on desktop, split horizontally) */}
          <div className="col-span-6 lg:col-span-3 border-r border-[#E2E2DA] flex flex-col">
            <div className="p-6 border-b border-[#E2E2DA] flex-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#777783] block mb-1.5 font-semibold">
                NEW ENTERPRISE
              </span>
              <a
                href="mailto:enterprise@nexora.cloud"
                className="text-xs sm:text-sm text-[#111111] hover:text-[#FF5722] transition-colors font-medium break-all"
              >
                enterprise@nexora.cloud
              </a>
            </div>

            <div className="p-6 flex-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#777783] block mb-1.5 font-semibold">
                DEVELOPER SUPPORT
              </span>
              <a
                href="mailto:support@nexora.cloud"
                className="text-xs sm:text-sm text-[#111111] hover:text-[#FF5722] transition-colors font-medium break-all"
              >
                support@nexora.cloud
              </a>
            </div>
          </div>

          {/* Cell 4: SOCIAL / ECOSYSTEM (Spans 2 cols on desktop) */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-2 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#777783] block mb-4 font-semibold">
                ECOSYSTEM
              </span>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs sm:text-sm">
                <div>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#33333F] hover:text-[#FF5722] transition-colors block"
                  >
                    GitHub
                  </a>
                </div>
                <div>
                  <Link href="/resources" className="text-[#33333F] hover:text-[#FF5722] transition-colors block">
                    Status
                  </Link>
                </div>
                <div>
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#33333F] hover:text-[#FF5722] transition-colors block"
                  >
                    Discord
                  </a>
                </div>
                <div>
                  <Link href="/dashboard/docs" className="text-[#33333F] hover:text-[#FF5722] transition-colors block">
                    Docs
                  </Link>
                </div>
                <div>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#33333F] hover:text-[#FF5722] transition-colors block"
                  >
                    X / Twitter
                  </a>
                </div>
                <div>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#33333F] hover:text-[#FF5722] transition-colors block"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EAEAE2] text-[10px] font-mono text-[#777783] space-y-1">
              <div>
                UPSTREAM: <span className="text-[#FF5722] font-semibold">OPENAI</span> • <span className="text-[#FFA726] font-semibold">ANTHROPIC</span> • <span className="text-[#FF5722] font-semibold">GOOGLE</span>
              </div>
              <div>
                SETTLEMENT: <span className="text-[#02AAB0] font-semibold">SADAPAY</span> • <span className="text-[#111111] font-semibold">RAAST</span> • <span className="text-[#111111] font-semibold">MASTERCARD</span>
              </div>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* ROW 3: FULL ARCHITECTURAL DRAFTING BLUEPRINT WORDMARK SECTION   */}
        {/* ============================================================== */}
        <div className="border-b border-[#E2E2DA]">
          <ArchitecturalBlueprintWordmark />
        </div>

        {/* ============================================================== */}
        {/* ROW 4: BOTTOM LEGAL & COPYRIGHT BAR                            */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 text-xs text-[#555562] font-mono">
          {/* Copyright cell */}
          <div className="md:col-span-6 lg:col-span-7 p-4 sm:px-6 flex items-center border-b md:border-b-0 md:border-r border-[#E2E2DA]">
            <p className="text-[11px] uppercase tracking-wider text-[#444450]">
              ©2026 NEXORA TECHNOLOGIES INC. ALL RIGHTS RESERVED. ARCHITECTED FOR RESILIENT AI INFERENCE.
            </p>
          </div>

          {/* Legal Links (each separated with a clean vertical grid line) */}
          <div className="md:col-span-2 lg:col-span-2 p-4 flex items-center justify-center border-b sm:border-b-0 border-r border-[#E2E2DA]">
            <Link href="/resources" className="text-[11px] text-[#444450] hover:text-[#FF5722] transition-colors uppercase tracking-wider">
              Privacy Policy
            </Link>
          </div>

          <div className="md:col-span-2 lg:col-span-2 p-4 flex items-center justify-center border-b sm:border-b-0 border-r border-[#E2E2DA]">
            <Link href="/resources" className="text-[11px] text-[#444450] hover:text-[#FF5722] transition-colors uppercase tracking-wider">
              Terms &amp; Conditions
            </Link>
          </div>

          <div className="md:col-span-2 lg:col-span-1 p-4 flex items-center justify-center">
            <Link href="/resources" className="text-[11px] text-[#444450] hover:text-[#FF5722] transition-colors uppercase tracking-wider">
              Cookies
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

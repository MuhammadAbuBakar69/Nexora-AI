"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Safe, idempotent GSAP plugin registration
let pluginsRegistered = false;
function registerGsapPlugins() {
  if (typeof window !== "undefined" && !pluginsRegistered) {
    try {
      gsap.registerPlugin(ScrollTrigger);
      pluginsRegistered = true;
    } catch {
      // Gracefully continue even if already registered or restricted
    }
  }
}

/**
 * GSAP / RAF Animated Counter
 * High-performance 60-120fps number counter with silky smooth cubic easing.
 * Uses native IntersectionObserver + requestAnimationFrame for zero-dependency reliability,
 * ensuring it never crashes or causes hydration/Webpack chunk errors.
 */
export function GsapCounter({
  target,
  duration = 2.2,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: {
  target: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [displayedValue, setDisplayedValue] = useState<string>(
    `${prefix}0${decimals > 0 ? "." + "0".repeat(decimals) : ""}${suffix}`
  );

  useEffect(() => {
    if (!spanRef.current || typeof window === "undefined") return;

    let hasAnimated = false;
    let animId: number;

    const startCounter = () => {
      if (hasAnimated) return;
      hasAnimated = true;

      const startTime = performance.now();
      const durationMs = duration * 1000;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        // Silky smooth cubic ease-out: 1 - (1 - t)^3
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = target * easeOut;

        setDisplayedValue(`${prefix}${currentVal.toFixed(decimals)}${suffix}`);

        if (progress < 1) {
          animId = requestAnimationFrame(step);
        } else {
          setDisplayedValue(`${prefix}${target.toFixed(decimals)}${suffix}`);
        }
      };

      animId = requestAnimationFrame(step);
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            startCounter();
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(spanRef.current);

      return () => {
        observer.disconnect();
        cancelAnimationFrame(animId);
      };
    } else {
      startCounter();
      return () => cancelAnimationFrame(animId);
    }
  }, [target, duration, decimals, prefix, suffix]);

  return (
    <span ref={spanRef} className={className}>
      {displayedValue}
    </span>
  );
}

/**
 * GSAP Staggered Reveal Container
 * Safely animates child elements with subtle blur fade-up and staggered entrance.
 */
export function GsapReveal({
  children,
  stagger = 0.12,
  y = 35,
  duration = 0.9,
  className = "",
}: {
  children: React.ReactNode;
  stagger?: number;
  y?: number;
  duration?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;
    registerGsapPlugins();

    try {
      const ctx = gsap.context(() => {
        const items = containerRef.current?.children;
        if (!items || items.length === 0) return;

        gsap.fromTo(
          items,
          {
            opacity: 0,
            y,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration,
            stagger,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }, containerRef);

      return () => ctx.revert();
    } catch {
      // Graceful fallback if GSAP context fails: preserve full visibility
      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
      }
    }
  }, [stagger, y, duration]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

/**
 * Interactive 3D Perspective Tilt Card with Animated Sunset Gradient Border & Spotlight
 * Tilts with mouse coordinates and casts an animated warm sunset gradient sheen & border.
 */
export function InteractiveTiltCard({
  children,
  className = "",
  maxTilt = 8,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 220 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    setMousePos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: 0.22,
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative will-change-transform group transition-shadow duration-500 hover:shadow-[0_20px_50px_-15px_rgba(255,87,34,0.25)] ${className}`}
    >
      {/* 1. Continuous Animated Flowing Sunset Gradient Border */}
      <div
        className="absolute -inset-[1.5px] rounded-none opacity-45 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #FF5722 0%, #FFA726 40%, #FF7043 70%, #C22B2B 100%)",
          backgroundSize: "200% 200%",
          animation: "cardGradientFlow 5s ease infinite",
        }}
      />

      {/* 2. Ambient Radiant Sunset Aura behind card on hover */}
      <div
        className="absolute -inset-4 rounded-none opacity-0 group-hover:opacity-35 filter blur-2xl transition-opacity duration-700 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, #FF5722 0%, #FFA726 60%, transparent 80%)",
        }}
      />

      {/* 3. Internal Card Body with Dynamic Cursor Spotlight */}
      <div className="relative z-10 w-full h-full bg-[#FFFFFF]/98 backdrop-blur-xs overflow-hidden">
        {/* Dynamic Cursor Sunset Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-500 rounded-none mix-blend-color-burn"
          style={{
            opacity: mousePos.opacity,
            background: `radial-gradient(450px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 87, 34, 0.45), rgba(255, 167, 38, 0.18), transparent 70%)`,
          }}
        />

        {/* Specular Shimmer Sweep on Hover */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          <div className="w-1/2 h-[200%] absolute -top-1/2 -left-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform rotate-25 transition-transform duration-1000 ease-out group-hover:translate-x-[400%]" />
        </div>

        {children}
      </div>
    </motion.div>
  );
}

/**
 * Editorial Headline with GSAP Reveal
 */
export function GsapHeadline({
  text,
  highlight,
  className = "",
}: {
  text: string;
  highlight?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;
    registerGsapPlugins();

    try {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 32, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }, containerRef);

      return () => ctx.revert();
    } catch {
      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
      }
    }
  }, []);

  return (
    <h2 ref={containerRef} className={className}>
      {text}{" "}
      {highlight && (
        <span className="text-gradient-sunset drop-shadow-xs">
          {highlight}
        </span>
      )}
    </h2>
  );
}

/**
 * GSAP Smooth Infinite Float for Micro-Interactions
 */
export function GsapFloat({
  children,
  duration = 4.5,
  y = 10,
  className = "",
}: {
  children: React.ReactNode;
  duration?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    try {
      const ctx = gsap.context(() => {
        gsap.to(ref.current, {
          y: -y,
          duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }, ref);

      return () => ctx.revert();
    } catch {
      // Fallback: element remains in natural static position
    }
  }, [duration, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

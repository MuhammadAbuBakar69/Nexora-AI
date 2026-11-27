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
 * Interactive 3D Perspective Tilt Card with Clean Architectural Hover Effect
 */
export function InteractiveTiltCard({
  children,
  className = "",
  maxTilt = 6,
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
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
      className={`relative will-change-transform group bg-white border border-[#E2E2DA] hover:border-[#111111] hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <div className="relative z-10 w-full h-full">
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

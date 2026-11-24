"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

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
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <h1 ref={containerRef} className={className}>
      {text}
      {highlight && (
        <>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-primary via-[#5D38F0] to-[#7E88FF]">
            {highlight}
          </span>
        </>
      )}
    </h1>
  );
}

export function GsapFloat({
  children,
  duration = 4,
  y = 12,
  className = "",
}: {
  children: React.ReactNode;
  duration?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

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
  }, [duration, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

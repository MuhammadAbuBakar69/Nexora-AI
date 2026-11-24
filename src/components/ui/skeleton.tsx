"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

export function Skeleton({ className, shimmer = true, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-surface-hover/80 relative overflow-hidden",
        shimmer &&
          "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.8s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent",
        className
      )}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="p-6 rounded-3xl bg-white border border-border space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="w-10 h-10 rounded-2xl" />
        <Skeleton className="w-20 h-5 rounded-full" />
      </div>
      <Skeleton className="w-3/4 h-6 rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="w-full h-4 rounded-md" />
        <Skeleton className="w-5/6 h-4 rounded-md" />
      </div>
      <div className="pt-2 flex items-center gap-2">
        <Skeleton className="w-24 h-8 rounded-full" />
        <Skeleton className="w-16 h-8 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="w-full bg-white border border-border rounded-3xl p-6 space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <Skeleton className="w-48 h-6 rounded-lg" />
        <Skeleton className="w-24 h-8 rounded-full" />
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center justify-between py-3 border-b border-border/60">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-xl" />
            <Skeleton className="w-36 h-4 rounded-md" />
          </div>
          <Skeleton className="w-24 h-4 rounded-md" />
          <Skeleton className="w-20 h-6 rounded-full" />
          <Skeleton className="w-16 h-4 rounded-md" />
        </div>
      ))}
    </div>
  );
}

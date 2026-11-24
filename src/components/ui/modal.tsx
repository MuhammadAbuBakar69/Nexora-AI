"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#100E20]/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={cn(
          "relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-float border border-border z-10 animate-in zoom-in-95 duration-200",
          className
        )}
      >
        <div className="flex items-start justify-between pb-4 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold text-foreground tracking-tight">{title}</h3>
            {description && (
              <p className="text-xs text-secondary mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-secondary hover:text-foreground hover:bg-surface transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}

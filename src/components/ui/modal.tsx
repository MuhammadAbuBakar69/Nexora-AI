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
        className="fixed inset-0 bg-[#111111]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={cn(
          "relative w-full max-w-lg bg-white border border-[#E2E2DA] p-6 shadow-2xl z-10 animate-in zoom-in-95 duration-150 font-sans",
          "before:content-['+'] before:absolute before:-top-2.5 before:-left-2.5 before:text-xs before:font-mono before:text-[#999990] before:select-none",
          "after:content-['+'] after:absolute after:-bottom-2.5 after:-right-2.5 after:text-xs after:font-mono after:text-[#999990] after:select-none",
          className
        )}
      >
        <div className="flex items-start justify-between pb-4 border-b border-[#E2E2DA]">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-tight text-[#111111] font-mono">
              // {title}
            </h3>
            {description && (
              <p className="text-xs font-mono text-[#777783] mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#777783] hover:text-[#111111] hover:bg-[#F6F6F3] border border-transparent hover:border-[#E2E2DA] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}

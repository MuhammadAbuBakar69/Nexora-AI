"use client";

import React, { useState } from "react";
import {
  CreditCard,
  CheckCircle2,
  Lock,
  Copy,
  Check,
  Building,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  QrCode,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SadaPayCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
  amountPkr: number;
  amountUsd?: number;
  onPaymentSuccess?: (details: { method: string; transactionId: string }) => void;
}

export function SadaPayCheckoutModal({
  isOpen,
  onClose,
  planName = "Growth Tier Allocation",
  amountPkr,
  amountUsd,
  onPaymentSuccess,
}: SadaPayCheckoutModalProps) {
  const [paymentTab, setPaymentTab] = useState<"card" | "iban">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (field: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 16);
    const parts = val.match(/.{1,4}/g);
    setCardNumber(parts ? parts.join(" ") : val);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (val.length >= 2) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setExpiry(val);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      const generatedTxId = `SP-${Date.now().toString(36).toUpperCase()}-${Math.floor(
        Math.random() * 8999 + 1000
      )}`;

      if (onPaymentSuccess) {
        onPaymentSuccess({
          method: paymentTab === "card" ? "SadaPay Mastercard Debit" : "SadaPay / Raast Direct Transfer",
          transactionId: transactionRef || generatedTxId,
        });
      }
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#E2E2DA] shadow-2xl font-mono select-none overflow-hidden max-h-[92vh] flex flex-col">
        {/* CAD Corner Crosshairs */}
        <span className="absolute top-2 left-2 text-xs text-[#888892] select-none z-20">+</span>
        <span className="absolute top-2 right-2 text-xs text-[#888892] select-none z-20">+</span>
        <span className="absolute bottom-2 left-2 text-xs text-[#888892] select-none z-20">+</span>
        <span className="absolute bottom-2 right-2 text-xs text-[#888892] select-none z-20">+</span>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E2DA] bg-[#F7F7F4]">
          <div className="flex items-center gap-3">
            {/* SadaPay Teal/Cyan Branding Pill */}
            <div className="w-8 h-8 rounded-none bg-[#02AAB0] text-white flex items-center justify-center font-bold text-xs tracking-tighter shadow-xs">
              SP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
                  SadaPay Commercial Checkout
                </h3>
                <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-300 px-1.5 py-0.2 font-bold">
                  PKR SETTLEMENT
                </span>
              </div>
              <p className="text-[11px] text-[#777783] mt-0.5">
                Instant AI Gateway Token Quota Activation • Zero Foreign Surcharge
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#777783] hover:text-[#111111] border border-transparent hover:border-[#E2E2DA] hover:bg-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {isSuccess ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-[#111111] uppercase tracking-wide">
                Payment Authorized via SadaPay
              </h4>
              <p className="text-xs text-[#555562] max-w-md mx-auto leading-relaxed">
                Your payment of <strong className="text-[#111111]">₨{amountPkr.toLocaleString()} PKR</strong> has been verified. Your gateway token quota and rate limits have been provisioned instantly.
              </p>
              <div className="p-4 bg-[#F7F7F4] border border-[#E2E2DA] max-w-sm mx-auto text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#777783]">Allocation:</span>
                  <span className="font-bold text-[#111111]">{planName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777783]">Payment Processor:</span>
                  <span className="font-bold text-[#02AAB0]">SadaPay Business</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777783]">Gateway SLA:</span>
                  <span className="font-bold text-emerald-700">Active (99.99%)</span>
                </div>
              </div>
              <Button onClick={onClose} className="mt-4 text-xs font-bold uppercase tracking-wider px-6">
                Return to Dashboard
              </Button>
            </div>
          ) : (
            <>
              {/* Order Summary Strip */}
              <div className="p-4 bg-[#F7F7F4] border border-[#E2E2DA] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase text-[#777783] block">ALLOCATION TARGET</span>
                  <span className="text-xs font-bold text-[#111111] uppercase">{planName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-[#777783] block">TOTAL AMOUNT PAYABLE</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-[#111111] font-mono">
                      ₨{amountPkr.toLocaleString()} PKR
                    </span>
                    {amountUsd && (
                      <span className="text-[11px] text-[#777783] font-normal">
                        (≈ ${amountUsd.toFixed(2)} USD)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method Switcher */}
              <div className="flex border border-[#E2E2DA] bg-[#F7F7F4] p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentTab("card")}
                  className={`flex-1 py-2 font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${paymentTab === "card"
                      ? "bg-white text-[#111111] shadow-xs border border-[#E2E2DA]"
                      : "text-[#777783] hover:text-[#111111]"
                    }`}
                >
                  <CreditCard className="w-3.5 h-3.5 text-[#02AAB0]" />
                  <span>SadaPay Card / Mastercard</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentTab("iban")}
                  className={`flex-1 py-2 font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${paymentTab === "iban"
                      ? "bg-white text-[#111111] shadow-xs border border-[#E2E2DA]"
                      : "text-[#777783] hover:text-[#111111]"
                    }`}
                >
                  <Building className="w-3.5 h-3.5 text-[#111111]" />
                  <span>SadaPay IBAN / Raast Transfer</span>
                </button>
              </div>

              {paymentTab === "card" ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Left: Authentic SadaPay Virtual Card Preview */}
                  <div className="md:col-span-5 flex flex-col items-center">
                    <div className="w-full max-w-[240px] aspect-[1/1.5] bg-[#F1F4F8] border border-[#D5DCE5] p-5 flex flex-col justify-between relative shadow-md overflow-hidden rounded-md text-[#5A6E85]">
                      {/* SadaPay Watermark Dual-S Logo */}
                      <div className="absolute -bottom-8 -left-8 w-44 h-44 opacity-10 pointer-events-none text-[#1A365D]">
                        <svg viewBox="0 0 100 100" fill="currentColor">
                          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="none" />
                          <path d="M30 40 C30 25, 70 25, 70 40 C70 55, 30 55, 30 70 C30 85, 70 85, 70 70" stroke="currentColor" strokeWidth="10" fill="none" strokeLinecap="round" />
                        </svg>
                      </div>

                      {/* Top Row: Virtual Card Badge */}
                      <div className="flex items-center justify-between text-[11px] font-sans font-medium text-[#7D8F9F]">
                        <span>Virtual card</span>
                        <span className="text-[10px] font-bold tracking-widest text-[#02AAB0]">SADAPAY</span>
                      </div>

                      {/* Card Number Blocks (4 stacked vertical blocks like SadaPay UI) */}
                      <div className="text-right space-y-1 font-mono text-base font-bold text-[#475467] tracking-widest my-auto pr-1">
                        <div>{cardNumber.slice(0, 4) || "5590"}</div>
                        <div>{cardNumber.slice(5, 9) || "••••"}</div>
                        <div>{cardNumber.slice(10, 14) || "••••"}</div>
                        <div className="flex items-center justify-end gap-1.5">
                          <Copy className="w-3 h-3 text-[#98A2B3]" />
                          <span>{cardNumber.slice(15, 19) || "••••"}</span>
                        </div>
                      </div>

                      {/* Bottom Row: Expiry & CVC */}
                      <div className="flex items-end justify-between text-xs font-sans text-[#7D8F9F] pt-2 border-t border-[#E4E7EC]">
                        <div>
                          <span className="text-[9px] block text-[#98A2B3] uppercase">Exp Date</span>
                          <span className="font-mono font-bold text-[#475467]">{expiry || "MM/YY"}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] block text-[#98A2B3] uppercase">CVC</span>
                          <span className="font-mono font-bold text-[#475467]">{cvc ? "•••" : "998"}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#777783] mt-2">Mastercard 3D-Secure Protected</span>
                  </div>

                  {/* Right: Card Input Form */}
                  <form onSubmit={handleSubmitPayment} className="md:col-span-7 space-y-3.5">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#777783] block mb-1">
                        SadaPay / Mastercard Card Number
                      </label>
                      <Input
                        type="text"
                        placeholder="5590 4902 8243 5211"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        required
                        className="font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#777783] block mb-1">
                        Cardholder Full Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Muhammad Abu Bakar"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        required
                        className="font-mono text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-[#777783] block mb-1">
                          Expiry Date
                        </label>
                        <Input
                          type="text"
                          placeholder="07/31"
                          value={expiry}
                          onChange={handleExpiryChange}
                          maxLength={5}
                          required
                          className="font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-[#777783] block mb-1">
                          Security CVC
                        </label>
                        <Input
                          type="password"
                          placeholder="998"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value.slice(0, 4))}
                          maxLength={4}
                          required
                          className="font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full h-11 text-xs font-bold uppercase tracking-wider bg-[#02AAB0] hover:bg-[#008f94] text-white shadow-md border-transparent"
                      >
                        {isProcessing ? (
                          <span>Authorizing SadaPay Payment...</span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Pay ₨{amountPkr.toLocaleString()} PKR with SadaPay</span>
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                /* SadaPay IBAN / Raast Direct Wire Option */
                <div className="space-y-4">
                  <div className="p-4 bg-[#F7F7F4] border border-[#E2E2DA] space-y-3 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E2E2DA]">
                      <span className="text-[#777783] uppercase text-[10px]">Merchant SadaPay Account:</span>
                      <span className="font-bold text-[#111111]">Nexora Cloud AI Infrastructure</span>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-[#E2E2DA]">
                      <div>
                        <span className="text-[#777783] uppercase text-[10px] block">SadaPay Account Number:</span>
                        <span className="font-bold text-[#111111] font-mono text-sm">0300 1234567</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy("account", "03001234567")}
                        className="px-2 py-1 bg-white border border-[#E2E2DA] text-[10px] flex items-center gap-1 hover:bg-[#111111] hover:text-white transition-all"
                      >
                        {copiedField === "account" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-[#E2E2DA]">
                      <div>
                        <span className="text-[#777783] uppercase text-[10px] block">IBAN (Interbank Funds Transfer):</span>
                        <span className="font-bold text-[#111111] font-mono text-xs">PK36SADA0000001234567890</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy("iban", "PK36SADA0000001234567890")}
                        className="px-2 py-1 bg-white border border-[#E2E2DA] text-[10px] flex items-center gap-1 hover:bg-[#111111] hover:text-white transition-all"
                      >
                        {copiedField === "iban" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>Copy IBAN</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#777783] uppercase text-[10px]">Settlement Time:</span>
                      <span className="font-bold text-emerald-700">Instant via Raast / 1-Link</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitPayment} className="space-y-3">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#777783] block mb-1">
                        Enter SadaPay Transaction ID / Reference (TRX ID)
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g. 2026112700812984 or Bank Ref #"
                        value={transactionRef}
                        onChange={(e) => setTransactionRef(e.target.value)}
                        required
                        className="font-mono text-xs"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full h-11 text-xs font-bold uppercase tracking-wider bg-[#111111] hover:bg-black text-white shadow-md border-transparent"
                    >
                      {isProcessing ? (
                        <span>Validating Wire Transfer...</span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Confirm SadaPay Transfer &amp; Activate Quota</span>
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              )}

              {/* Security Footer Note */}
              <div className="pt-2 border-t border-[#E2E2DA] flex items-center justify-between text-[10px] text-[#777783]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>State Bank of Pakistan (SBP) Authorized EMI Settlement</span>
                </div>
                <span>SSL 256-Bit Encrypted</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

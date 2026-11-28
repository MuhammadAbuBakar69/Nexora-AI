"use client";

import React, { useEffect, useState } from "react";
import {
  CreditCard,
  CheckCircle2,
  Lock,
  Copy,
  Check,
  Building,
  ShieldCheck,
  ArrowRight,
  Clock,
  Landmark,
  AlertCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SadaPayCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
  amountPkr: number;
  amountUsd?: number;
  tokensAllocated?: number;
  onPaymentSuccess?: (details: {
    method: string;
    transactionId: string;
    status: "pending" | "pending_verification" | "paid";
  }) => void;
}

const SADAPAY_TITLE =
  process.env.NEXT_PUBLIC_SADAPAY_ACCOUNT_TITLE?.trim() ||
  "Nexora Cloud AI Infrastructure";
const SADAPAY_ACCOUNT =
  process.env.NEXT_PUBLIC_SADAPAY_ACCOUNT_NUMBER?.trim() || "";
const SADAPAY_IBAN = process.env.NEXT_PUBLIC_SADAPAY_IBAN?.trim() || "";

export function SadaPayCheckoutModal({
  isOpen,
  onClose,
  planName = "Growth Tier Allocation",
  amountPkr,
  amountUsd,
  tokensAllocated,
  onPaymentSuccess,
}: SadaPayCheckoutModalProps) {
  const [paymentTab, setPaymentTab] = useState<"safepay" | "payfast" | "iban">("safepay");
  const [transactionRef, setTransactionRef] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [submittedTx, setSubmittedTx] = useState<{
    trackerId: string;
    referenceCode: string;
  } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setError("");
      setIsProcessing(false);
      setSubmittedTx(null);
      setTransactionRef("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (field: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSafepayCheckout = async () => {
    setError("");
    setIsProcessing(true);
    try {
      const res = await fetch("/api/payments/safepay/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName,
          amountPkr,
          amountUsd,
          tokensAllocated,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.checkoutUrl) {
        setError(data.error || "Could not start Safepay checkout session.");
        return;
      }

      window.location.assign(data.checkoutUrl);
    } catch {
      setError("Network error connecting to Safepay checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayfastCheckout = async () => {
    setError("");
    setIsProcessing(true);
    try {
      const res = await fetch("/api/payments/payfast/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName,
          amountPkr,
          amountUsd,
          tokensAllocated,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.actionUrl || !data.fields) {
        setError(data.error || "Could not start PayFast checkout session.");
        return;
      }

      // Submit signed POST form to PayFast hosted checkout
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.actionUrl;
      Object.entries(data.fields as Record<string, string>).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    } catch {
      setError("Network error connecting to PayFast checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmitRaastTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsProcessing(true);

    try {
      const res = await fetch("/api/payments/sadapay/submit-transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName,
          amountPkr,
          amountUsd,
          tokensAllocated,
          referenceCode: transactionRef.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.transaction) {
        setError(data.error || "Failed to record SadaPay / Raast transfer.");
        return;
      }

      setSubmittedTx({
        trackerId: data.transaction.tracker_id,
        referenceCode: data.transaction.reference_code,
      });

      if (onPaymentSuccess) {
        onPaymentSuccess({
          method: "SadaPay / Raast Direct Transfer",
          transactionId: data.transaction.tracker_id,
          status: "pending_verification",
        });
      }
    } catch {
      setError("Network error while submitting transfer reference.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#E2E2DA] shadow-2xl font-mono select-none overflow-hidden max-h-[92vh] flex flex-col">
        <span className="absolute top-2 left-2 text-xs text-[#888892] select-none z-20">+</span>
        <span className="absolute top-2 right-2 text-xs text-[#888892] select-none z-20">+</span>
        <span className="absolute bottom-2 left-2 text-xs text-[#888892] select-none z-20">+</span>
        <span className="absolute bottom-2 right-2 text-xs text-[#888892] select-none z-20">+</span>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E2DA] bg-[#F7F7F4]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-none bg-[#02AAB0] text-white flex items-center justify-center font-bold text-xs tracking-tighter shadow-xs">
              PK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
                  Pakistan Commercial Checkout
                </h3>
                <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-300 px-1.5 py-0.2 font-bold">
                  PKR SETTLEMENT
                </span>
              </div>
              <p className="text-[11px] text-[#777783] mt-0.5">
                Safepay • PayFast • SadaPay / Raast Direct Settlement
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-1.5 text-[#777783] hover:text-[#111111] border border-transparent hover:border-[#E2E2DA] hover:bg-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {submittedTx ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-amber-50 border border-amber-300 text-amber-600 flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-[#111111] uppercase tracking-wide">
                Transfer Submitted for Verification
              </h4>
              <p className="text-xs text-[#555562] max-w-md mx-auto leading-relaxed font-sans">
                Your SadaPay / Raast transfer of{" "}
                <strong className="text-[#111111]">₨{amountPkr.toLocaleString()} PKR</strong>{" "}
                has been recorded. Once an administrator verifies your TRX reference, your subscription and token quota will activate automatically.
              </p>
              <div className="p-4 bg-[#F7F7F4] border border-[#E2E2DA] max-w-sm mx-auto text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#777783]">Allocation:</span>
                  <span className="font-bold text-[#111111]">{planName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777783]">Tracker ID:</span>
                  <span className="font-bold text-[#111111]">{submittedTx.trackerId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777783]">TRX Reference:</span>
                  <span className="font-bold text-[#02AAB0]">{submittedTx.referenceCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777783]">Status:</span>
                  <span className="font-bold text-amber-700">PENDING VERIFICATION</span>
                </div>
              </div>
              <Button onClick={onClose} className="mt-2 text-xs font-bold uppercase tracking-wider px-6">
                Return to Billing
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
                    {amountUsd ? (
                      <span className="text-[11px] text-[#777783] font-normal">
                        (≈ ${amountUsd.toFixed(2)} USD)
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Payment Gateway Switcher */}
              <div className="grid grid-cols-3 border border-[#E2E2DA] bg-[#F7F7F4] p-1 text-[11px] gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setPaymentTab("safepay");
                  }}
                  className={`py-2 px-2 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                    paymentTab === "safepay"
                      ? "bg-white text-[#111111] shadow-xs border border-[#E2E2DA]"
                      : "text-[#777783] hover:text-[#111111]"
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5 text-[#02AAB0] shrink-0" />
                  <span>Safepay</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setPaymentTab("payfast");
                  }}
                  className={`py-2 px-2 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                    paymentTab === "payfast"
                      ? "bg-white text-[#111111] shadow-xs border border-[#E2E2DA]"
                      : "text-[#777783] hover:text-[#111111]"
                  }`}
                >
                  <Landmark className="w-3.5 h-3.5 text-violet-primary shrink-0" />
                  <span>PayFast</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setPaymentTab("iban");
                  }}
                  className={`py-2 px-2 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                    paymentTab === "iban"
                      ? "bg-white text-[#111111] shadow-xs border border-[#E2E2DA]"
                      : "text-[#777783] hover:text-[#111111]"
                  }`}
                >
                  <Building className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                  <span>SadaPay / Raast</span>
                </button>
              </div>

              {paymentTab === "safepay" && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#F7F7F4] border border-[#E2E2DA] space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#111111] uppercase">
                        Safepay Hosted 3D-Secure Checkout
                      </span>
                      <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                        PCI-DSS HOSTED
                      </span>
                    </div>
                    <p className="text-[11px] text-[#555562] font-sans leading-relaxed">
                      Pay securely using your <strong>SadaPay Mastercard</strong>, Visa/Mastercard debit or credit card, mobile wallets, or Raast via Safepay. Card numbers are entered exclusively on Safepay&apos;s encrypted checkout page—never stored on Nexora servers.
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={handleSafepayCheckout}
                    disabled={isProcessing}
                    className="w-full h-11 text-xs font-bold uppercase tracking-wider bg-[#02AAB0] hover:bg-[#008f94] text-white shadow-md border-transparent"
                  >
                    {isProcessing ? (
                      <span>Creating Safepay Checkout Session...</span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Continue to Safepay (₨{amountPkr.toLocaleString()} PKR)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </Button>
                </div>
              )}

              {paymentTab === "payfast" && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#F7F7F4] border border-[#E2E2DA] space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#111111] uppercase">
                        PayFast (SBP Licensed PSO/PSP)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 bg-violet-50 text-violet-primary border border-violet-200 font-bold">
                        MULTI-RAIL
                      </span>
                    </div>
                    <p className="text-[11px] text-[#555562] font-sans leading-relaxed">
                      Supports <strong>PayPak / Visa / Mastercard</strong> (including SadaPay cards), <strong>1Link bank accounts</strong>, <strong>JazzCash</strong>, <strong>Easypaisa</strong>, and <strong>Raast P2M</strong> via PayFast&apos;s hosted gateway.
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={handlePayfastCheckout}
                    disabled={isProcessing}
                    className="w-full h-11 text-xs font-bold uppercase tracking-wider bg-[#111111] hover:bg-black text-white shadow-md border-transparent"
                  >
                    {isProcessing ? (
                      <span>Initializing PayFast Token...</span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Continue to PayFast (₨{amountPkr.toLocaleString()} PKR)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </Button>
                </div>
              )}

              {paymentTab === "iban" && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#F7F7F4] border border-[#E2E2DA] space-y-3 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E2E2DA]">
                      <span className="text-[#777783] uppercase text-[10px]">Merchant Account Title:</span>
                      <span className="font-bold text-[#111111]">{SADAPAY_TITLE}</span>
                    </div>

                    {SADAPAY_ACCOUNT || SADAPAY_IBAN ? (
                      <>
                        {SADAPAY_ACCOUNT && (
                          <div className="flex items-center justify-between pb-2 border-b border-[#E2E2DA]">
                            <div>
                              <span className="text-[#777783] uppercase text-[10px] block">
                                SadaPay Account Number:
                              </span>
                              <span className="font-bold text-[#111111] font-mono text-sm">
                                {SADAPAY_ACCOUNT}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopy("account", SADAPAY_ACCOUNT)}
                              className="px-2 py-1 bg-white border border-[#E2E2DA] text-[10px] flex items-center gap-1 hover:bg-[#111111] hover:text-white transition-all"
                            >
                              {copiedField === "account" ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                              <span>Copy</span>
                            </button>
                          </div>
                        )}

                        {SADAPAY_IBAN && (
                          <div className="flex items-center justify-between pb-2 border-b border-[#E2E2DA]">
                            <div>
                              <span className="text-[#777783] uppercase text-[10px] block">
                                IBAN (Raast / Interbank Transfer):
                              </span>
                              <span className="font-bold text-[#111111] font-mono text-xs">
                                {SADAPAY_IBAN}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopy("iban", SADAPAY_IBAN)}
                              className="px-2 py-1 bg-white border border-[#E2E2DA] text-[10px] flex items-center gap-1 hover:bg-[#111111] hover:text-white transition-all"
                            >
                              {copiedField === "iban" ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                              <span>Copy IBAN</span>
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="p-3 bg-amber-50 border border-amber-200 text-[11px] text-amber-800">
                        Merchant SadaPay account / IBAN not yet configured in environment variables (`NEXT_PUBLIC_SADAPAY_ACCOUNT_NUMBER`, `NEXT_PUBLIC_SADAPAY_IBAN`).
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-[#777783] uppercase text-[10px]">Verification Mode:</span>
                      <span className="font-bold text-amber-700">Admin Verified (TRX / Raast ID)</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitRaastTransfer} className="space-y-3">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#777783] block mb-1">
                        Enter SadaPay / Raast Transaction Reference (TRX ID)
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g. 2026112800812984 or Bank Ref #"
                        value={transactionRef}
                        onChange={(e) => setTransactionRef(e.target.value)}
                        minLength={6}
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
                        <span>Recording Transfer Reference...</span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Submit SadaPay Transfer Reference</span>
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
                  <span>State Bank of Pakistan (SBP) Regulated Payment Rails</span>
                </div>
                <span>TLS 1.3 Encrypted</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

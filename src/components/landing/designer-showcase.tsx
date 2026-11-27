"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  Database,
  ArrowRight,
  Server,
  Lock,
  RefreshCw,
  Activity,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { InteractiveTiltCard, GsapHeadline, GsapFloat } from "@/components/animations/gsap-animator";
import { AnimatedSunsetMesh } from "@/components/ui/animated-sunset-mesh";

export function DesignerShowcase() {
  const [activeTab, setActiveTab] = useState<"failover" | "kms" | "radar">("failover");
  const [isSimulatingFailover, setIsSimulatingFailover] = useState(false);
  const [isScrubbingMemory, setIsScrubbingMemory] = useState(false);
  const [activePoP, setActivePoP] = useState<string>("tokyo");

  const [activePackets, setActivePackets] = useState<number>(1420);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePackets((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const handleTriggerFailover = () => {
    setIsSimulatingFailover(true);
    setTimeout(() => {
      setIsSimulatingFailover(false);
    }, 4500);
  };

  const handleTriggerScrub = () => {
    setIsScrubbingMemory(true);
    setTimeout(() => {
      setIsScrubbingMemory(false);
    }, 3200);
  };

  return (
    <section className="py-24 bg-[#F6F6F3] border-b border-[#E2E2DA] select-none font-sans relative overflow-hidden">
      {/* Ambient Flowing Sunset Gradient Mesh Orbs */}
      <AnimatedSunsetMesh intensity="subtle" />

      {/* CAD Millimeter Graph Paper Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply z-[1]"
        style={{
          backgroundImage:
            "radial-gradient(#111111 1px, transparent 1px), radial-gradient(#111111 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CAD Blueprint Section Header */}
        <div className="flex flex-wrap items-center justify-between text-[10px] font-mono tracking-widest text-[#777783] uppercase mb-8 pb-2 border-b border-[#E2E2DA]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            // SPATIAL ARCHITECTURE &amp; INTERACTIVE UI/UX ENGINE
          </span>
          <span>DWG: NX-SPATIAL-HUD // REVISION: 2026.4</span>
        </div>

        {/* Editorial Headline */}
        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-violet-primary bg-violet-50 px-2.5 py-1 border border-violet-200 inline-block mb-3">
            NEXT-GEN EXPERIENCE CANVAS
          </span>
          <GsapHeadline
            text="PRECISION GATEWAY DYNAMICS ENGINEERED FOR"
            highlight="MISSION-CRITICAL AI"
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#111111] font-mono leading-[1.12] mb-4"
          />
          <p className="text-xs sm:text-sm text-[#555562] font-mono leading-relaxed">
            Experience our multi-layer routing kernel with real-time failover simulation, zero-data retention memory isolation, and global latency radar telemetry.
          </p>
        </div>

        {/* 3D Interactive Perspective Card with Sunset Spotlight */}
        <InteractiveTiltCard maxTilt={5} className="w-full">
          <div className="bg-white/95 backdrop-blur-md border border-[#E2E2DA] shadow-lg relative p-6 sm:p-10 font-mono">
            {/* 4 CAD Corner Crosshairs */}
            <span className="absolute top-2 left-2 text-xs text-[#888892] select-none">+</span>
            <span className="absolute top-2 right-2 text-xs text-[#888892] select-none">+</span>
            <span className="absolute bottom-2 left-2 text-xs text-[#888892] select-none">+</span>
            <span className="absolute bottom-2 right-2 text-xs text-[#888892] select-none">+</span>

            {/* Top Interactive Mode Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E2E2DA]">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("failover")}
                  className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                    activeTab === "failover"
                      ? "bg-[#111111] text-white border-[#111111] shadow-xs"
                      : "bg-[#F7F7F4] text-[#555562] border-[#E2E2DA] hover:text-[#111111]"
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5 text-violet-primary" />
                  <span>01. Dynamic Failover Engine</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("kms")}
                  className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                    activeTab === "kms"
                      ? "bg-[#111111] text-white border-[#111111] shadow-xs"
                      : "bg-[#F7F7F4] text-[#555562] border-[#E2E2DA] hover:text-[#111111]"
                  }`}
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>02. Zero-Retention Memory Vault</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("radar")}
                  className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                    activeTab === "radar"
                      ? "bg-[#111111] text-white border-[#111111] shadow-xs"
                      : "bg-[#F7F7F4] text-[#555562] border-[#E2E2DA] hover:text-[#111111]"
                  }`}
                >
                  <Radio className="w-3.5 h-3.5 text-amber-500" />
                  <span>03. Spatial Anycast Radar</span>
                </button>
              </div>

              {/* Live Status Telemetry Indicator */}
              <div className="flex items-center gap-3 text-[10px] text-[#777783]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ACTIVE PACKETS: {activePackets.toLocaleString()}</span>
                </span>
                <span>•</span>
                <span className="font-bold text-[#111111]">KERNEL: ONLINE</span>
              </div>
            </div>

            {/* Tab 1: DYNAMIC FAILOVER ENGINE */}
            <AnimatePresence mode="wait">
              {activeTab === "failover" && (
                <motion.div
                  key="failover"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="py-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left: Circuit Schematic Visualization */}
                    <div className="lg:col-span-8 p-6 sm:p-8 bg-[#F7F7F4] border border-[#E2E2DA] relative">
                      <div className="flex items-center justify-between text-[10px] text-[#777783] mb-6 pb-2 border-b border-[#E2E2DA]">
                        <span>CIRCUIT TOPOLOGY // MULTI-PROVIDER AUTOMATIC ROUTER</span>
                        <span className="text-[#111111] font-bold">
                          {isSimulatingFailover ? "ROUTE REDIRECT ACTIVE" : "PRIMARY INGRESS"}
                        </span>
                      </div>

                      {/* Interactive Diagram Pipeline */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                        {/* Node 1: Client Ingress */}
                        <div className="p-4 bg-white border border-[#E2E2DA] text-center shadow-xs">
                          <span className="text-[9px] uppercase tracking-wider text-[#777783] block">ORIGIN</span>
                          <span className="text-xs font-bold text-[#111111] block mt-1">Client App / SDK</span>
                          <span className="text-[10px] text-emerald-600 block mt-1 font-semibold">TLS 1.3 // 200 OK</span>
                        </div>

                        {/* Connection 1 */}
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-full h-0.5 bg-[#E2E2DA] relative overflow-hidden">
                            <motion.div
                              className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-[#111111] to-transparent"
                              animate={{ x: ["-100%", "200%"] }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            />
                          </div>
                          <span className="text-[9px] text-[#777783] mt-1 font-mono">0.8ms</span>
                        </div>

                        {/* Node 2: Nexora Edge Gateway */}
                        <div className="p-4 bg-[#111111] text-white border border-[#111111] text-center shadow-sm relative">
                          <span className="text-[9px] uppercase tracking-wider text-violet-300 block">INTERCEPTOR</span>
                          <span className="text-xs font-bold block mt-1">Nexora Gateway</span>
                          <span className="text-[9px] text-[#AAAAAA] block mt-1">Token Quota &amp; Cache</span>
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                        </div>

                        {/* Node 3: Target Model Provider */}
                        <div className="space-y-3">
                          {/* Route A: Claude 3.5 Sonnet */}
                          <div
                            className={`p-3 border text-xs transition-all ${
                              isSimulatingFailover
                                ? "bg-rose-50 border-rose-300 text-rose-800 line-through opacity-70"
                                : "bg-white border-[#E2E2DA] text-[#111111]"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold">Claude 3.5 Sonnet</span>
                              <span className="text-[9px]">{isSimulatingFailover ? "503 TIMEOUT" : "18ms"}</span>
                            </div>
                            <span className="text-[9px] text-[#777783] block">Primary Model Route</span>
                          </div>

                          {/* Route B: Google Gemini 2.5 Flash Fallback */}
                          <div
                            className={`p-3 border text-xs transition-all ${
                              isSimulatingFailover
                                ? "bg-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-400 shadow-xs"
                                : "bg-[#F2F2EE] border-[#E2E2DA] text-[#777783]"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold">Gemini 2.5 Flash</span>
                              <span className={`text-[9px] font-bold ${isSimulatingFailover ? "text-emerald-700" : ""}`}>
                                {isSimulatingFailover ? "ACTIVE (16ms)" : "STANDBY"}
                              </span>
                            </div>
                            <span className="text-[9px] block">
                              {isSimulatingFailover ? "Zero Packet Loss • Fallback Active" : "Secondary Failover Route"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Failover Status Banner */}
                      <div className="mt-6 pt-4 border-t border-[#E2E2DA] flex flex-wrap items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          {isSimulatingFailover ? (
                            <span className="flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 border border-emerald-300">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              RECOVERY SUCCESS: Seamless failover to Gemini 2.5 Flash in 16ms
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-[#555562]">
                              <Activity className="w-3.5 h-3.5 text-emerald-600" />
                              All upstream providers operating at optimal 99.99% availability
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Interactive Control Panel */}
                    <div className="lg:col-span-4 space-y-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#777783] block mb-1">
                          SIMULATION CONTROLS
                        </span>
                        <h4 className="text-base font-bold text-[#111111] uppercase">
                          Test Multi-Provider Resiliency
                        </h4>
                        <p className="text-xs text-[#555562] mt-1 leading-relaxed">
                          Trigger a simulated upstream disruption to observe real-time gateway failover routing without client disconnection.
                        </p>
                      </div>

                      <div className="p-4 bg-[#F7F7F4] border border-[#E2E2DA] space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#777783]">Failover Latency:</span>
                          <span className="font-bold text-[#111111]">&lt; 18 ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#777783]">Packet Loss Rate:</span>
                          <span className="font-bold text-emerald-600">0.00%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#777783]">Client Error Code:</span>
                          <span className="font-bold text-[#111111]">None (200 OK)</span>
                        </div>
                      </div>

                      <Button
                        onClick={handleTriggerFailover}
                        disabled={isSimulatingFailover}
                        className="w-full bg-[#111111] hover:bg-black text-white font-bold uppercase tracking-wider text-xs h-11 border border-[#111111]"
                      >
                        {isSimulatingFailover ? (
                          <span className="flex items-center gap-2 text-violet-300">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Simulating Failover Event...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5 text-violet-400" />
                            Simulate Provider Latency Spike
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: ZERO-RETENTION KMS VAULT */}
              {activeTab === "kms" && (
                <motion.div
                  key="kms"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="py-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8 p-6 sm:p-8 bg-[#F7F7F4] border border-[#E2E2DA] relative">
                      <div className="flex items-center justify-between text-[10px] text-[#777783] mb-6 pb-2 border-b border-[#E2E2DA]">
                        <span>VOLATILE HARDWARE ENCLAVE // ZERO-DATA RETENTION ARCHITECTURE</span>
                        <span className="text-emerald-700 font-bold">AES-256 GCM ENCRYPTED</span>
                      </div>

                      {/* Memory Enclave Visual */}
                      <div className="p-6 bg-white border border-[#E2E2DA] relative overflow-hidden">
                        {isScrubbingMemory && (
                          <motion.div
                            className="absolute inset-0 bg-emerald-500/15 pointer-events-none z-10"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 1.2, repeat: 2, ease: "easeInOut" }}
                          />
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                          <div className="p-4 bg-[#F9F9F7] border border-[#E2E2DA]">
                            <Lock className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
                            <span className="text-[10px] uppercase font-bold text-[#777783] block">INGRESS CIPHER</span>
                            <span className="text-xs font-bold text-[#111111] block mt-1">Ephemeral KMS Key</span>
                            <span className="text-[9px] text-[#888892] font-mono mt-1 block">Key ID: kms_981a...</span>
                          </div>

                          <div className="p-4 bg-[#111111] text-white border border-[#111111]">
                            <Cpu className="w-5 h-5 text-violet-300 mx-auto mb-2 animate-pulse" />
                            <span className="text-[10px] uppercase font-bold text-violet-300 block">RAM ENCLAVE</span>
                            <span className="text-xs font-bold block mt-1">Volatile Processing</span>
                            <span className="text-[9px] text-[#AAAAAA] font-mono mt-1 block">Zero Disk Write</span>
                          </div>

                          <div className="p-4 bg-[#F9F9F7] border border-[#E2E2DA]">
                            <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
                            <span className="text-[10px] uppercase font-bold text-[#777783] block">EGRESS WIPE</span>
                            <span className="text-xs font-bold text-[#111111] block mt-1">Cryptographic Flush</span>
                            <span className="text-[9px] text-emerald-700 font-mono mt-1 block font-bold">
                              {isScrubbingMemory ? "SCRUBBING RAM..." : "WIPE COMPLETE (0ms)"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#E2E2DA] flex items-center justify-between text-xs">
                        <span className="text-[#555562]">
                          SOC2 Type II &amp; HIPAA Compliant: Payloads vanish from volatile RAM upon HTTP response dispatch.
                        </span>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 border border-emerald-300">
                          RETENTION: 0 BYTES
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-4 space-y-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#777783] block mb-1">
                          SECURITY VALIDATOR
                        </span>
                        <h4 className="text-base font-bold text-[#111111] uppercase">
                          Inspect Hardware Enclave
                        </h4>
                        <p className="text-xs text-[#555562] mt-1 leading-relaxed">
                          Verify our hardware cryptographic flush sequence which purges buffer pointers immediately after token streaming terminates.
                        </p>
                      </div>

                      <div className="p-4 bg-[#F7F7F4] border border-[#E2E2DA] space-y-2 text-xs font-mono">
                        <div className="flex justify-between">
                          <span className="text-[#777783]">Disk Write:</span>
                          <span className="font-bold text-emerald-600">DISABLED (Strict)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#777783]">Session Isolation:</span>
                          <span className="font-bold text-[#111111]">Kernel Cgroups v2</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#777783]">Audit Trail:</span>
                          <span className="font-bold text-[#111111]">Immutable Hash Log</span>
                        </div>
                      </div>

                      <Button
                        onClick={handleTriggerScrub}
                        disabled={isScrubbingMemory}
                        className="w-full bg-[#111111] hover:bg-black text-white font-bold uppercase tracking-wider text-xs h-11 border border-[#111111]"
                      >
                        {isScrubbingMemory ? (
                          <span className="flex items-center gap-2 text-emerald-400">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Executing Hardware Wipe...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                            Trigger Enclave Memory Scrub
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: SPATIAL ANYCAST RADAR */}
              {activeTab === "radar" && (
                <motion.div
                  key="radar"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="py-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8 p-6 sm:p-8 bg-[#F7F7F4] border border-[#E2E2DA] relative">
                      <div className="flex items-center justify-between text-[10px] text-[#777783] mb-6 pb-2 border-b border-[#E2E2DA]">
                        <span>GLOBAL ANYCAST RADAR // ACTIVE INGRESS MESH</span>
                        <span className="text-[#111111] font-bold">32 EDGE PoPs CONFIGURED</span>
                      </div>

                      {/* 4 Interactive Global Hub Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { id: "tokyo", city: "Tokyo, Japan", node: "TYO-EDGE-01", ping: "14 ms", tps: "8,920 req/s", status: "OPTIMAL" },
                          { id: "frankfurt", city: "Frankfurt, Germany", node: "FRA-EDGE-02", ping: "16 ms", tps: "12,400 req/s", status: "OPTIMAL" },
                          { id: "london", city: "London, UK", node: "LON-EDGE-01", ping: "19 ms", tps: "9,650 req/s", status: "OPTIMAL" },
                          { id: "sf", city: "San Francisco, USA", node: "SFO-EDGE-04", ping: "9 ms", tps: "15,800 req/s", status: "OPTIMAL" },
                        ].map((pop) => {
                          const isSelected = activePoP === pop.id;
                          return (
                            <button
                              key={pop.id}
                              type="button"
                              onClick={() => setActivePoP(pop.id)}
                              className={`p-4 text-left border relative transition-all ${
                                isSelected
                                  ? "bg-white border-[#111111] ring-1 ring-[#111111] shadow-sm"
                                  : "bg-white/80 border-[#E2E2DA] hover:border-[#111111]"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#111111] uppercase">{pop.city}</span>
                                <span className="text-[10px] font-bold text-[#111111] font-mono">{pop.ping}</span>
                              </div>
                              <span className="text-[10px] text-[#777783] font-mono block mt-1">{pop.node}</span>
                              <div className="mt-3 pt-2 border-t border-[#EAEAE2] flex items-center justify-between text-[9px] text-[#555562]">
                                <span>Throughput: {pop.tps}</span>
                                <span className="text-emerald-700 font-bold">{pop.status}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#E2E2DA] flex items-center justify-between text-xs">
                        <span className="text-[#555562]">
                          Selected Ingress: <strong className="text-[#111111] uppercase">{activePoP.toUpperCase()} ANYCAST ROUTER</strong>
                        </span>
                        <span className="text-emerald-700 font-bold">MEDIAN TTFT: 16.4 MS</span>
                      </div>
                    </div>

                    <div className="lg:col-span-4 space-y-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#777783] block mb-1">
                          RADAR METRICS
                        </span>
                        <h4 className="text-base font-bold text-[#111111] uppercase">
                          Low-Latency Edge BGP Routing
                        </h4>
                        <p className="text-xs text-[#555562] mt-1 leading-relaxed">
                          Clients establish TLS 1.3 handshakes with the closest physical edge router, cutting international transit latency by up to 60%.
                        </p>
                      </div>

                      <div className="p-4 bg-[#F7F7F4] border border-[#E2E2DA] space-y-2 text-xs font-mono">
                        <div className="flex justify-between">
                          <span className="text-[#777783]">BGP Anycast Routing:</span>
                          <span className="font-bold text-emerald-600">ACTIVE</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#777783]">Global PoP Count:</span>
                          <span className="font-bold text-[#111111]">32 Cities</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#777783]">DDoS Mitigation:</span>
                          <span className="font-bold text-[#111111]">Edge Scrubbing (2Tbps)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </InteractiveTiltCard>
      </div>
    </section>
  );
}

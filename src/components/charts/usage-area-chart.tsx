"use client";

import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DailyUsagePoint } from "@/types";

interface UsageAreaChartProps {
  data: DailyUsagePoint[];
  metric?: "requests" | "tokens" | "cost";
}

export function UsageAreaChart({ data, metric = "tokens" }: UsageAreaChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[280px] w-full flex items-center justify-center bg-[#F6F6F3] border border-[#E2E2DA] font-mono text-xs text-[#777783]">
        INITIALIZING TELEMETRY CHART...
      </div>
    );
  }

  const formatYAxis = (val: number) => {
    if (metric === "tokens") {
      return `${(val / 1_000_000).toFixed(1)}M`;
    }
    if (metric === "requests") {
      return `${(val / 1000).toFixed(0)}k`;
    }
    return `$${val}`;
  };

  const getMetricKey = () => {
    if (metric === "tokens") return "tokens";
    if (metric === "requests") return "requests";
    return "cost";
  };

  return (
    <div className="h-[280px] w-full font-mono">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="cadTokenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#111111" stopOpacity={0.12} />
              <stop offset="95%" stopColor="#111111" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E2DA" />
          <XAxis
            dataKey="date"
            axisLine={{ stroke: "#E2E2DA" }}
            tickLine={false}
            tick={{ fill: "#777783", fontSize: 10, fontFamily: "monospace" }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#777783", fontSize: 10, fontFamily: "monospace" }}
            tickFormatter={formatYAxis}
            dx={-5}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              borderColor: "#E2E2DA",
              borderRadius: "0px",
              fontSize: "11px",
              fontFamily: "monospace",
              boxShadow: "none",
            }}
            formatter={(value: any) => [
              metric === "tokens"
                ? `${(Number(value) / 1_000_000).toFixed(2)}M Tokens`
                : metric === "requests"
                ? `${Number(value).toLocaleString()} Invocations`
                : `$${Number(value).toFixed(2)} USD`,
              metric.toUpperCase(),
            ]}
            labelStyle={{ fontWeight: 700, color: "#111111", marginBottom: "4px" }}
          />
          <Area
            type="monotone"
            dataKey={getMetricKey()}
            stroke="#111111"
            strokeWidth={1.5}
            fillOpacity={1}
            fill="url(#cadTokenGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

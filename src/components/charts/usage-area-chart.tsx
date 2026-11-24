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
      <div className="h-[280px] w-full flex items-center justify-center bg-surface/50 rounded-2xl animate-pulse text-xs text-secondary">
        Loading chart data...
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
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="tokenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7557FF" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#7557FF" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECECF1" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#777783" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={formatYAxis}
            tick={{ fontSize: 11, fill: "#777783" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              borderColor: "#ECECF1",
              borderRadius: "14px",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.08)",
              fontSize: "12px",
            }}
            formatter={(value: any) => [
              metric === "tokens"
                ? `${Number(value).toLocaleString()} tokens`
                : metric === "requests"
                ? `${Number(value).toLocaleString()} reqs`
                : `$${Number(value).toFixed(2)}`,
              metric.charAt(0).toUpperCase() + metric.slice(1),
            ]}
          />
          <Area
            type="monotone"
            dataKey={getMetricKey()}
            stroke="#7557FF"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#tokenGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

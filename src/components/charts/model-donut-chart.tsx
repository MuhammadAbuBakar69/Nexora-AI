"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ModelUsagePoint } from "@/types";

interface ModelDonutChartProps {
  data: ModelUsagePoint[];
}

const COLORS = ["#7557FF", "#A5B4FC", "#38BDF8", "#34D399", "#FBBF24"];

export function ModelDonutChart({ data }: ModelDonutChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[220px] w-full flex items-center justify-center bg-surface/50 rounded-2xl animate-pulse text-xs text-secondary">
        Loading distribution...
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 h-[220px] w-full">
      <div className="h-full w-full sm:w-1/2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="tokens"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                borderColor: "#ECECF1",
                borderRadius: "12px",
                fontSize: "11px",
              }}
              formatter={(value: any, name: any, item: any) => [
                `${(Number(value) / 1_000_000).toFixed(1)}M (${item.payload.percentage}%)`,
                item.payload.model,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full sm:w-1/2 space-y-1.5 text-xs">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[idx % COLORS.length] }}
              />
              <span className="truncate text-secondary font-medium">{item.model}</span>
            </div>
            <span className="font-semibold text-foreground shrink-0">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ModelUsagePoint } from "@/types";

interface ModelDonutChartProps {
  data: ModelUsagePoint[];
}

const COLORS = ["#111111", "#555562", "#888892", "#B0B0A8", "#E2E2DA"];

export function ModelDonutChart({ data }: ModelDonutChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[220px] w-full flex items-center justify-center bg-[#F6F6F3] border border-[#E2E2DA] font-mono text-xs text-[#777783]">
        INITIALIZING DISTRIBUTION...
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 h-[220px] w-full font-mono">
      <div className="h-full w-full sm:w-1/2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={50}
              outerRadius={75}
              paddingAngle={2}
              dataKey="tokens"
              stroke="#FFFFFF"
              strokeWidth={1}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E2E2DA",
                borderRadius: "0px",
                fontSize: "11px",
                fontFamily: "monospace",
                boxShadow: "none",
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
          <div key={item.model} className="flex items-center justify-between p-1 border-b border-[#E2E2DA]/40 text-[11px]">
            <div className="flex items-center gap-2 truncate">
              <span
                className="w-2 h-2 shrink-0 border border-[#E2E2DA]"
                style={{ backgroundColor: COLORS[idx % COLORS.length] }}
              />
              <span className="truncate text-[#111111] font-bold">{item.model}</span>
            </div>
            <span className="font-mono text-[#777783] shrink-0 font-bold">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface LineSeries {
  key: string;
  label: string;
  color: string;
}

interface MultiMetricAreaChartProps {
  data: Record<string, number | string>[];
  xKey: string;
  areaKey: string;
  areaLabel: string;
  lines?: LineSeries[];
  leftTickFormatter?: (value: number) => string;
}

export default function MultiMetricAreaChart({
  data,
  xKey,
  areaKey,
  areaLabel,
  lines = [],
  leftTickFormatter = (value) => value.toLocaleString(),
}: MultiMetricAreaChartProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  if (!isReady) {
    return <div className="h-full w-full rounded-lg bg-slate-50" aria-hidden="true" />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`${areaKey}-gradient`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.24} />
            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#edf1f7" vertical={false} />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} stroke="#94a3b8" />
        <YAxis
          yAxisId="left"
          tickLine={false}
          axisLine={false}
          stroke="#94a3b8"
          tickFormatter={(value: number) => leftTickFormatter(value)}
        />
        {lines.length > 0 && (
          <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} stroke="#94a3b8" />
        )}
        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 12px 24px -16px rgba(15,23,42,0.4)",
          }}
          formatter={(value, name) => {
            const numericValue = Number(value ?? 0);
            if (name === areaKey) {
              return [numericValue.toLocaleString(), areaLabel];
            }
            const line = lines.find((item) => item.key === name);
            return [numericValue.toLocaleString(), line?.label ?? name];
          }}
        />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey={areaKey}
          stroke="var(--color-primary)"
          fill={`url(#${areaKey}-gradient)`}
          strokeWidth={2.4}
          dot={false}
        />
        {lines.map((line) => (
          <Line
            key={line.key}
            yAxisId="right"
            type="monotone"
            dataKey={line.key}
            stroke={line.color}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface HorizontalMetricBarChartProps {
  data: Record<string, string | number>[];
  categoryKey: string;
  valueKey: string;
  valueLabel: string;
}

export default function HorizontalMetricBarChart({
  data,
  categoryKey,
  valueKey,
  valueLabel,
}: HorizontalMetricBarChartProps) {
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
      <BarChart data={data} layout="vertical" margin={{ left: 10, right: 18 }}>
        <CartesianGrid stroke="#eef2f7" strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" axisLine={false} tickLine={false} stroke="#94a3b8" />
        <YAxis type="category" dataKey={categoryKey} axisLine={false} tickLine={false} stroke="#64748b" width={136} />
        <Tooltip formatter={(value) => [Number(value ?? 0).toLocaleString(), valueLabel]} />
        <Bar dataKey={valueKey} fill="#1e6dff" radius={[0, 6, 6, 0]} barSize={16} />
      </BarChart>
    </ResponsiveContainer>
  );
}

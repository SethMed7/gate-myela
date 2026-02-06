"use client";

import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface DonutDatum {
  name: string;
  value: number;
  color: string;
}

interface DistributionDonutChartProps {
  data: DonutDatum[];
}

export default function DistributionDonutChart({ data }: DistributionDonutChartProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  if (!isReady) {
    return <div className="h-full w-full rounded-full bg-slate-50" aria-hidden="true" />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={2}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${Number(value ?? 0)}%`, "Share"]} />
      </PieChart>
    </ResponsiveContainer>
  );
}

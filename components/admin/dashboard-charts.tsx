"use client";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  brand: "#cd1935",
  ink: "#161612",
  gold: "#c5a059",
  green: "#10b981",
  slate: "#6b6b66",
  blue: "#3b82f6",
};

export function PipelineChart({ data }: { data: Array<{ name: string; value: number }> }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} />
          <Bar dataKey="value" fill={COLORS.brand} radius={[6, 6, 0, 0]} name="Leads" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PropertyStatusChart({ data }: { data: Array<{ name: string; value: number }> }) {
  const pieColors = [COLORS.green, COLORS.gold, COLORS.brand, COLORS.slate];
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={85}
            paddingAngle={3}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={pieColors[i % pieColors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        {data.map((d, i) => (
          <span key={d.name} className="flex items-center gap-1.5 text-xs text-slate">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: pieColors[i % pieColors.length] }} />
            {d.name} ({d.value})
          </span>
        ))}
      </div>
    </div>
  );
}

export function MonthlyLeadsChart({ data }: { data: Array<{ month: string; leads: number }> }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="leads"
            stroke={COLORS.ink}
            strokeWidth={2}
            dot={{ fill: COLORS.brand, r: 4 }}
            activeDot={{ r: 6 }}
            name="New leads"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

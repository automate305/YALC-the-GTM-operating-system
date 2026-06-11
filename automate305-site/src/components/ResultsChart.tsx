"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", leads: 42, bookings: 18, revenue: 12400 },
  { month: "Feb", leads: 58, bookings: 24, revenue: 16800 },
  { month: "Mar", leads: 71, bookings: 31, revenue: 22100 },
  { month: "Apr", leads: 89, bookings: 42, revenue: 29600 },
  { month: "May", leads: 112, bookings: 55, revenue: 38900 },
  { month: "Jun", leads: 138, bookings: 68, revenue: 48200 },
];

export default function ResultsChart() {
  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-lg mb-1">Revenue Impact — 6-Month Snapshot</h3>
      <p className="text-gray-500 text-sm mb-6">Sample client data post-automation deployment</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === "revenue") return [`$${value.toLocaleString()}`, "Revenue ($)"];
              return [value, name.charAt(0).toUpperCase() + name.slice(1)];
            }}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="leads" fill="#7B3FF2" radius={[4, 4, 0, 0]} name="Leads" />
          <Bar yAxisId="left" dataKey="bookings" fill="#a78bfa" radius={[4, 4, 0, 0]} name="Bookings" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

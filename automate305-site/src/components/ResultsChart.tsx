'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const leadsData = [
  { month: 'Jan', leads: 42, bookings: 18 },
  { month: 'Feb', leads: 58, bookings: 26 },
  { month: 'Mar', leads: 71, bookings: 34 },
  { month: 'Apr', leads: 89, bookings: 45 },
  { month: 'May', leads: 103, bookings: 58 },
  { month: 'Jun', leads: 127, bookings: 72 },
]

const responseData = [
  { stage: 'Before AI', minutes: 47 },
  { stage: 'Week 1', minutes: 18 },
  { stage: 'Week 2', minutes: 8 },
  { stage: 'Week 4', minutes: 3 },
  { stage: 'Now', minutes: 1 },
]

export default function ResultsChart() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-1">Leads Captured & Bookings</h3>
        <p className="text-sm text-gray-500 mb-6">6-month composite across active accounts</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={leadsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="leads" fill="#7B3FF2" radius={[4, 4, 0, 0]} name="Leads" />
            <Bar dataKey="bookings" fill="#c4a5fa" radius={[4, 4, 0, 0]} name="Bookings" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-1">Average Response Time (minutes)</h3>
        <p className="text-sm text-gray-500 mb-6">Speed-to-lead improvement after AI deployment</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={responseData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="minutes" fill="#7B3FF2" radius={[4, 4, 0, 0]} name="Minutes" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

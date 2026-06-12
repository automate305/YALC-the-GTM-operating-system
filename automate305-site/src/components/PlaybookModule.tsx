'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export type SMSMock = { messages: { from: 'ai' | 'lead'; text: string }[] }
export type TimelineMock = { steps: string[] }
export type EmailMock = { subject: string; preview: string }
export type StatMock = { value: string; label: string }

export type ModuleProps = {
  step: number
  title: string
  desc: string
  badge: 'CORE' | 'GROWTH' | 'ADVANCED'
  mockType: 'sms' | 'timeline' | 'email' | 'stat'
  mockData: SMSMock | TimelineMock | EmailMock | StatMock
  tools: string[]
}

const badgeStyles: Record<ModuleProps['badge'], string> = {
  CORE: 'bg-[#7B3FF2]/20 text-[#7B3FF2]',
  GROWTH: 'bg-green-500/20 text-green-400',
  ADVANCED: 'bg-orange-500/20 text-orange-400',
}

function SMSPreview({ data }: { data: SMSMock }) {
  return (
    <div className="bg-[#0D1020] rounded-xl p-4 space-y-2 max-w-xs mx-auto">
      {data.messages.map((msg, i) => (
        <div key={i} className={`flex ${msg.from === 'lead' ? 'justify-end' : 'justify-start'} flex-col ${msg.from === 'ai' && i === 0 ? 'items-start' : ''}`}>
          {msg.from === 'ai' && i === 0 && (
            <span className="text-[10px] font-mono text-[#7B3FF2]/60 uppercase tracking-widest mb-1 ml-1">AI</span>
          )}
          <div className={`px-3 py-2 rounded-2xl text-xs max-w-[85%] ${msg.from === 'ai' ? 'bg-[#1E2235] text-gray-300' : 'bg-[#7B3FF2] text-white'}`}>
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  )
}

function TimelinePreview({ data }: { data: TimelineMock }) {
  return (
    <div className="flex items-center flex-wrap gap-1 justify-center">
      {data.steps.map((step, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className={`relative px-3 py-1.5 rounded-full text-xs font-medium border ${i === data.steps.length - 1 ? 'bg-[#7B3FF2]/20 border-[#7B3FF2]/40 text-[#7B3FF2]' : 'bg-[#1E2235] border-[#2A2F45] text-gray-300'}`}>
            {step}
            {i === data.steps.length - 1 && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#7B3FF2] animate-pulse" />
            )}
          </div>
          {i < data.steps.length - 1 && (
            <span className="text-[#7B3FF2]/60 text-xs">→</span>
          )}
        </div>
      ))}
    </div>
  )
}

function EmailPreview({ data }: { data: EmailMock }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden max-w-sm mx-auto shadow-md">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 space-y-0.5">
        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Email Preview</p>
        <p className="text-xs text-gray-700"><span className="font-semibold text-gray-500">Subject:</span> {data.subject}</p>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs text-gray-600 leading-relaxed">{data.preview}</p>
      </div>
    </div>
  )
}

function StatPreview({ data }: { data: StatMock }) {
  return (
    <div className="text-center py-2">
      <div className="text-5xl font-black text-[#7B3FF2] mb-2">{data.value}</div>
      <div className="text-gray-400 text-sm max-w-xs mx-auto">{data.label}</div>
    </div>
  )
}

export default function PlaybookModule({ step, title, desc, badge, mockType, mockData, tools }: ModuleProps) {
  const [open, setOpen] = useState(false)

  const stepLabel = String(step).padStart(2, '0')

  return (
    <div
      className={`rounded-xl border transition-all duration-200 cursor-pointer ${open ? 'border-[#7B3FF2]/40 shadow-[0_0_20px_rgba(123,63,242,0.1)]' : 'border-[#1E2235] hover:border-[#7B3FF2]/30 hover:shadow-[0_0_16px_rgba(123,63,242,0.08)]'} bg-[#0D1020]`}
      onClick={() => setOpen(!open)}
    >
      {/* Collapsed row */}
      <div className="flex items-start gap-4 p-5">
        <span className="font-mono text-[#7B3FF2]/40 text-xs mt-1 shrink-0">{stepLabel}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-white font-semibold text-sm">{title}</span>
            <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full ${badgeStyles[badge]}`}>
              {badge}
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-1 leading-relaxed">{desc}</p>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 mt-0.5"
        >
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.div>
      </div>

      {/* Expanded panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#161929] border-t border-[#1E2235] border-l-2 border-l-[#7B3FF2] rounded-b-xl px-5 pb-5 pt-4 ml-0">
              {/* Mock preview */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="mb-5"
              >
                {mockType === 'sms' && <SMSPreview data={mockData as SMSMock} />}
                {mockType === 'timeline' && <TimelinePreview data={mockData as TimelineMock} />}
                {mockType === 'email' && <EmailPreview data={mockData as EmailMock} />}
                {mockType === 'stat' && <StatPreview data={mockData as StatMock} />}
              </motion.div>

              {/* Tools */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4"
              >
                <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">Tools involved</p>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span key={tool} className="bg-[#0D1020] border border-[#1E2235] rounded-full px-3 py-1 text-xs text-gray-400">
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <a
                  href="#contact"
                  className="text-[#7B3FF2] text-xs hover:text-[#9b6ff5] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Want this for your business? →
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

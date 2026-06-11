'use client'

import { useState } from 'react'
import { Send, Zap } from 'lucide-react'

const initialMessages = [
  { role: 'bot', text: 'Hi! Thanks for reaching out to Pure Air Pros. Are you looking for AC repair, maintenance, or a new install?' },
  { role: 'user', text: 'My AC stopped working and it\'s 95 degrees outside.' },
  { role: 'bot', text: 'I\'m so sorry — that\'s rough in Miami heat. I can get a tech out to you today. Can I get your name and zip code?' },
  { role: 'user', text: 'Carlos, 33128' },
  { role: 'bot', text: 'Got it, Carlos! We have a slot open at 2pm or 4pm today in your area. Which works better for you?' },
]

export default function ChatDemo() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    const newMessages = [...messages, { role: 'user', text: input }]
    setMessages(newMessages)
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: 'Great choice! I\'ve booked your appointment and sent a confirmation to your phone. A tech will call you 30 minutes before arrival.' }])
    }, 800)
  }

  return (
    <div className="bg-[#130d1f] rounded-2xl overflow-hidden border border-[#7B3FF2]/20 max-w-sm w-full">
      <div className="bg-[#7B3FF2] px-4 py-3 flex items-center gap-2">
        <Zap className="w-4 h-4 text-white fill-white" />
        <span className="text-white text-sm font-semibold">Pure Air Pros AI Agent</span>
        <span className="ml-auto w-2 h-2 bg-green-400 rounded-full"></span>
      </div>
      <div className="h-72 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${msg.role === 'user' ? 'bg-[#7B3FF2] text-white' : 'bg-[#1e1530] text-gray-200'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[#7B3FF2]/20 p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-[#1e1530] text-gray-200 text-sm px-3 py-2 rounded-lg outline-none placeholder-gray-500"
        />
        <button onClick={handleSend} className="bg-[#7B3FF2] text-white p-2 rounded-lg hover:bg-[#6930d4] transition-colors">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

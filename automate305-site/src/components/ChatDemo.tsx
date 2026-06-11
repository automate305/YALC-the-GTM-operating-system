"use client";
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
}

const initialMessages: Message[] = [
  { role: "bot", text: "Hi! Thanks for reaching out to Pure Air Pros. I'm the 24/7 AI assistant. What can I help you with today?" },
  { role: "user", text: "My AC stopped working and it's 90 degrees inside" },
  { role: "bot", text: "I'm so sorry to hear that — in Miami heat that's urgent! Let me get you scheduled right away. What's your first name?" },
];

const botResponses: string[] = [
  "Got it! And what's the best phone number to reach you?",
  "Perfect. What part of Miami-Dade are you in? (e.g., Hialeah, Doral, Kendall...)",
  "Great — we have a tech available today between 2–5 PM. Does that work for you?",
  "You're all set! Carlos will call 30 minutes before arrival. You'll also get a text confirmation. Anything else I can help with?",
];

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [botIdx, setBotIdx] = useState(0);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = botResponses[botIdx % botResponses.length];
      setMessages((prev) => [...prev, { role: "bot", text: response }]);
      setBotIdx((i) => i + 1);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md mx-auto border border-gray-100">
      <div className="bg-brand-purple px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-white text-xs font-bold">AI</span>
        </div>
        <div>
          <p className="text-white font-semibold text-sm">Pure Air Pros — AI Agent</p>
          <p className="text-purple-200 text-xs">Always on • Responds in &lt;30 sec</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <span className="text-green-300 text-xs">Live</span>
        </div>
      </div>

      <div className="h-72 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-brand-purple text-white rounded-br-sm"
                  : "bg-white text-gray-800 shadow-sm rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-3 bg-white border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-brand-purple"
        />
        <button
          onClick={sendMessage}
          className="bg-brand-purple text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-purple-700 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

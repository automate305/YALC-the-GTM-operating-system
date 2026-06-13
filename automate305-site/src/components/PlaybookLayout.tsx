'use client'

import { useState, useEffect, useRef } from 'react'
import PlaybookModule, { ModuleProps } from './PlaybookModule'

export type Chapter = {
  id: string
  emoji: string
  name: string
  tagline: string
  modules: ModuleProps[]
}

export type PlaybookLayoutProps = {
  chapters: Chapter[]
}

export default function PlaybookLayout({ chapters }: PlaybookLayoutProps) {
  const [activeChapter, setActiveChapter] = useState(chapters[0]?.id ?? '')
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  // Intersection observer for auto-updating active chapter
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    chapters.forEach((chapter) => {
      const el = sectionRefs.current[chapter.id]
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveChapter(chapter.id)
            }
          })
        },
        { threshold: 0, rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [chapters])

  const scrollToChapter = (id: string) => {
    const el = sectionRefs.current[id]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setActiveChapter(id)
  }

  // Sequential step numbering across chapters
  let globalStep = 0

  return (
    <div className="flex min-h-screen bg-[#111318]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] bg-[#0A0C18] border-r border-[#1E2235] overflow-y-auto">
        <div className="px-4 pt-6 pb-2">
          <p className="text-[10px] font-mono uppercase tracking-widest text-gray-600">Chapters</p>
        </div>
        <nav className="flex flex-col gap-0.5 px-2 pb-6">
          {chapters.map((chapter) => {
            const isActive = activeChapter === chapter.id
            return (
              <button
                key={chapter.id}
                onClick={() => scrollToChapter(chapter.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-150 w-full ${
                  isActive
                    ? 'bg-[#7B3FF2]/10 text-white border-l-2 border-[#7B3FF2]'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border-l-2 border-transparent'
                }`}
              >
                <span className="text-xl">{chapter.emoji}</span>
                <span className="text-sm font-medium flex-1 truncate">{chapter.name}</span>
                <span className="bg-[#7B3FF2]/15 text-[#7B3FF2] text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0">
                  {chapter.modules.length}
                </span>
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Mobile tab strip */}
      <div className="md:hidden fixed top-16 left-0 right-0 z-30 bg-[#0A0C18] border-b border-[#1E2235] overflow-x-auto">
        <div className="flex gap-2 px-4 py-2 w-max">
          {chapters.map((chapter) => {
            const isActive = activeChapter === chapter.id
            return (
              <button
                key={chapter.id}
                onClick={() => scrollToChapter(chapter.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  isActive ? 'bg-[#7B3FF2] text-white' : 'bg-[#1E2235] text-gray-400'
                }`}
              >
                <span>{chapter.emoji}</span>
                <span>{chapter.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 px-6 md:px-12 py-12 md:pt-12 pt-24 overflow-x-hidden">
        {chapters.map((chapter, chapterIndex) => {
          const chapterStartStep = globalStep
          globalStep += chapter.modules.length

          const chapterNum = String(chapterIndex + 1).padStart(2, '0')

          return (
            <section
              key={chapter.id}
              id={chapter.id}
              ref={(el) => { sectionRefs.current[chapter.id] = el }}
              className="mb-20 scroll-mt-20"
            >
              {/* Chapter header */}
              <div className="relative mb-8">
                <span
                  className="absolute -top-6 left-0 text-8xl font-black text-[#7B3FF2]/[0.06] select-none pointer-events-none leading-none"
                  aria-hidden="true"
                >
                  {chapterNum}
                </span>
                <div className="relative flex items-end justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-3xl font-black text-white">
                      {chapter.emoji} {chapter.name}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">{chapter.tagline}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-px w-16 bg-[#1E2235]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600 bg-[#1E2235] px-3 py-1 rounded-full">
                      {chapter.modules.length} automations
                    </span>
                  </div>
                </div>
              </div>

              {/* Modules */}
              <div className="space-y-3">
                {chapter.modules.map((mod, modIndex) => (
                  <PlaybookModule
                    key={mod.title}
                    {...mod}
                    step={chapterStartStep + modIndex + 1}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </main>
    </div>
  )
}

import { spawn } from 'node:child_process'

function tryOpenBrowser(url: string): void {
  const platform = process.platform
  let command: string
  let args: string[]
  if (platform === 'darwin') { command = 'open'; args = [url] }
  else if (platform === 'win32') { command = 'cmd'; args = ['/c', 'start', '""', url] }
  else { command = 'xdg-open'; args = [url] }
  try {
    const child = spawn(command, args, { stdio: 'ignore', detached: true })
    child.on('error', () => {})
    if (typeof child.unref === 'function') child.unref()
  } catch {}
}

export interface ServeOptions {
  port?: number
  noOpen?: boolean
  startServerFn?: (port: number) => unknown
  openBrowserFn?: (url: string) => void
}

export async function runServe(opts: ServeOptions = {}): Promise<void> {
  const port = opts.port ?? 3847
  const startFn = opts.startServerFn ?? (async (p: number) => {
    const { startServer } = await import('../../lib/server/index.js')
    return startServer(p)
  })
  const url = `http://localhost:${port}`
  console.log('\n  A305 os  —  GTM Operating System\n')
  console.log(`  Starting server on ${url} …\n`)
  await startFn(port)
  console.log(`  Dashboard   ${url}`)
  console.log(`  Today       ${url}/today`)
  console.log(`  Brain       ${url}/brain`)
  console.log(`  Keys        ${url}/keys`)
  console.log(`  Skills      ${url}/skills`)
  console.log(`  Campaigns   ${url}/campaigns\n`)
  console.log('  Press Ctrl+C to stop.\n')
  const skipOpen = opts.noOpen || !!process.env.SSH_CONNECTION || !!process.env.YALC_NO_OPEN || !process.stdout.isTTY
  if (!skipOpen) {
    if (opts.openBrowserFn) opts.openBrowserFn(url)
    else tryOpenBrowser(url)
  } else {
    console.log(`  Open ${url} in your browser to get started.\n`)
  }
  await new Promise<void>(() => {})
}

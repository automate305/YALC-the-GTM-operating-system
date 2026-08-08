/**
 * /api/council/* — Council of High Intelligence deliberation surface.
 *
 * Endpoints:
 *   GET  /api/council/list — saved deliberation sessions (summaries, newest first)
 *   GET  /api/council/:id  — one full session (question + deliberation)
 *   POST /api/council/run  — convene the council on a new question
 *
 * POST runs the deliberation inline (single LLM call via the reasoning
 * capability, typically 30-90s) and returns the persisted session. It
 * requires a configured reasoning provider (e.g. ANTHROPIC_API_KEY) —
 * without one the run surfaces a 503 so the SPA can point at /keys.
 */

import { Hono } from 'hono'
import { listCouncilSessions, readCouncilSession } from '../../council/storage.js'
import { runCouncil } from '../../council/runner.js'

export const councilRoutes = new Hono()

councilRoutes.get('/list', (c) => {
  const items = listCouncilSessions()
  return c.json({ items, total: items.length })
})

councilRoutes.get('/:id', (c) => {
  const id = c.req.param('id')
  let session
  try {
    session = readCouncilSession(id)
  } catch (err) {
    return c.json(
      { error: 'bad_request', message: err instanceof Error ? err.message : String(err) },
      400,
    )
  }
  if (!session) {
    return c.json({ error: 'not_found', message: `No council session ${id}` }, 404)
  }
  return c.json(session)
})

councilRoutes.post('/run', async (c) => {
  let body: { question?: unknown; context?: unknown }
  try {
    body = (await c.req.json()) as { question?: unknown; context?: unknown }
  } catch {
    return c.json({ error: 'bad_request', message: 'JSON body required' }, 400)
  }
  const question = typeof body.question === 'string' ? body.question.trim() : ''
  if (question.length < 8) {
    return c.json(
      { error: 'bad_request', message: 'question is required (min 8 chars)' },
      400,
    )
  }
  const context = typeof body.context === 'string' ? body.context : undefined

  try {
    const result = await runCouncil({ question, context })
    return c.json(result.session)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    // Provider/key problems are operational, not bugs — return 503 so the
    // SPA can distinguish "configure a provider" from a genuine failure.
    const isProvider = /capability|provider|api[_ ]?key|unauthorized|credit/i.test(message)
    return c.json({ error: isProvider ? 'provider_unavailable' : 'run_failed', message }, isProvider ? 503 : 500)
  }
})

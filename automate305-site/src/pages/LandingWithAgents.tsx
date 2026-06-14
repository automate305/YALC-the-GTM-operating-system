import React from 'react';
import { DashboardCard } from '../components/DashboardCard';
import { useAgentTrigger } from '../hooks/useAgentTrigger';

/**
 * Enhanced Landing page with agent-triggered cards
 * Each dashboard can be activated via Shift+Click to run backend agents
 */

const PRIMARY_DASHBOARDS = [
  {
    href: '/today',
    title: 'Today',
    subtitle: 'Latest framework runs and pending gates',
    taskId: 'agent-today-sync',
    agentDescription: 'Fetch and update today\'s framework runs and gate status',
  },
  {
    href: '/brain',
    title: 'Brain',
    subtitle: 'Live company context, voice, and ICP',
    taskId: 'agent-brain-context',
    agentDescription: 'Refresh company context, voice, and ICP data',
  },
  {
    href: '/keys',
    title: 'Keys',
    subtitle: 'Provider status and health probes',
    taskId: 'agent-keys-health',
    agentDescription: 'Run health checks and update provider status',
  },
  {
    href: '/skills',
    title: 'Skills',
    subtitle: 'Skill catalog and inline runner',
    taskId: 'agent-skills-catalog',
    agentDescription: 'Update skill catalog and execute inline skills',
  },
];

const LEGACY_DASHBOARDS = [
  {
    href: '/campaigns',
    title: 'Campaigns',
    subtitle: 'LinkedIn outreach dashboard',
    taskId: 'agent-campaigns-sync',
    agentDescription: 'Sync LinkedIn campaigns and outreach metrics',
  },
  {
    href: '/review',
    title: 'Review',
    subtitle: 'Lead qualification queue',
    taskId: 'agent-review-queue',
    agentDescription: 'Process and qualify leads in the queue',
  },
  {
    href: '/frameworks',
    title: 'Frameworks',
    subtitle: 'Installed framework runs',
    taskId: 'agent-frameworks-list',
    agentDescription: 'Fetch and display installed framework runs',
  },
  {
    href: '/monthly-report',
    title: 'Monthly Report',
    subtitle: 'Cross-campaign rollup',
    taskId: 'agent-monthly-report',
    agentDescription: 'Generate monthly campaign rollup report',
  },
  {
    href: '/brand',
    title: 'Brand Kit',
    subtitle: 'Tokens, colors, type',
    taskId: 'agent-brand-kit',
    agentDescription: 'Update brand tokens, colors, and typography',
  },
];

export function LandingWithAgents() {
  const primaryAgents = PRIMARY_DASHBOARDS.map((dash) =>
    useAgentTrigger({
      taskId: dash.taskId,
      title: dash.title,
      description: dash.agentDescription,
    })
  );

  const legacyAgents = LEGACY_DASHBOARDS.map((dash) =>
    useAgentTrigger({
      taskId: dash.taskId,
      title: dash.title,
      description: dash.agentDescription,
    })
  );

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">
            GTM Operating System
          </p>
          <h1 className="font-heading text-6xl font-bold tracking-tight mb-4">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'var(--brand-gradient)' }}
            >
              YALC
            </span>
          </h1>
          <p className="text-base text-muted-foreground mb-6">
            Open-source, AI-native GTM engine. Lead finding, enrichment, qualification, and
            campaign orchestration — all driven from one CLI.
          </p>

          {/* Agent Hint */}
          <div className="text-xs text-muted-foreground bg-muted/30 rounded px-3 py-2 inline-block">
            💡 <kbd className="bg-background border border-border rounded px-1.5 py-0.5 mx-1">⌘</kbd>
            or
            <kbd className="bg-background border border-border rounded px-1.5 py-0.5 mx-1">Shift</kbd>
            + Click to trigger agents
          </div>
        </header>

        {/* Daily Views */}
        <h2 className="font-heading text-sm uppercase tracking-[0.18em] text-muted-foreground mb-3 mt-12">
          Daily Views
        </h2>
        <nav className="grid grid-cols-2 gap-3 mb-10">
          {PRIMARY_DASHBOARDS.map((dashboard, idx) => (
            <DashboardCard
              key={dashboard.taskId}
              href={dashboard.href}
              title={dashboard.title}
              subtitle={dashboard.subtitle}
              agentId={dashboard.taskId}
              onAgentTrigger={primaryAgents[idx].trigger}
            />
          ))}
        </nav>

        {/* Legacy Dashboards */}
        <h2 className="font-heading text-sm uppercase tracking-[0.18em] text-muted-foreground mb-3 mt-12">
          Legacy Dashboards
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4 text-sm text-yellow-800 dark:text-yellow-200">
          ⚠️ These dashboards are in maintenance mode and scheduled for retirement in v1.0.0.
        </div>
        <nav className="grid grid-cols-2 gap-3">
          {LEGACY_DASHBOARDS.map((dashboard, idx) => (
            <DashboardCard
              key={dashboard.taskId}
              href={dashboard.href}
              title={dashboard.title}
              subtitle={dashboard.subtitle}
              isLegacy
              agentId={dashboard.taskId}
              onAgentTrigger={legacyAgents[idx].trigger}
            />
          ))}
        </nav>

        {/* Footer Help */}
        <div className="mt-12 pt-8 border-t border-border text-xs text-muted-foreground space-y-2">
          <p>
            <strong>Click normally:</strong> Navigate to dashboard
          </p>
          <p>
            <strong>⌘/Shift + Click:</strong> Trigger agent in background, keep browsing
          </p>
          <p>
            <strong>Agent Status:</strong> Check the spinner icon in the top-right of each card
          </p>
        </div>
      </section>
    </main>
  );
}
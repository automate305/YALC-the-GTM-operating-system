import React, { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface DashboardCardProps {
  href: string;
  title: string;
  subtitle: string;
  isLegacy?: boolean;
  onAgentTrigger?: () => Promise<void>;
  agentId?: string;
}

export function DashboardCard({
  href,
  title,
  subtitle,
  isLegacy = false,
  onAgentTrigger,
  agentId,
}: DashboardCardProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleCardClick = async (e: React.MouseEvent) => {
    // If shift+click or if agent trigger is available, run the agent
    if ((e.shiftKey || e.ctrlKey || e.metaKey) && onAgentTrigger) {
      e.preventDefault();
      await triggerAgent();
    } else {
      // Normal navigation
      window.location.href = href;
    }
  };

  const triggerAgent = async () => {
    try {
      setIsRunning(true);
      setStatus('running');
      setError(null);

      if (onAgentTrigger) {
        await onAgentTrigger();
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          setIsRunning(false);
        }, 2000);
      }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsRunning(false);
    }
  };

  return (
    <button
      onClick={handleCardClick}
      className={`
        relative rounded-lg border bg-card p-4 shadow-sm
        hover:shadow-md transition duration-200
        text-left cursor-pointer
        ${isLegacy ? 'opacity-75 hover:opacity-100' : ''}
        ${status === 'running' ? 'border-blue-500 bg-blue-50' : ''}
        ${status === 'success' ? 'border-green-500 bg-green-50' : ''}
        ${status === 'error' ? 'border-red-500 bg-red-50' : 'border-border'}
      `}
      disabled={isRunning}
      title={onAgentTrigger ? 'Shift+click to trigger agent' : ''}
    >
      {/* Status Indicator */}
      <div className="absolute top-3 right-3">
        {status === 'running' && (
          <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
        )}
        {status === 'success' && (
          <CheckCircle className="w-4 h-4 text-green-600" />
        )}
        {status === 'error' && (
          <AlertCircle className="w-4 h-4 text-red-600" />
        )}
      </div>

      {/* Legacy Badge */}
      {isLegacy && (
        <div className="absolute top-3 left-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground opacity-50">
            Legacy
          </span>
        </div>
      )}

      {/* Content */}
      <div className={isLegacy ? 'mt-6' : ''}>
        <div className="font-heading font-semibold text-foreground">{title}</div>
        <div className="text-sm text-muted-foreground mt-1">{subtitle}</div>

        {/* Agent Status Message */}
        {onAgentTrigger && (
          <div className="mt-2 text-xs text-muted-foreground">
            {status === 'running' && (
              <span className="text-blue-600">🤖 Agent running...</span>
            )}
            {status === 'success' && (
              <span className="text-green-600">✓ Agent completed</span>
            )}
            {status === 'error' && (
              <span className="text-red-600">✗ {error}</span>
            )}
            {status === 'idle' && agentId && (
              <span>⌘+click to run agent</span>
            )}
          </div>
        )}
      </div>
    </button>
  );
}
import { useState, useCallback } from 'react';

interface AgentConfig {
  taskId: string;
  title: string;
  description: string;
  endpoint?: string;
}

interface AgentResponse {
  success: boolean;
  taskId?: string;
  message?: string;
  error?: string;
}

/**
 * Hook to trigger backend agents
 * Handles agent execution, polling, and status updates
 */
export function useAgentTrigger(config: AgentConfig) {
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AgentResponse | null>(null);

  const trigger = useCallback(async () => {
    try {
      setIsRunning(true);
      setStatus('running');
      setError(null);

      // Call backend agent endpoint
      const endpoint = config.endpoint || `/api/agents/${config.taskId}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskId: config.taskId,
          title: config.title,
          description: config.description,
        }),
      });

      if (!response.ok) {
        throw new Error(`Agent failed: ${response.statusText}`);
      }

      const data: AgentResponse = await response.json();
      setResult(data);

      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setError(data.error || 'Unknown error');
      }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to trigger agent');
    } finally {
      setIsRunning(false);
    }
  }, [config]);

  return {
    trigger,
    isRunning,
    status,
    error,
    result,
  };
}
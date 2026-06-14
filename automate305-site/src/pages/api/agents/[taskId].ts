import type { NextApiRequest, NextApiResponse } from 'next';

interface AgentPayload {
  taskId: string;
  title: string;
  description: string;
}

interface AgentResponse {
  success: boolean;
  taskId?: string;
  message?: string;
  error?: string;
}

/**
 * API endpoint to trigger backend agents
 * This handler receives agent trigger requests and queues them for execution
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AgentResponse>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  const { taskId, title, description } = req.body as AgentPayload;

  if (!taskId) {
    res.status(400).json({ success: false, error: 'taskId is required' });
    return;
  }

  try {
    // TODO: Replace with your actual agent backend endpoint
    // This could be:
    // - A call to your Claude Code agent API
    // - A webhook to your agent orchestration system
    // - A background job queue (Bull, RabbitMQ, etc.)

    console.log(`[Agent Trigger] Task: ${taskId}, Title: ${title}`);

    // Example: Call external agent service
    const agentResponse = await fetch(
      process.env.AGENT_BACKEND_URL || 'http://localhost:3001/execute',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.AGENT_API_KEY}`,
        },
        body: JSON.stringify({
          taskId,
          title,
          description,
          timestamp: new DateTime().toISOString(),
        }),
      }
    );

    if (!agentResponse.ok) {
      throw new Error(`Agent service error: ${agentResponse.statusText}`);
    }

    const result = await agentResponse.json();

    res.status(200).json({
      success: true,
      taskId,
      message: `Agent ${taskId} triggered successfully`,
    });
  } catch (error) {
    console.error(`[Agent Error] Task: ${taskId}`, error);

    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to trigger agent',
    });
  }
}
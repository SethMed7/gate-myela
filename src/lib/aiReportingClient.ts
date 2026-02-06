export interface AiReportRequest {
  prompt: string;
  dateRange: string;
  focus: string[];
  merchantProfile?: string;
}

export interface AiReportResponse {
  summary: string[];
  riskSignals: string[];
  recommendations: string[];
  generatedAt: string;
  provider: string;
}

export class AiReportingError extends Error {
  status?: number;
}

const getMockResponse = (payload: AiReportRequest): AiReportResponse => {
  const focusLabel = payload.focus.length > 0 ? payload.focus.join(", ") : "approval and decline trends";

  return {
    summary: [
      `Review window: ${payload.dateRange}. Focused on ${focusLabel}.`,
      "ACH approval trend is stronger than card traffic and stable through off-peak hours.",
      "Card decline density spikes during keyed entry sessions and elevated retry behavior.",
    ],
    riskSignals: [
      "AVS mismatch is the top preventable reason category in this period.",
      "Timeout-related declines increased during late afternoon processor load windows.",
    ],
    recommendations: [
      "Enable stricter AVS policy for high-risk merchant profiles.",
      "Route retries through delayed backoff to reduce duplicate failure loops.",
      "Monitor surcharge/tax rule impact on conversion by segment.",
    ],
    generatedAt: new Date().toISOString(),
    provider: "mock-local",
  };
};

export async function generateAiReport(payload: AiReportRequest): Promise<AiReportResponse> {
  const endpoint = process.env.NEXT_PUBLIC_AI_REPORTING_ENDPOINT;

  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return getMockResponse(payload);
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = new AiReportingError(`AI reporting request failed: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  const data = (await response.json()) as AiReportResponse;
  return data;
}

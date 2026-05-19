import type { Pdffillr } from '../client';

export interface FillResult {
  status: 'processing' | 'ready' | 'failed';
  url?: string;
  error?: string;
}

export interface PollOptions {
  /**
   * Maximum number of milliseconds to wait before giving up.
   * @default 120_000 (2 minutes)
   */
  timeoutMs?: number;
  /**
   * Starting interval between polls in milliseconds. Doubles on each attempt up to maxIntervalMs.
   * @default 3_000
   */
  initialIntervalMs?: number;
  /**
   * Maximum interval between polls in milliseconds.
   * @default 10_000
   */
  maxIntervalMs?: number;
}

/**
 * Polls GET /v1/sdk/docs/{pdfId}/result until the fill job reaches a terminal
 * state ('ready' or 'failed'), then returns the result.
 *
 * Throws if the job fails, if the timeout is exceeded, or if the API returns
 * an unexpected response shape.
 */
export async function pollUntilReady(
  client: Pdffillr,
  pdfDocId: number,
  options: PollOptions = {},
): Promise<FillResult> {
  const { timeoutMs = 120_000, initialIntervalMs = 3_000, maxIntervalMs = 10_000 } = options;

  const deadline = Date.now() + timeoutMs;
  let interval = initialIntervalMs;

  while (Date.now() < deadline) {
    const response = await client.sdk.docs.pollFillResult(pdfDocId).asResponse();
    const body = (await response.json()) as FillResult;

    if (body.status === 'ready') {
      return body;
    }
    if (body.status === 'failed') {
      throw new Error(`Fill job failed for doc ${pdfDocId}: ${body.error ?? 'unknown error'}`);
    }

    // status === 'processing' — wait before the next poll
    const remaining = deadline - Date.now();
    if (remaining <= 0) break;

    await new Promise<void>((resolve) => setTimeout(resolve, Math.min(interval, remaining)));
    interval = Math.min(interval * 2, maxIntervalMs);
  }

  throw new Error(`Timed out waiting for fill result for doc ${pdfDocId} after ${timeoutMs}ms`);
}

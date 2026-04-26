// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Submit field-level corrections and retrieve fill history to improve AI accuracy.
 */
export class FilledPdf extends APIResource {
  /**
   * Returns all saved versions for a given session and PDF, ordered by date
   * descending.
   *
   * @example
   * ```ts
   * await client.sdk.feedback.filledPdf.getVersionHistory({
   *   pdf_id: 'pdf_id',
   *   session_id: 'session_id',
   * });
   * ```
   */
  getVersionHistory(query: FilledPdfGetVersionHistoryParams, options?: RequestOptions): APIPromise<void> {
    return this._client.get('/v1/sdk/feedback/filled-pdf', { query, ...options, headers: buildHeaders([{Accept: '*/*'}, options?.headers]), __security: { apiKeyAuth : true } });
  }

  /**
   * Logs a filled PDF being saved or downloaded. Call after fill completes. `GET`
   * this same path to retrieve version history.
   *
   * @example
   * ```ts
   * await client.sdk.feedback.filledPdf.recordSaveEvent({
   *   filled_pdf_location:
   *     'filled-pdfs/dev-123/session-abc/v1.pdf',
   *   pdf_id: '42',
   *   session_id: 'clx9f2k3n0000abc123xyz',
   * });
   * ```
   */
  recordSaveEvent(body: FilledPdfRecordSaveEventParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/sdk/feedback/filled-pdf', { body, ...options, headers: buildHeaders([{Accept: '*/*'}, options?.headers]), __security: { apiKeyAuth : true } });
  }
}

export interface FilledPdfGetVersionHistoryParams {
  pdf_id: string;

  session_id: string;
}

export interface FilledPdfRecordSaveEventParams {
  /**
   * S3 key or URL where the filled PDF is stored.
   */
  filled_pdf_location: string;

  pdf_id: string;

  session_id: string;
}

export declare namespace FilledPdf {
  export {
    type FilledPdfGetVersionHistoryParams as FilledPdfGetVersionHistoryParams,
    type FilledPdfRecordSaveEventParams as FilledPdfRecordSaveEventParams
  };
}

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';

export class FilledPdf extends APIResource {
  /**
   * Returns all saved versions of a filled PDF for a specific session and PDF
   * combination, ordered by creation date descending. Each record includes the
   * storage location of the filled PDF version.
   *
   * Use this to build a version history UI — for example, allowing users to compare
   * different fill attempts or download a previous version.
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
    return this._client.get('/v1/sdk/feedback/filled-pdf/history', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { apiKeyAuth: true },
    });
  }

  /**
   * Logs the event of a filled PDF being saved or downloaded by the end-user. This
   * tracks the storage location of each filled version and is used to build the
   * version history retrievable via `GET /v1/sdk/feedback/filled-pdf/history`.
   *
   * Call this endpoint after the fill pipeline completes and your application has
   * stored or presented the filled PDF to the user. The `filled_pdf_location` should
   * be the S3 key or a URL where the filled PDF is stored.
   *
   * @example
   * ```ts
   * await client.sdk.feedback.filledPdf.recordSaveEvent({
   *   filled_pdf_location:
   *     'filled-pdfs/developer-123/session-abc/filled-form-v1.pdf',
   *   pdf_id: '42',
   *   session_id: 'clx9f2k3n0000abc123xyz',
   * });
   * ```
   */
  recordSaveEvent(body: FilledPdfRecordSaveEventParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/sdk/feedback/filled-pdf', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { apiKeyAuth: true },
    });
  }
}

export interface FilledPdfGetVersionHistoryParams {
  /**
   * The PDF document ID whose fill history to retrieve.
   */
  pdf_id: string;

  /**
   * The chat session ID associated with the fill job.
   */
  session_id: string;
}

export interface FilledPdfRecordSaveEventParams {
  /**
   * The S3 key or URL where the filled PDF has been stored. This is used to build
   * the version history for this document.
   */
  filled_pdf_location: string;

  /**
   * The ID of the original (empty) PDF document that was filled.
   */
  pdf_id: string;

  /**
   * The ID of the chat session associated with this fill job.
   */
  session_id: string;
}

export declare namespace FilledPdf {
  export {
    type FilledPdfGetVersionHistoryParams as FilledPdfGetVersionHistoryParams,
    type FilledPdfRecordSaveEventParams as FilledPdfRecordSaveEventParams,
  };
}

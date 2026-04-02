// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Create AI chat sessions, exchange messages, attach documents, and trigger fill from session output.
 */
export class Sessions extends APIResource {
  /**
   * Opens a new AI chat session. Returns `session_id` used in all subsequent chat
   * calls.
   *
   * @example
   * ```ts
   * await client.sdk.chat.sessions.create();
   * ```
   */
  create(body: SessionCreateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/sdk/chat/sessions', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { apiKeyAuth: true },
    });
  }

  /**
   * Returns all sessions ordered by creation date descending with `session_id`,
   * title, status, and message count.
   *
   * @example
   * ```ts
   * await client.sdk.chat.sessions.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<void> {
    return this._client.get('/v1/sdk/chat/sessions', {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { apiKeyAuth: true },
    });
  }

  /**
   * Attaches an uploaded document to a session. The AI uses it as context for all
   * subsequent messages. Upload the document via `POST /v1/sdk/docs/upload` first.
   *
   * @example
   * ```ts
   * await client.sdk.chat.sessions.attachDocument('sessionId', {
   *   doc_id: 42,
   * });
   * ```
   */
  attachDocument(
    sessionID: string,
    body: SessionAttachDocumentParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    return this._client.post(path`/v1/sdk/chat/sessions/${sessionID}/attach-document`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { apiKeyAuth: true },
    });
  }

  /**
   * Marks a session as ended. History remains readable but no new messages can be
   * sent.
   *
   * @example
   * ```ts
   * await client.sdk.chat.sessions.end('sessionId');
   * ```
   */
  end(sessionID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/v1/sdk/chat/sessions/${sessionID}/end`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { apiKeyAuth: true },
    });
  }

  /**
   * Queues a fill job using field values collected during this chat session.
   * **Workflow:** (1) Upload PDF → `doc_id`. (2) Create session. (3) Attach PDF. (4)
   * Chat with AI. (5) Call this endpoint with `pdf_doc_id`. (6) Poll
   * `GET /v1/sdk/docs/{pdf_doc_id}/result` until `ready`. (7) Download.
   *
   * @example
   * ```ts
   * await client.sdk.chat.sessions.fill('sessionId', {
   *   pdf_doc_id: 17,
   * });
   * ```
   */
  fill(sessionID: string, body: SessionFillParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/v1/sdk/chat/sessions/${sessionID}/fill`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { apiKeyAuth: true },
    });
  }

  /**
   * Returns paginated message history in chronological order. Query params: `page`
   * (0-based, default 0), `size` (1–100, default 50).
   *
   * @example
   * ```ts
   * await client.sdk.chat.sessions.retrieveMessages(
   *   'sessionId',
   * );
   * ```
   */
  retrieveMessages(
    sessionID: string,
    query: SessionRetrieveMessagesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    return this._client.get(path`/v1/sdk/chat/sessions/${sessionID}/messages`, {
      query,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { apiKeyAuth: true },
    });
  }
}

export interface SessionCreateParams {
  /**
   * Human-readable label for this session.
   */
  title?: string;
}

export interface SessionAttachDocumentParams {
  /**
   * `doc_id` from `POST /v1/sdk/docs/upload`.
   */
  doc_id: number;
}

export interface SessionFillParams {
  /**
   * `doc_id` of the empty PDF to fill.
   */
  pdf_doc_id: number;
}

export interface SessionRetrieveMessagesParams {
  page?: number;

  size?: number;
}

export declare namespace Sessions {
  export {
    type SessionCreateParams as SessionCreateParams,
    type SessionAttachDocumentParams as SessionAttachDocumentParams,
    type SessionFillParams as SessionFillParams,
    type SessionRetrieveMessagesParams as SessionRetrieveMessagesParams,
  };
}

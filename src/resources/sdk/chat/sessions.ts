// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Sessions extends APIResource {
  /**
   * Opens a new AI chat session scoped to your developer account. A session is a
   * persistent conversation context — messages sent within it are remembered by the
   * AI. Optionally attach a document to the session to let the AI answer questions
   * about its content.
   *
   * Sessions remain active until explicitly ended via
   * `POST /v1/sdk/chat/sessions/{sessionId}/end`. An active session can accumulate
   * multiple messages and document attachments.
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
   * Returns all chat sessions created under your developer account, ordered by
   * creation date descending. Each session includes its `session_id`, title, status
   * (`active` or `ended`), message count, and timestamps.
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
   * Attaches a previously uploaded document to a chat session. Once attached, the AI
   * can reference the document's content when answering questions in subsequent
   * messages.
   *
   * The document must have been uploaded via `POST /v1/sdk/docs/upload` first. You
   * can attach multiple documents to a single session by calling this endpoint
   * multiple times.
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
   * Marks a chat session as ended. Ended sessions are read-only — you can still
   * retrieve their message history but cannot send new messages. Ending a session
   * frees up any active context resources held by the AI pipeline.
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
   * Returns the message history for a specific chat session, paginated. Messages are
   * returned in chronological order (oldest first). Each message includes its `role`
   * (`user` or `assistant`), `content`, and `created_at` timestamp.
   *
   * Use `page` and `size` to paginate through long conversations. Default page size
   * is 50, maximum is 100.
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
   * A human-readable label for this chat session. Useful for identifying sessions in
   * list views or logs. If omitted, the session will have no title.
   */
  title?: string;
}

export interface SessionAttachDocumentParams {
  /**
   * The numeric `doc_id` of the document to attach to this session. The document
   * must have been previously uploaded via `POST /v1/sdk/docs/upload`. Once
   * attached, the AI will use the document as context for all subsequent messages in
   * the session.
   */
  doc_id: number;
}

export interface SessionRetrieveMessagesParams {
  /**
   * Zero-based page index. Defaults to `0`.
   */
  page?: number;

  /**
   * Number of messages per page (1–100). Defaults to `50`.
   */
  size?: number;
}

export declare namespace Sessions {
  export {
    type SessionCreateParams as SessionCreateParams,
    type SessionAttachDocumentParams as SessionAttachDocumentParams,
    type SessionRetrieveMessagesParams as SessionRetrieveMessagesParams,
  };
}

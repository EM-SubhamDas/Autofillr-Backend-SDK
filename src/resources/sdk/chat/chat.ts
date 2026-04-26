// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as SessionsAPI from './sessions';
import { SessionAttachDocumentParams, SessionCreateParams, SessionGetMessagesParams, SessionTriggerFillParams, Sessions } from './sessions';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Create AI chat sessions, exchange messages, attach documents, and trigger fill from session output.
 */
export class Chat extends APIResource {
  sessions: SessionsAPI.Sessions = new SessionsAPI.Sessions(this._client);

  /**
   * Sends a message to the AI in an active session. Synchronous (2–8 s). Returns the
   * AI reply. Uses all prior messages and attached documents as context.
   *
   * @example
   * ```ts
   * await client.sdk.chat.sendMessage({
   *   message: 'What is the deadline field on page 2?',
   *   session_id: 'clx9f2k3n0000abc123xyz',
   * });
   * ```
   */
  sendMessage(body: ChatSendMessageParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/sdk/chat/send', { body, ...options, headers: buildHeaders([{Accept: '*/*'}, options?.headers]), __security: { apiKeyAuth : true } });
  }
}

export interface ChatSendMessageParams {
  message: string;

  /**
   * Active session ID.
   */
  session_id: string;
}

Chat.Sessions = Sessions;

export declare namespace Chat {
  export {
    type ChatSendMessageParams as ChatSendMessageParams
  };

  export {
    Sessions as Sessions,
    type SessionCreateParams as SessionCreateParams,
    type SessionAttachDocumentParams as SessionAttachDocumentParams,
    type SessionGetMessagesParams as SessionGetMessagesParams,
    type SessionTriggerFillParams as SessionTriggerFillParams
  };
}

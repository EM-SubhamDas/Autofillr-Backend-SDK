// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as SessionsAPI from './sessions';
import {
  SessionAttachDocumentParams,
  SessionCreateParams,
  SessionRetrieveMessagesParams,
  Sessions,
} from './sessions';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';

export class Chat extends APIResource {
  sessions: SessionsAPI.Sessions = new SessionsAPI.Sessions(this._client);

  /**
   * Sends a user message to the AI within an active chat session and returns the
   * AI's response.
   *
   * The AI has full context of all prior messages in the session. If a document has
   * been attached to the session via
   * `POST /v1/sdk/chat/sessions/{sessionId}/attach-document`, the AI can answer
   * questions about that document's content.
   *
   * **Note:** This is a synchronous call — it waits for the LLM response before
   * returning. Average response time is 2–8 seconds depending on message complexity.
   *
   * @example
   * ```ts
   * await client.sdk.chat.sendMessage({
   *   message:
   *     'What is the deadline field on page 2 of the form?',
   *   session_id: 'clx9f2k3n0000abc123xyz',
   * });
   * ```
   */
  sendMessage(body: ChatSendMessageParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/sdk/chat/send', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { apiKeyAuth: true },
    });
  }
}

export interface ChatSendMessageParams {
  /**
   * The message text to send to the AI. The AI will consider all prior messages in
   * the session as context. If a document is attached to the session, the AI can
   * reference its content in its reply.
   */
  message: string;

  /**
   * The ID of the active chat session to send the message to. Obtain this from
   * `POST /v1/sdk/chat/sessions`. The session must be in `active` status — ended
   * sessions reject new messages.
   */
  session_id: string;
}

Chat.Sessions = Sessions;

export declare namespace Chat {
  export { type ChatSendMessageParams as ChatSendMessageParams };

  export {
    Sessions as Sessions,
    type SessionCreateParams as SessionCreateParams,
    type SessionAttachDocumentParams as SessionAttachDocumentParams,
    type SessionRetrieveMessagesParams as SessionRetrieveMessagesParams,
  };
}

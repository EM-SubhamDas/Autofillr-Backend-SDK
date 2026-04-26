// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Submit field-level corrections and retrieve fill history to improve AI accuracy.
 */
export class User extends APIResource {
  /**
   * Returns paginated feedback. Query params: `session_id`, `pdf_id`, `page`
   * (1-based, default 1), `limit` (1–100, default 20).
   *
   * @example
   * ```ts
   * await client.sdk.feedback.user.list();
   * ```
   */
  list(query: UserListParams | null | undefined = {}, options?: RequestOptions): APIPromise<void> {
    return this._client.get('/v1/sdk/feedback/user', { query, ...options, headers: buildHeaders([{Accept: '*/*'}, options?.headers]), __security: { apiKeyAuth : true } });
  }

  /**
   * Records feedback on an incorrectly filled field. `error_type`: `wrong_value`,
   * `wrong_field`, `missing_field`, `extra_field`, `formatting`, `other`.
   *
   * @example
   * ```ts
   * await client.sdk.feedback.user.submit({
   *   error_type: 'wrong_value',
   *   feedback:
   *     'Date was filled as MM/DD/YYYY but form requires DD/MM/YYYY.',
   *   field_name: 'Date of Birth',
   *   field_type: 'date',
   *   page_number: 2,
   *   pdf_id: '42',
   *   session_id: 'clx9f2k3n0000abc123xyz',
   * });
   * ```
   */
  submit(body: UserSubmitParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/sdk/feedback/user', { body, ...options, headers: buildHeaders([{Accept: '*/*'}, options?.headers]), __security: { apiKeyAuth : true } });
  }
}

export interface UserListParams {
  limit?: number;

  page?: number;

  pdf_id?: string;

  session_id?: string;
}

export interface UserSubmitParams {
  /**
   * `wrong_value` | `wrong_field` | `missing_field` | `extra_field` | `formatting` |
   * `other`
   */
  error_type: string;

  feedback: string;

  field_name: string;

  /**
   * Field type: `text`, `checkbox`, `radio`, `date`, `signature`, `dropdown`.
   */
  field_type: string;

  /**
   * Page number (1-based).
   */
  page_number: number;

  pdf_id: string;

  session_id: string;

  /**
   * Bounding box `{ x1, y1, x2, y2 }` of the field on the page.
   */
  corners?: unknown;
}

export declare namespace User {
  export {
    type UserListParams as UserListParams,
    type UserSubmitParams as UserSubmitParams
  };
}
